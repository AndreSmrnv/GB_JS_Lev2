//#homeWork2
class Goods {
  constructor(id, title, price, quantity, img) {
    this.id = id;
    this.title = title;
    this.price = price || 0;
    this.quantity = quantity || 1;
    this.img = img || "https://placehold.it/200x150";
  }
}

class ProductsList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts();
  }
  _fetchProducts() {
    let i = 0;
    this.goods = [
      new Goods(i++, "PC", 1500),
      new Goods(i++, "Notebook", 2000),
      new Goods(i++, "Mouse", 20),
      new Goods(i++, "Keyboard", 200),
      new Goods(i++, "Gamepad", 50),
      new Goods(i++, "Tablet", 500),
    ];
  }
  render() {
    const block = document.querySelector(this.container);
    this.goods.forEach((product) => {
      const productObj = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", productObj.render());
    });
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = product.img;
  }
  render() {
    return `<div class="product-item col-sm-6 my-5" data-id="${this.id}">
                          <div class="card">
                              <div class="card-body">
                                  <h3 class="card-title">${this.title}</h3>
                                  <p class="card-text">${this.price} $</p>
                                  <button class="buy-btn btn py-2 d-none d-md-inline-block btn-outline-secondary">Купить</button>
                              </div>
                            </div>
                      </div>`;
  }
}

let list = new ProductsList();
list.render();

class CartProductsList {
  constructor(container = ".products__cart") {
    this.container = container;
    this.cartItems = [];
    this._fetchProducts();
  }
  _fetchProducts() {
    let i = 0;
    this.cartItems = [
      new Goods(i++, "PC", 1500, 2),
      new Goods(i++, "Notebook", 2000, 3),
      new Goods(i++, "Mouse", 20, 1),
      new Goods(i++, "Keyboard", 200, 5),
      new Goods(i++, "Gamepad", 50, 1),
      new Goods(i++, "Tablet", 500, 4),
    ];
  }
  render() {
    const block = document.querySelector(this.container);
    this.cartItems.forEach((product) => {
      const productObj = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", productObj.render());
    });
  }
  addCart() {}
  removeCart() {}
  _getSumPrice() {}
  _getsumQuantity() {}
}

class CartItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = product.img;
  }
  render() {
    return `<div class="product-item col-sm-12 my-5" data-id="${this.id}">
                          <div class="card">
                              <div class="card-body">
                                  <h3 class="card-title">${this.title}</h3>
                                  <p class="card-text">${this.price} $</p>
                                  <button class="buy-btn btn py-2 d-none d-md-inline-block btn-outline-secondary">Купить</button>
                              </div>
                            </div>
                      </div>`;
  }
}

let listCart = new CartProductsList();
listCart.render();

// const products = [
//   { id: 1, title: "Notebook", price: 2000 },
//   { id: 2, title: "Mouse", price: 20 },
//   { id: 3, title: "Keyboard", price: 200 },
//   { id: 4, title: "Gamepad", price: 50 },
// ];
// //Функция для формирования верстки каждого товара
// const renderProduct = (title, price) => {
//   return `<div class="product-item col-sm-6 my-5">
//                 <div class="card">
//                     <div class="card-body">
//                         <h3 class="card-title">${title}</h3>
//                         <p class="card-text">${price}</p>
//                         <button class="buy-btn btn py-2 d-none d-md-inline-block btn-outline-secondary">Купить</button>
//                     </div>
//                   </div>
//             </div>`;
// };

// const renderPage = (list) => {
//   const productsList = list.map((item) =>
//     renderProduct(item.title, item.price)
//   );
//   console.log(productsList);
//   document.querySelector(".products").innerHTML = productsList.join("");
// };

// renderPage(products);
