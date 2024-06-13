type UserRole = 'admin' | 'user';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
}
