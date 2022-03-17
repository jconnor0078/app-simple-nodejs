const Stores = require('../../mongo/models/store');
const getError = require('../../mongo/models/error-helper');

const createStore = async (req, res) => {
  try {
    console.log('method createStore -> req.body: ', req.body);
    const { nombre, iniciales } = req.body;

    const store = await Stores.create({
      nombre,
      iniciales,
    });

    res.send({ status: 'OK', message: 'store created', data: store });
  } catch (error) {
    console.log('***ERROR CREATING Store***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const updateStore = async (req, res) => {
  try {
    console.log('method updateStore -> req.body: ', req.body);
    const { nombre, iniciales, storeId } = req.body;

    const store = await Stores.findByIdAndUpdate(storeId, {
      nombre,
      iniciales,
    });

    res.send({ status: 'OK', message: 'store updated', data: store });
  } catch (error) {
    console.log('***ERROR UPDATING STORE***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const deleteStore = async (req, res) => {

 
  try {
    console.log('method deleteStore -> req.body: ', req.body);
    const { storeId } = req.body;
    if (!storeId) {
      throw new Error("missing param storeId");
    }
    // eliminando el usuario
    await Loteries.findByIdAndDelete(storeId);

     
    res.send({ status: 'OK', message: 'store deleted', data: null });
  } catch (error) {
    console.log('***ERROR UPDATING STORE***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const getStores = async (req, res) => {
  try {
    console.log('method getStores -> all: ');

    // buscando todos los productos
    // const products = await Products.find();

    // buscando todos los seleccionando algunos campos
    // const products = await Products.find().select('title desc price images');

    // buscando todos los seleccionando algunos campos y agregando la tabla con que esta relacionada
    // nota el primer campo de populate es el campo que esta en la tabla product
    // nota el segundo campo es para que solo aparescan los campos seleccionado en el string
    //    y no todos, es opcional
    const stores = await Stores.find()
      .select('_id nombre iniciales');

    res.send({ status: 'OK', message: '', data: stores });
  } catch (error) {
    console.log('***ERROR SEARCHING ALL STORES***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const getStoreById = async (req, res) => {
  try {
    console.log('method deleteStore -> req.body: ', req.params);
    const { storeId } = req.params; 
    const store = await Stores.findOne({ _id: storeId })
      .select('_id nombre iniciales');

    res.send({ status: 'OK', message: '', data: store });
  } catch (error) {
    console.log('***ERROR SEARCHING ALL STORE BY ID***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};
 
module.exports = {
  createStore,
  updateStore,
  deleteStore,
  getStores,
  getStoreById
};
