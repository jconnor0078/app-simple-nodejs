const Products = require('../../mongo/models/products');
const getError = require('../../mongo/models/error-helper');

const createProduct = async (req, res) => {
  try {
    console.log('method createProduct -> req.body: ', req.body);
    const { title, desc, price, images, userId } = req.body;

    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId,
    });

    res.send({ status: 'OK', message: 'product created', data: product });
  } catch (error) {
    console.log('***ERROR CREATING PRODUCT***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log('method updateProduct -> req.body: ', req.body);
    const { title, desc, price, images, productId } = req.body;

    const product = await Products.findByIdAndUpdate(productId, {
      title,
      desc,
      price,
      images,
    });

    res.send({ status: 'OK', message: 'product updated', data: product });
  } catch (error) {
    console.log('***ERROR UPDATING PRODUCT***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const deleteProduct = (req, res) => {
  res.send('eliminar producto');
};

const getProducts = async (req, res) => {
  try {
    console.log('method getProducts -> all: ');

    // buscando todos los productos
    // const products = await Products.find();

    // buscando todos los seleccionando algunos campos
    // const products = await Products.find().select('title desc price images');

    // buscando todos los seleccionando algunos campos y agregando la tabla con que esta relacionada
    // nota el primer campo de populate es el campo que esta en la tabla product
    // nota el segundo campo es para que solo aparescan los campos seleccionado en el string
    //    y no todos, es opcional
    const products = await Products.find()
      .select('title desc price images')
      .populate('user', 'username email data role');

    res.send({ status: 'OK', message: '', data: products });
  } catch (error) {
    console.log('***ERROR SEARCHING ALL PRODUCTS***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const getProductsByUser = async (req, res) => {
  try {
    console.log('method getProductsByUser -> ', req.params.userId);

    // para agregar un filtro en query colocamos un obj con el filtro puede ver los diferentes query
    //  que se pueden hacer en una pagina guardada en el chrome
    const products = await Products.find({
      user: req.params.userId,
    })
      .select('title desc price images')
      .populate('user', 'username email data role');

    // buscando productos que el precio sea mayor a 20
    /*
    const products = await Products.find({
      price: {$gt: 20}
    });
    */

    res.send({ status: 'OK', message: '', data: products });
  } catch (error) {
    console.log('***ERROR SEARCHING ALL PRODUCTS***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductsByUser,
};
