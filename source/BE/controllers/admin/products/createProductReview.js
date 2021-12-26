const Product = require('../../../models/Product.model')
const { BadRequestError } = require('../../../helpers/errors')

async function createProductReview(req, res, next) {

  const { rating, comment } = req.body;

  console.log("vo day")

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: `Review added by ${req.user.name}` });
  } else {
    res.status(401);
    throw new BadRequestError("Product not found");
  }

}

module.exports = createProductReview;
