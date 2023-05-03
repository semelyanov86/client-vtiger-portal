const storagePrefix = 'portal_react_';

export type StoredToken = {
  value: string;
  timeStamp: number;
};

const storage = {
  getToken: (): StoredToken | null => {
    let result = null;
    const storedToken = localStorage.getItem(`${storagePrefix}token` as string);
    storedToken && (result = JSON.parse(storedToken));
    return result;
  },
  setToken: (token: string) => {
    localStorage.setItem(
      `${storagePrefix}token`,
      JSON.stringify({
        value: token,
        timeStamp: new Date().getTime(),
      })
    );
  },
  clearToken: () => {
    localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
