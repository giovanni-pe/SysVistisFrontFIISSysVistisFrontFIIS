import api from '../../../libs/api';
import type { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '../Interfaces/IAuth';

export async function login(data: ILoginRequest): Promise<ILoginResponse> {
  const response = await api.post('/Auth/login', data);
  console.log('Login response:', response.data);
  return response.data;
}

export async function register(data: IRegisterRequest): Promise<IRegisterResponse> {
  const response = await api.post('/Auth/register', data);
  return response.data;
}
