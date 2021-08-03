const otpService = require('../services/otp_service')
const hashService = require('../services/hash_service')
const userService = require('../services/user_service')
const tokenService = require('../services/token_service')
const UserDto = require('../dtos/user-dto');



class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body
        if (!phone) {
            res.status(400).json({ message: 'Phone field is required' })
        }

        // OTP
        const otp = await otpService.generateOtp();

        // Hashing
        // ttl -> Time to leave
        const ttl = 1000 * 60 * 2; // 2 Mins
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        const hash = hashService.hashOtp(data)

        // Send OTP
        try {
            // await otpService.sendBySms(phone, otp)
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed'});
        }

        // res.json({otp: otp, hash: hash});
    }

    async verifyOtp(req, res) {
        // Logic
        const { otp, hash, phone } = req.body
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required' })
        }
        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP Expired!' })
        }

        const data = `${phone}.${otp}.${expires}`

        const isValid = otpService.verifyOtp(hashedOtp, data)

        if (!isValid) {
            re.status(400).json({ message: 'Invalid OTP' })
        }

        let user;

        try {
            user = await userService.findUser({ phone })
            if (!user) {
                user = await userService.createUser({ phone })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db Error!!' })
        }


        // Tokens for connecting Frontend with Backend
        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id, 
            activated: false
        })

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        })

        const userDto = new UserDto(user)
        res.json({ accessToken, user: userDto })
    }
}

module.exports = new AuthController();