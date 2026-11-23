package middleware

import (
	"axhome_server/internal/utils"
	"context"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

type clientLimiter struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

// IPRateLimiter enforces a per-IP token bucket limit and periodically evicts stale clients.
type IPRateLimiter struct {
	mu              sync.RWMutex
	clients         map[string]*clientLimiter
	rps             rate.Limit
	burst           int
	cleanupInterval time.Duration
	clientTTL       time.Duration
}

func NewIPRateLimiter(
	ctx context.Context,
	rps float64,
	burst int,
	cleanupInterval time.Duration,
	clientTTL time.Duration,
) *IPRateLimiter {
	if rps <= 0 {
		rps = 10
	}
	if burst <= 0 {
		burst = 20
	}
	if cleanupInterval <= 0 {
		cleanupInterval = time.Minute
	}
	if clientTTL <= 0 {
		clientTTL = 5 * time.Minute
	}

	rl := &IPRateLimiter{
		clients:         make(map[string]*clientLimiter),
		rps:             rate.Limit(rps),
		burst:           burst,
		cleanupInterval: cleanupInterval,
		clientTTL:       clientTTL,
	}

	go rl.cleanupLoop(ctx)
	return rl
}

func (rl *IPRateLimiter) Allow(ip string) bool {
	limiter := rl.getLimiter(ip)
	return limiter.Allow()
}

func (rl *IPRateLimiter) Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !rl.Allow(c.ClientIP()) {
			c.Header("Retry-After", "1")
			utils.ResponseError(c, utils.NewError(utils.MsgTooManyRequests, utils.ErrCodeTooManyRequests))
			return
		}
		c.Next()
	}
}

func (rl *IPRateLimiter) getLimiter(ip string) *rate.Limiter {
	now := time.Now()

	rl.mu.RLock()
	entry, exists := rl.clients[ip]
	rl.mu.RUnlock()

	if exists {
		rl.mu.Lock()
		entry.lastSeen = now
		rl.mu.Unlock()
		return entry.limiter
	}

	rl.mu.Lock()
	defer rl.mu.Unlock()

	if entry, exists = rl.clients[ip]; exists {
		entry.lastSeen = now
		return entry.limiter
	}

	limiter := rate.NewLimiter(rl.rps, rl.burst)
	rl.clients[ip] = &clientLimiter{
		limiter:  limiter,
		lastSeen: now,
	}
	return limiter
}

func (rl *IPRateLimiter) cleanupLoop(ctx context.Context) {
	ticker := time.NewTicker(rl.cleanupInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			rl.cleanupStaleClients(time.Now())
		}
	}
}

func (rl *IPRateLimiter) cleanupStaleClients(now time.Time) {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	for ip, entry := range rl.clients {
		if now.Sub(entry.lastSeen) > rl.clientTTL {
			delete(rl.clients, ip)
		}
	}
}
