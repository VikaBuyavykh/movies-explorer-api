const allowedCors = ['https://buyavykh-diploma.nomoredomainsmonster.ru', 'http://buyavykh-diploma.nomoredomainsmonster.ru', 'localhost:3000'];
function handleCors(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
}
module.exports = handleCors;