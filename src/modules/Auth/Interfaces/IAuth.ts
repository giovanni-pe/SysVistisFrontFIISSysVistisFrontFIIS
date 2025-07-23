export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
}

export interface IRegisterResponse {
  success: boolean;
  message?: string;
}

export interface IUser {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

export interface IAuthState {
  user: IUser | null;
  token: string;
  tokenExpiresAt: number | null;
  loading: boolean;
  error: string | null;
  registerSuccess: boolean;
  registerError: string | null;
}
