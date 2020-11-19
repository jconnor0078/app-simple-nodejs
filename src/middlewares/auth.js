const jwt = require('jsonwebtoken');

const isValidHost = (req, res, next) => {
  const arrHost = ['localhost', 'google.com'];
  if (arrHost.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({
      status: 'ACCESS_DENIED',
      message: 'host invalid.',
      data: null,
    });
  }
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      // obteniendo la data que trae el token
      const data = jwt.verify(token, process.env.SECRET_JWT);
      // asignandole los datos del token a una nueva variable del
      // req para poder consumirlo en el controller
      req.sessionData = data;
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'missing header token.',
        data: null,
      };
    }
  } catch (error) {
    res.status(error.code || 500).send({
      status: error.status || 'ERROR',
      message: error.message,
      data: null,
    });
  }
};

// este es especificamente para actualizar, para comprobar si el mismo
// usuario que envia la peticion es el que quiere modificar el usuario o tiene rol admin
// se llama despues de isAuth
const isTheSameUserOrRolAdmin = (req, res, next) => {
  try {
    if (
      req.sessionData.userId !== req.body.userId &&
      req.sessionData.role !== 'admin'
    ) {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'missing permission or invalid role.',
        data: null,
      };
    }
    next();
  } catch (error) {
    res.status(error.code || 500).send({
      status: error.status || 'ERROR',
      message: error.message,
      data: null,
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.sessionData;
    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'invalid role.',
        data: null,
      };
    }
    next();
  } catch (error) {
    res.status(error.code || 500).send({
      status: error.status || 'ERROR',
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  isValidHost,
  isAuth,
  isTheSameUserOrRolAdmin,
  isAdmin,
};
