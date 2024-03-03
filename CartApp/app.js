import Store from "./services/store.js";
import { loadMenuData } from "./services/menu.js";
import { Router } from "./services/router.js";

import DetailsPage from "./components/DetailsPage.js";
import MenuPage from "./components/MenuPage.js";
import OrderPage from "./components/OrderPage.js";
import ProductItem from "./components/ProductItems.js";
import CartItem from "./components/CartItem.js";

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  Router.init();
  loadMenuData();

  window.addEventListener("app-cart-updated", () => {
    const badge = document.getElementById("badge");
    const count = app.store.cart.reduce((acc, item) => item.quantity + acc, 0);
    badge.textContent = count;
    badge.hidden = count == 0;
  });
});
