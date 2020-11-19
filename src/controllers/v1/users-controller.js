const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users');
const Products = require('../../mongo/models/products');
const getError = require('../../mongo/models/error-helper');

const expireToken = process.env.EXPIRE_TOKEN;
const secretJwt = process.env.SECRET_JWT;

const login = async (req, res) => {
  try {
    console.log('method login -> req.body: ', {
      email: req.body.email,
      password: '*******',
    });
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        // creando el token con su tiempo de expiracion
        const expiresTokenInt = parseInt(expireToken, 10);
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          secretJwt,
          {
            expiresIn: expiresTokenInt,
          }
        );

        res.send({
          status: 'OK',
          message: '',
          data: { token, expiresIn: expiresTokenInt },
        });
      } else {
        res.status(403).send({
          status: 'INVALID_CREDENTIALS',
          message: 'user or password invalid.',
          data: null,
        });
      }
    } else {
      res.status(403).send({
        status: 'INVALID_CREDENTIALS',
        message: 'user or password invalid.',
        data: null,
      });
    }
  } catch (error) {
    console.log('***ERROR DOING LOGIN***', error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const createUser = async (req, res) => {
  try {
    console.log('method createUser -> req.body: ', req.body);
    const { username, password, email, data } = req.body;
    const hash = await bcrypt.hash(password, 15);
    /* una forma de crear en mongo
    await Users.create({
      username,
      password: hash,
      email,
      data
    });
    */
    const user = new Users();
    user.username = username;
    user.password = hash;
    user.email = email;
    user.data = data;

    await user.save();

    res.send({ status: 'OK', message: 'user created', data: null });
  } catch (error) {
    console.log('***ERROR CREATING USERS***', error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log('method updateUser -> req.body: ', req.body);
    const { username, email, data, userId } = req.body;

    await Users.findByIdAndUpdate(userId, {
      username,
      email,
      data,
    });

    res.send({ status: 'OK', message: 'user updated', data: null });
  } catch (error) {
    console.log('***ERROR UPDATING USER***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log('method deleteUser -> req.body: ', req.body);
    const { userId } = req.body;
    if (!userId) {
      throw new Error('missing param userId');
    }
    // eliminando el usuario
    await Users.findByIdAndDelete(userId);
    // eliminando todos los productos del usuario que se elimino
    await Products.deleteMany({ user: userId });
  } catch (error) {
    console.log('***ERROR DELETE USER***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

const getUsers = async (req, res) => {
  try {
    console.log('method getUsers -> all: ');

    // colocando en select el nombre del campo igual a cero,
    //   le decimos que nos de todos los campos excepto ese
    // si colocamos el nombre del campo igual a uno,
    //  le decimos que solo nos de ese campo y no los otros.
    // nota: no puede tener convinaciones de cero y uno,
    //  porque no se permiten convinaciones de inclucions y excluciones
    const users = await Users.find().select({ password: 0, role: 0, __v: 0 });

    res.send({ status: 'OK', message: '', data: users });
  } catch (error) {
    console.log('***ERROR SEARCHING ALL USERS***', error.code, error);
    const errorFormated = getError(error);
    res.status(errorFormated.code).send(errorFormated.error);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  login,
};
