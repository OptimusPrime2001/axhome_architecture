export const API_ENDPOINTS = {
  PUBLIC: {
    PROJECTS: "/public/projects",
    PROJECT_BY_SLUG: (slug: string) =>
      `/public/projects/${encodeURIComponent(slug)}`,
    RELATED_PROJECTS: (slug: string) =>
      `/public/projects/related/${encodeURIComponent(slug)}`,
    CONTACTS: "/public/contacts",
  },
  ADMIN: {
    AUTH: {
      LOGIN: "/admin/auth/login",
      LOGOUT: "/admin/auth/logout",
      ME: "/admin/auth/me",
      PROFILE: "/admin/auth/profile",
      PASSWORD: "/admin/auth/password",
    },
    PROJECTS: {
      LIST: "/admin/projects",
      BY_ID: (id: string) => `/admin/projects/${encodeURIComponent(id)}`,
      STATUS: (id: string) =>
        `/admin/projects/${encodeURIComponent(id)}/status`,
    },
    CONTACTS: {
      LIST: "/admin/contacts",
      STATS: "/admin/contacts/stats",
      BY_ID: (id: string) => `/admin/contacts/${encodeURIComponent(id)}`,
    },
    MEDIA: {
      UPLOAD: "/admin/media/upload",
      DELETE: "/admin/media",
    },
    USERS: {
      LIST: "/admin/users",
      BY_ID: (id: string) => `/admin/users/${encodeURIComponent(id)}`,
    },
  },
} as const;
