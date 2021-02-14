Vue.component("products", {
  data() {
    return {
      catalogUrl: "/catalogData.json",
      allProducts: [],
      imgProduct: "https://placehold.it/200x150",
    };
  },
  mounted() {
    this.$parent.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.allProducts.push(new Goods(el.id_product, el.product_name, el.price));
      }
    });
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, "i");
      this.filtered = this.products.filter((el) => regexp.test(el.product_name));
    },
  },
  template: `
    <div class="products container d-flex flex-column flex-md-row justify-content-between flex-wrap">
        <div
        class="product-item col-sm-6 my-5"
        v-for="productEl of allProducts"
        v-show="productEl.show"
        :key="productEl.id"
        :data-id="productEl.id"
        >
            <productItem 
                        :img="imgProduct"
                        :productObj="productEl"
                        @add-product="$parent.$refs.cart.addProduct">
            </productItem>
        </div>
    </div>
    `,
});
Vue.component("productItem", {
  props: ["productObj", "img"],
  template: `
                <div class="card">
                    <img :src="productObj.img" class="card-img-top" :alt="productObj.title" />
                    <div class="card-body">
                        <h3 class="card-title">{{productObj.title}}</h3>
                        <p class="card-text">{{productObj.price}} $</p>
                        <button
                            class="buy-btn btn py-2 d-none d-md-inline-block btn-outline-secondary"                            
                            @click="$emit('add-product', productObj)"
                        >
                            Купить
                        </button>
                    </div>
                </div>
    `,
});
const API = "/api/products";
// const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
class Goods {
  constructor(id, title, price, quantity, img, show) {
    this.id = id;
    this.title = title;
    this.price = price || 0;
    this.quantity = quantity || 1;
    this.img = `https://via.placeholder.com/250x200.png?text=${title}` || "https://placehold.it/200x150";
    this.show = show || true;
  }
}
