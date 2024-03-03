import { getProductById } from "../services/menu.js";

export default class DetailsPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const template = document.querySelector("#details-page-template");
    const content = template.content.cloneNode(true);

    const styles = document.createElement("style");
    this.root.appendChild(content);

    async function loadCSS() {
      const request = await fetch("/components/detailsPage.css");
      styles.textContent = await request.text();
    }

    loadCSS();
    this.root.appendChild(styles);
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const productId = this.dataset.productId;
    const product = await getProductById(productId);

    this.root.querySelector("h2").textContent = product.name;
    this.root.querySelector("p.description").textContent = product.description;
    this.root.querySelector("p.price").textContent = product.price;
    this.root.querySelector("img").src = `/data/images/${product.image}`;
  }
}

customElements.define("details-page", DetailsPage);
