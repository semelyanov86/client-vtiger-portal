import storage, { StoredToken } from '../utils/storage.ts';

/**
 * Токен имеет фиксированное время жизни.
 * Важно, так как храним в localStorage и уменьшаем риск в случае xss.
 * Время жизни токена ставим в 48 часов
 */
const TOKEN_TTL_MS = 86340000 * 2;

const isExpired = (timeStamp?: number): boolean => {
  if (!timeStamp) return false;

  const now = new Date().getTime();
  const diff = now - timeStamp;

  return diff > TOKEN_TTL_MS;
};

const setToken = (access_token: string): void => {
  storage.setToken(access_token);
};

const removeToken = (): void => {
  storage.clearToken();
};

const getToken = (): StoredToken | null => {
  return storage.getToken();
};

export { getToken, setToken, removeToken, isExpired };
