export default class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css");
      styles.textContent = await request.text();
    }

    loadCSS();
  }

  connectedCallback() {
    this.render();
    window.addEventListener("app-menu-updated", (event) => {
      this.render();
    });
  }

  render() {
    const menuNode = this.root.querySelector("#menu");

    if (app.store.menu) {
      menuNode.innerHTML = "";

      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
            <h3>${category.name}</h3>
            <ul class='category'></ul>
            `;
        menuNode.appendChild(liCategory);
        console.log("menuNode", menuNode);

        const ulCategory = liCategory.querySelector("ul.category");
        for (let product of category.products) {
          const productCategory = document.createElement("product-item");
          productCategory.dataset.product = JSON.stringify(product);
          ulCategory.appendChild(productCategory);
        }
      }
    } else {
      menuNode.innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
