//#homeWork6

const app = new Vue({
  el: "#app",
  data: {
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
  },
  mounted() {},
});
