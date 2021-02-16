Vue.component("filterProduct", {
  data() {
    return {
      userSearch: "",
      filteredProducts: [],
    };
  },
  methods: {
    filterProducts(value = this.userSearch) {
      const regexp = new RegExp(value, "i");
      const allProductArray = this.$root.$refs.products.allProducts;
      this.filteredProducts = [...allProductArray.filter((item) => regexp.test(item.title))];
      allProductArray.forEach((el) => {
        if (!this.filteredProducts.includes(el)) {
          el.show = false;
        } else {
          el.show = true;
        }
      });
      this.notFound = this.filteredProducts.length > 0 ? false : true;
    },
  },
  template: `
        <form action="#" class="form-inline" @submit.prevent="filterProducts()">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Что ищем?"
              aria-label="Search"
              v-model.lazy="userSearch"
              @change="filterProducts()"
            />
          </form>
        `,
  
});
