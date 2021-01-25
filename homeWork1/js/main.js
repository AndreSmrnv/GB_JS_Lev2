const products = [
  { id: 1, title: "Notebook", price: 2000 },
  { id: 2, title: "Mouse", price: 20 },
  { id: 3, title: "Keyboard", price: 200 },
  { id: 4, title: "Gamepad", price: 50 },
];
//Функция для формирования верстки каждого товара
const renderProduct = (title, price) => {
  return `<div class="product-item col-sm-6 my-5">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-text">${price}</p>
                        <button class="buy-btn btn py-2 d-none d-md-inline-block btn-outline-secondary">Купить</button>
                    </div>
                </div>
            </div>`;
};

const renderPage = (list) => {
  const productsList = list.map((item) =>
    renderProduct(item.title, item.price)
  );
  console.log(productsList);
  document.querySelector(".products").innerHTML = productsList.join("");
};

renderPage(products);
