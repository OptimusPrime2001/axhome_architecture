package middleware

import (
	"axhome_server/internal/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	AccessTokenCookieName = "access_token"
	authClaimsContextKey  = "middleware.auth_claims"
)

// Auth validates JWT tokens from HttpOnly cookie ("access_token") or Authorization Bearer header.
func Auth(jwtSecret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		accessToken := extractAccessToken(c)
		if accessToken == "" {
			utils.ResponseError(c, utils.NewError(utils.MsgInvalidToken, utils.ErrCodeUnauthorized))
			return
		}

		claims, err := utils.ParseAccessToken(jwtSecret, accessToken)
		if err != nil {
			utils.ResponseError(c, err)
			return
		}

		c.Set(authClaimsContextKey, claims)
		c.Next()
	}
}

// GetAuthClaims retrieves authenticated user claims stored by Auth middleware.
func GetAuthClaims(c *gin.Context) (*utils.AuthClaims, bool) {
	val, exists := c.Get(authClaimsContextKey)
	if !exists {
		return nil, false
	}
	claims, ok := val.(*utils.AuthClaims)
	return claims, ok && claims != nil
}

// RequireRoles restricts access to users whose JWT role matches one of the allowed roles.
func RequireRoles(allowedRoles ...string) gin.HandlerFunc {
	allowed := make(map[string]struct{}, len(allowedRoles))
	for _, r := range allowedRoles {
		allowed[strings.ToLower(strings.TrimSpace(r))] = struct{}{}
	}

	return func(c *gin.Context) {
		claims, ok := GetAuthClaims(c)
		if !ok {
			utils.ResponseError(c, utils.NewError(utils.MsgInvalidToken, utils.ErrCodeUnauthorized))
			return
		}

		if _, permitted := allowed[strings.ToLower(claims.Role)]; !permitted {
			utils.ResponseError(c, utils.NewError(utils.MsgForbidden, utils.ErrCodeForbidden))
			return
		}

		c.Next()
	}
}

func extractAccessToken(c *gin.Context) string {
	// 2. Get AccessToken to Authorization: Bearer <token> header for API clients / curl.
	accessToken := strings.TrimSpace(c.GetHeader("Authorization"))
	if len(accessToken) > 7 && strings.EqualFold(accessToken[:7], "Bearer ") {
		return strings.TrimSpace(accessToken[7:])
	}

	return ""
}
