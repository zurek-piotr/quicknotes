module.exports = {
  // publicPath: '/quicknotes/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
};
