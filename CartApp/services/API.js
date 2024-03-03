export const API = {
  menu: {
    url: "/data/menu.json",
    fetch: async () => {
      const response = await fetch(API.menu.url);
      return await response.json();
    },
  },
};
