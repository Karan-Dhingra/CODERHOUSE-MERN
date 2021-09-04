const Jimp = require('jimp')
const path = require('path');
const user_service = require('../services/user_service');
const UserDto = require('../dtos/user-dto')

class ActivateController{
    async activate(req, res){
        const {name, avatar} = req.body;
        // console.log('Name: ', name);
        // console.log('Avatar: ', avatar);
        if(!name || !avatar){
            res.status(400).json({message: 'All fields are required!'})
        }

        // Image Base64
        const buffer = Buffer.from(
            avatar.replace(/^data:image\/png;base64,/, ''),
            'base64'
        );

        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;
        // 32478362874-3242342342343432.png

        try{
            const jimResp = await Jimp.read(buffer);
            jimResp
                .resize(150, Jimp.AUTO)
                .write(path.resolve(__dirname, `../storage/${imagePath}`))
        }catch(err){
            res.status(500).json({message: 'Could not procees the image'})
            console.log(err);
        }

        const userId = req.user._id
        // Update User
        try{
            const user = await user_service.findUser({ _id: userId });
            if(!user){
                res.statuse(400).json({message: 'user not found'})
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            user.save()
            res.json({user: new UserDto(user), flag: true})
        }catch(err){
            res.status(500).json({ message: 'something went wrong' })
            // console.log(err);
        }
            
    }
}

module.exports = new ActivateController();