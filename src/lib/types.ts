// Common type definitions for the application

// Error type for API routes
export interface ApiError extends Error {
  code?: string;
  status?: number;
  message: string;
}

// User role type
export type UserRole = "admin" | "user";

// Session user with role
export interface UserWithRole {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

// JWT with role
export interface ExtendedJWT {
  role?: string;
  name?: string | null;
  email?: string | null;
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}