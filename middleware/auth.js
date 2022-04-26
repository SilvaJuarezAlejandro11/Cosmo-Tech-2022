const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Obtener el token en el header.

  const token = req.header('x-auth-token');

  // Checar si el token existe.

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No hay token, autorización denegada.' });
  }

  try {
    // Verificar token.

    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Decodificar el token para saber el usuario.
    req.user = decoded.user;

    // Pasar a la siguiente funcion.
    next();
  } catch (err) {
    res.status(401).send('Token invalido.');
  }
};
