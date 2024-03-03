export default class OrderPage extends HTMLElement {
  #user = {
    name: "",
    phone: "",
    email: "",
  };
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    this.root.appendChild(style);
    const section = document.createElement("section");
    this.root.appendChild(section);

    async function loadCSS() {
      const request = await fetch("/components/OrderPage.css");
      style.textContent = await request.text();
    }

    loadCSS();
  }

  connectedCallback() {
    this.render();
    window.addEventListener("app-cart-updated", (event) => this.render());
  }

  render() {
    let section = this.root.querySelector("section");
    if (app.store.cart.length == 0) {
      section.innerHTML = `<p class='empty'>Your cart is empty</p>`;
    } else {
      const html = `<h2> Your Order</h2>
       <ul></ul>`;

      section.innerHTML = html;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);

      let total = 0;
      for (let product of app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(product);
        this.root.querySelector("ul").appendChild(item);

        total += product.price * product.quantity;
      }

      this.root.querySelector("ul").innerHTML += `
       <li>
        <p class='total'>Total</p>
        <p class='price-total'> ${total.toFixed(2)}</p>
      `;
    }
    this.setFormBindings(this.root.querySelector("form"));
  }

  setFormBindings(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(
        `Thank you for order ${this.#user.name}. ${
          this.#user.email
            ? "We will be sending receipt over email"
            : "Please ask for receipt at counter"
        } `
      );
      this.#user = {
        name: "",
        phone: "",
        email: "",
      };
    });

    Array.from(form.elements).forEach((element) => {
      console.log("element name", element.name);
      if (element.name) {
        element.addEventListener("change", (event) => {
          this.#user[element.name] = element.value;
          console.log("user", this.#user);
        });
      }
    });

    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });
  }
}

customElements.define("order-page", OrderPage);
