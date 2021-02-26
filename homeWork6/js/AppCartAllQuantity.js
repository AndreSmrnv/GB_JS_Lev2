Vue.component("cartAllQuantity", {
  data() {
    return {
      cartQuantity: 0,
    };
  },
  computed: {
    isVisible() {
      return this.cartQuantity !== 0;
    },
  },
  template: `
      <span id="cart-quantity" class="badge badge-light" v-show="isVisible">{{cartQuantity}}</span>
      `,
  
});
