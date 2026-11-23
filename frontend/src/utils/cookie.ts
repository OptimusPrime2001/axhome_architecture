export interface CookieOptions {
  /** Số giây tồn tại của cookie (ưu tiên dùng cái này cho đồng bộ với expires_in từ backend) */
  maxAge?: number;
  /** Ngày hết hạn cụ thể (nếu không dùng maxAge) */
  expires?: Date;
  /** Đường dẫn áp dụng cookie (mặc định: "/") */
  path?: string;
  /** Domain áp dụng cookie */
  domain?: string;
  /** Chỉ gửi qua HTTPS (mặc định: tự động true nếu đang chạy trên HTTPS) */
  secure?: boolean;
  /** Chống CSRF: "Strict" | "Lax" | "None" (mặc định: "Lax") */
  sameSite?: "Strict" | "Lax" | "None";
}

export const cookieStorage = {
  /**
   * Lấy giá trị của một cookie theo tên
   */
  get(name: string): string | null {
    if (typeof document === "undefined") return null;

    const encodedName = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(encodedName)) {
        return decodeURIComponent(cookie.substring(encodedName.length));
      }
    }

    return null;
  },

  /**
   * Lưu hoặc cập nhật một cookie
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof document === "undefined") return;

    const {
      maxAge,
      expires,
      path = "/",
      domain,
      secure = window.location.protocol === "https:",
      sameSite = "Lax",
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (typeof maxAge === "number") {
      cookieString += `; Max-Age=${Math.floor(maxAge)}`;
    } else if (expires instanceof Date) {
      cookieString += `; Expires=${expires.toUTCString()}`;
    }

    if (path) {
      cookieString += `; Path=${path}`;
    }

    if (domain) {
      cookieString += `; Domain=${domain}`;
    }

    if (sameSite) {
      cookieString += `; SameSite=${sameSite}`;
    }

    // Trình duyệt bắt buộc Secure=true nếu SameSite=None
    if (secure || sameSite === "None") {
      cookieString += "; Secure";
    }

    document.cookie = cookieString;
  },

  /**
   * Xóa cookie (Lưu ý: path và domain phải khớp với lúc set)
   */
  remove(
    name: string,
    options: Pick<CookieOptions, "path" | "domain"> = {},
  ): void {
    this.set(name, "", {
      ...options,
      maxAge: 0,
    });
  },
};
