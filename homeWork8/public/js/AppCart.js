const APIcart = "/api/cart";
Vue.component("cart", {
  data() {
    return {
      cartUrl: "/getBasket.json",
      cartItems: [],
      imgCart: "https://placehold.it/50x100",
      isVisibleCart: false,
    };
  },
  mounted() {
    this.$parent.getJson(`${APIcart + this.cartUrl}`).then((data) => {
      for (let el of data.contents) {
        this.cartItems.push(el);
      }
      this.calcQuantity();
    });
  },
  computed: {},
  methods: {
    addProduct(item) {
      let find = this.cartItems.find((el) => el.id === item.id);
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id}`, { quantity: 1 }).then((data) => {
          if (data.result === 1) {
            find.quantity++;
            this.calcQuantity();
          }
        });
      } else {
        this.$parent.postJson(`/api/cart`, item).then((data) => {
          if (data.result === 1) {
            this.cartItems.push(item);
          }
          this.calcQuantity();
        });
      }
    },
    removeProduct(item) {
      let find = this.cartItems.find((el) => el.id === item.id);
      if (find) {
        this.$parent.removeJson(`/api/cart/${find.id}`, { quantity: 1 }).then((data) => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
            this.calcQuantity();
          }
        });
      }
    },
    showCart() {
      this.isVisibleCart = !this.isVisibleCart;
    },
    calcQuantity() {
      return (this.$root.$refs.cartAllQuantity.cartQuantity = this.cartItems.reduce(
        (sum, item) => (sum += item.quantity),
        0
      ));
    },
  },

  template: `
                <div class="collapseVue" id="collapseCart" v-show="isVisibleCart">
                    
                    <h3 class="container d-flex flex-column flex-md-row justify-content-between flex-wrap">Корзина</h3>
                    <div class="products__cart container d-flex flex-column flex-md-row justify-content-between flex-wrap">
                        <cart-item v-for="item of cartItems" :key="item.id" :img="imgCart" :cart-item="item" @remove="removeProduct">
                        </cart-item>
                    </div>
                   
                    <hr />
                </div>
    `,
});

Vue.component("cart-item", {
  props: ["img", "cartItem"],
  template: `<div class="cart-item col-sm-12 my-5" :data-id="cartItem.id">
                          <div class="card">
                              <div class="card-body">
                                  <h3 class="card-title">{{cartItem.title}}</h3>
                                  <p class="card-text">{{cartItem.price}} $ * {{cartItem.quantity}} шт. = {{cartItem.price * cartItem.quantity}} $ = </p>
                                  
                                  <button class="del-btn btn py-2 d-none d-md-inline-block btn-outline-secondary" 
                                  :data-id="cartItem.id"
                                  @click="$emit('remove', cartItem)"
                                  >Del</button>
                              </div>
                            </div>
                      </div>`,
});
