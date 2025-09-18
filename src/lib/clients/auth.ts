import { api } from "../api";
import {
  AuthTokenResponseDto,
  ChangePasswordDto,
  ConfirmPasswordResetDto,
  FirstLoginPasswordSetupDto,
  LoginDto,
  RegisterDto,
  RequestPasswordResetDto,
  SocialLoginDto,
  UserDto,
} from "@/types";

export const authClient = {
  // Authentication
  login: (credentials: LoginDto) =>
    api.post<AuthTokenResponseDto>("/Auth/login", credentials),

  completeFirstLogin: (payload: FirstLoginPasswordSetupDto) =>
    api.post<void>("/Auth/first-login/complete", payload),

  register: (userData: RegisterDto) => api.post<UserDto>("/Auth/register", userData),

  profile: () => api.get<UserDto>("/Auth/profile"),

  changePassword: (passwordData: ChangePasswordDto) =>
    api.post<void>("/Auth/change-password", passwordData),

  // Password Reset
  requestPasswordReset: (data: RequestPasswordResetDto) =>
    api.post<void>("/auth/password-reset/request", data),

  confirmPasswordReset: (data: ConfirmPasswordResetDto) =>
    api.post<void>("/auth/password-reset/confirm", data),

  // Social Login
  socialLogin: (data: SocialLoginDto) =>
    api.post<string>("/auth/social/login", data),
};
