const Store = {
  menu: null,
  cart: [],
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property === "menu") {
      window.dispatchEvent(new Event("app-menu-updated"));
    } else if (property === "cart") {
      window.dispatchEvent(new Event("app-cart-updated"));
    }
    return true;
  },
  get(target, property) {
    console.log("here".target, property, target[property]);
    return target[property];
  },
});

export default proxyStore;
