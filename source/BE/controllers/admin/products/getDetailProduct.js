const Product = require('../../../models/Product.model')
const { BadRequestError } = require('../../../helpers/errors')

async function getDetailProduct(req, res, next) {

    let findProduct = await Product.findById(req.params.id).populate('type').populate('category').lean()

    if (!findProduct) {
        throw new BadRequestError("Lỗi khi hiển thị chi tiết sản phẩm!");
    }

    let data = []

    for(let i =0; i < findProduct.image.length; i++){
        if(findProduct.image[i] !== "undefined"){
            data.push({
                original: findProduct.image[i],
                thumbnail: findProduct.image[i],
                // fullscreen: true,
                originalHeight : "650px",
                originalWidth : "650px",
                thumbnailHeight: "100px",
                thumbnailWidth : "100px"
            })
    }
    }

    findProduct = {...findProduct, ...{ data : data}}

    res.status(200).send({
        success: true,
        message: "Success",
        findProduct: findProduct,
    });

}

module.exports = getDetailProduct;
