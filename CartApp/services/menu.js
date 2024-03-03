import { API } from "./API.js";

export const loadMenuData = async () => {
  const menuData = await API.menu.fetch();
  app.store.menu = menuData;
};

export const getProductById = async (id) => {
  if (app.store.menu == null) {
    await loadMenuData();
  } else {
    for (let productData of app.store.menu) {
      for (let product of productData.products) {
        if (product.id == id) {
          return product;
        }
      }
    }
  }
  return null;
};
