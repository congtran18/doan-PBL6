const User = require('../../../models/User.model')
const { BadRequestError } = require('../../../helpers/errors')

async function deleteOrder(req, res, next) {

    try {
        const UserDelete = await User.findOneAndDelete({ _id: req.params.id })

        if (!UserDelete) {
            throw new BadRequestError("Lỗi khi xoá tài khoản!");
        }

        res.status(200).send({
            success: true,
            message: "XOÁ TÀI KHOẢN THÀNH CÔNG!",
            UserDelete: UserDelete,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = deleteOrder;
