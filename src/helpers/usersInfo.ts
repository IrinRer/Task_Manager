import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = (): string | null => {
  return cookies.get('token');
};

export const resetToken = (): void => {
  cookies.remove('token');
};
