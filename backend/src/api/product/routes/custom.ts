export default {
  routes: [
    {
      method: 'POST',
      path: '/products/:slug/view',
      handler: 'product.incrementView',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
