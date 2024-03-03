import { getProductById } from "./menu.js";

export const addToCart = async (id) => {
  const product = await getProductById(id);
  console.log("product", product);

  if (product) {
    const results = app.store.cart.filter((product) => product.id == id);
    if (results.length > 0) {
      app.store.cart = app.store.cart.map((product) =>
        product.id == id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    } else {
      app.store.cart = [...app.store.cart, { ...product, quantity: 1 }];
    }
  }
};

export const removeFromCart = (id) => {
  app.store.cart = app.store.cart.filter((product) => product.id != id);
};

export const placeOrder = () => {
  alert("Your order will be ready in " + parseInt(Math.random() * 100));
  app.store.cart = [];
};
