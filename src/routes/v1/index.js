const userRoutes = require('./users-routes');
const productRoutes = require('./products-routes');
const storeRoutes = require('./stores-routes');

module.exports = (app) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/stores', storeRoutes);
};
