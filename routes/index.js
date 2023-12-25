const { Router } = require("express");
const userRouter = require("./users");
const movieRouter = require("./movies");

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send({ "message": "Hello world!" });
});
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
