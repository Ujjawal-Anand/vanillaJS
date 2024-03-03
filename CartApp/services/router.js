export const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        Router.go(href);
        console.log("Internal nav");
      });
    });
    Router.go(location.pathname);

    //back button compatibility
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/index.html":
      case "/":
      case "":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          console.log("Should be here");
          pageElement = document.createElement("details-page");
          pageElement.dataset.productId = route.substring(
            route.lastIndexOf("-") + 1
          );
        }
        break;
    }
    if (pageElement) {
      const root = document.querySelector("main");
      root.innerHTML = "";
      root.appendChild(pageElement);
    }
    window.scrollX = 0;
  },
};
