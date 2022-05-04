export const chromePersistStorage = {
  setItem: (key: string, item: unknown) => {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: item }, () => {
        resolve(true);
      });
    });
  },

  getItem: (key: string) => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (res) => resolve(res[key]));
    });
  },

  removeItem: (key: string) => {
    return new Promise((resolve) => {
      chrome.storage.sync.remove(key, () => {
        resolve(true);
      });
    });
  },
};
