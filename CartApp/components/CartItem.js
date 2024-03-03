import { removeFromCart } from "../services/order.js";

export default class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const item = JSON.parse(this.dataset.item);
    console.log("item", item);
    this.innerHTML = "";
    const template = document.querySelector("#cart-item-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.querySelector("p.qty").textContent = item.quantity;
    this.querySelector("p.name").textContent = item.name;
    this.querySelector("p.price").textContent = item.price;

    this.querySelector("a.delete-button").addEventListener("click", (event) => {
      event.preventDefault();
      removeFromCart(item.id);
    });
  }
}

customElements.define("cart-item", CartItem);
