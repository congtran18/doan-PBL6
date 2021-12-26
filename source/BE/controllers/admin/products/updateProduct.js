const Product = require('../../../models/Product.model')
const { BadRequestError } = require('../../../helpers/errors')
const removeKeyNotValue = require('../../../helpers/removeKeyNotValue');

async function updateProduct(req, res, next) {
    const { realname, status, discount, type, category, color, size, cost, description, image, updateimage } = req.body
    const reqFiles = [];
    let indexfile = 0;
    let indexnotfile = 0;
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < 5; i++) {
        if (updateimage[i] === '1') {
            reqFiles.push(url + '/uploads/' + req.files[indexfile].filename);
            indexfile = indexfile + 1;
        } else if (Array.isArray(image)) {
            reqFiles.push(image[indexnotfile]);
            indexnotfile = indexnotfile + 1;
        } else {
            reqFiles.push(image)
        }
    }

    let updatedProduct;

    try {
        updatedProduct = {
            realname,
            status,
            discount,
            type,
            category,
            color, 
            size,
            cost,
            description,
            image: reqFiles,
        }

        removeKeyNotValue(updatedProduct);

        updatedProduct = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedProduct },
            { new: true, useFindAndModify: false }
        )

        res.status(200).send({
            success: true,
            message: "CẬP NHẬT SẢN PHẨM THÀNH CÔNG!",
            trailerTypeObj: updatedProduct,
        });
    } catch (error) {
        // console.log(error)
        throw new BadRequestError("Error occur when update product!");
    }

}

module.exports = updateProduct;