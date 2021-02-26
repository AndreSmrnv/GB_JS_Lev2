//#homeWork5

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class Goods {
  constructor(id, title, price, quantity, img, show) {
    this.id = id;
    this.title = title;
    this.price = price || 0;
    this.quantity = quantity || 1;
    this.img = img || "https://placehold.it/200x150";
    this.show = show || true;
  }
}

const app = new Vue({
  el: "#app",
  data: {
    catalogUrl: "/catalogData.json",
    allProducts: [],
    userSearch: "",
    filteredProducts: [],
    isVisibleCart: false,
    notFound: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },
    filterProducts(value = this.userSearch) {
      const regexp = new RegExp(value, "i");
      this.filteredProducts = [...this.allProducts.filter((product) => regexp.test(product.title))];
      this.allProducts.forEach((el) => {
        if (!this.filteredProducts.includes(el)) {
          el.show = false;
        } else {
          el.show = true;
        }
      });
      this.notFound = this.filteredProducts.length > 0 ? false : true;
    },
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.allProducts.push(new Goods(el.id_product, el.product_name, el.price));
      }
    });
  },
});

// class Goods {
//   constructor(id, title, price, quantity, img) {
//     this.id = id;
//     this.title = title;
//     this.price = price || 0;
//     this.quantity = quantity || 1;
//     this.img = img || "https://placehold.it/200x150";
//   }
// }

// class ProductsList {
//   constructor(cart, container = ".products", url = "/catalogData.json") {
//     this.container = container;
//     this.url = url;
//     this.cart = cart;
//     this.goods = [];
//     this.allGoods = [];
//     this.filteredGoods = [];
//     this._fetchProducts();
//     this._init();
//   }
//   _fetchProducts() {
//     this.getJson().then((data) => this.handleData(data));
//     // let i = 0;
//     // this.goods = [
//     //   new Goods(i++, "PC", 1500),
//     //   new Goods(i++, "Notebook", 2000),
//     //   new Goods(i++, "Mouse", 20),
//     //   new Goods(i++, "Keyboard", 200),
//     //   new Goods(i++, "Gamepad", 50),
//     //   new Goods(i++, "Tablet", 500),
//     // ];
//   }
//   _init() {
//     document
//       .querySelector(this.container)
//       .addEventListener("click", (event) => {
//         if (event.target.classList.contains("buy-btn")) {
//           this.cart.addToCart(event.target);
//         }
//       });
//   }
//   getJson(url) {
//     return fetch(url ? url : `${API + this.url}`)
//       .then((result) => result.json())
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   handleData(data) {
//     this.goods = [...data];
//     this.render();
//     console.log(this.allGoods);
//   }
//   render() {
//     const block = document.querySelector(this.container);
//     this.goods.forEach((product) => {
//       const productObj = new ProductItem(product);
//       this.allGoods.push(productObj);
//       block.insertAdjacentHTML("beforeend", productObj.render());
//     });
//   }
// }

// class ProductItem {
//   constructor(product) {
//     this.title = product.product_name;
//     this.price = product.price;
//     this.id = product.id_product;
//     this.img = product.img || "https://placehold.it/200x150";
//   }
//   render() {
//     return `<div class="product-item col-sm-6 my-5" data-id="${this.id}" >
//                           <div class="card">
//                               <div class="card-body">
//                                   <h3 class="card-title">${this.title}</h3>
//                                   <p class="card-text">${this.price} $</p>
//                                   <button class="buy-btn btn py-2 d-none d-md-inline-block btn-outline-secondary"
//                                   data-id="${this.id}"
//                                   data-title="${this.title}"
//                                   data-price="${this.price}">Купить</button>
//                               </div>
//                             </div>
//                       </div>`;
//   }
// }

// class CartProductsList {
//   constructor(container = ".products__cart") {
//     this.container = container;
//     this.cartItems = [];
//     this.allGoods = [];
//     this._init();
//   }
//   _fetchProducts() {
//     // let i = 0;
//     // this.cartItems = [
//     //   new Goods(i++, "PC", 1500, 2),
//     //   new Goods(i++, "Notebook", 2000, 3),
//     //   new Goods(i++, "Mouse", 20, 1),
//     //   new Goods(i++, "Keyboard", 200, 5),
//     //   new Goods(i++, "Gamepad", 50, 1),
//     //   new Goods(i++, "Tablet", 500, 4),
//     // ];
//   }
//   render() {
//     const block = document.querySelector(this.container);
//     block.textContent = "";
//     this.cartItems.forEach((product) => {
//       const productObj = new CartItem(product);
//       block.insertAdjacentHTML("beforeend", productObj.render());
//     });
//   }
//   addToCart(elemProduct) {
//     const productId = +elemProduct.dataset["id"];
//     const findGood = this.cartItems.find((good) => good.id === productId);
//     if (findGood) {
//       findGood.quantity++;
//       this._updateCart(findGood);
//     } else {
//       this.cartItems.push(
//         new Goods(
//           productId,
//           elemProduct.dataset["title"],
//           +elemProduct.dataset["price"]
//         )
//       );
//       this.render();
//     }
//     this._getSumQuantity();
//   }
//   removeFromCart(elemProduct) {
//     let productId = +elemProduct.dataset["id"];
//     let find = this.cartItems.find((product) => product.id === productId);
//     if (find.quantity > 1) {
//       find.quantity--;
//       this._updateCart(find);
//     } else {
//       this.cartItems.splice(this.cartItems.indexOf(find), 1);
//       this.render();
//     }
//     this._getSumQuantity();
//   }
//   _updateCart(product) {
//     const block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
//     block.querySelector(".card-text").textContent = `${product.price} $ * ${
//       product.quantity
//     } шт. = ${product.price * product.quantity} $ = `;
//   }
//   _getSumPrice() {
//     return this.cartItems.reduce(
//       (sum, item) => (sum += item.quantity * item.price),
//       0
//     );
//   }
//   _getSumQuantity() {
//     const block = document.querySelector("#cart-quantity");
//     block.textContent = this.calcQuantity();
//     if (+block.textContent !== 0) {
//       block.classList.remove("d-none");
//     } else {
//       block.classList.add("d-none");
//     }
//   }
//   calcQuantity() {
//     return this.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
//   }
//   _init() {
//     document.querySelector(this.container).addEventListener("click", (e) => {
//       if (e.target.classList.contains("del-btn")) {
//         this.removeFromCart(e.target);
//       }
//     });
//   }
// }

// class CartItem {
//   constructor(product) {
//     this.title = product.title;
//     this.price = product.price;
//     this.id = product.id;
//     this.quantity = product.quantity;
//     this.img = product.img || "https://placehold.it/200x150";
//   }
//   render() {
//     return `<div class="cart-item col-sm-12 my-5" data-id="${this.id}">
//                           <div class="card">
//                               <div class="card-body">
//                                   <h3 class="card-title">${this.title}</h3>
//                                   <p class="card-text">${this.price} $ * ${
//       this.quantity
//     } шт. = ${this.price * this.quantity} $ = </p>

//                                   <button class="del-btn btn py-2 d-none d-md-inline-block btn-outline-secondary"
//                                   data-id="${this.id}"
//                                   >Del</button>
//                               </div>
//                             </div>
//                       </div>`;
//   }
// }

// let listCart = new CartProductsList();

// let list = new ProductsList(listCart);
// //list.render();
