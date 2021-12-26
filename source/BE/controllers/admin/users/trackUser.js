const User = require('../../../models/User.model')
const { BadRequestError } = require('../../../helpers/errors')

async function trackUser(req, res, next) {

    try {

        const existingUser = await User.findOne({ _id: req.params.id });

        if (!existingUser) {
            throw new BadRequestError("Không tìm thấy tài khoản!");
        }

        let track = existingUser.track;

        const UserTrack = await User.findOneAndUpdate({ _id: req.params.id }, { track: !track }, { new: true, useFindAndModify: false })

        if (!UserTrack) {
            throw new BadRequestError("Lỗi khi khôi phục tài khoản!");
        }

        res.status(200).send({
            success: true,
            message: "KHÔI PHỤC TÀI KHOẢN THÀNH CÔNG!",
            UserTrack: UserTrack,
        });

    } catch (error) {
        console.log(error)
        throw new ApiError(httpStatus.NOT_FOUND, 'Delete not success');
    }

}

module.exports = trackUser;
