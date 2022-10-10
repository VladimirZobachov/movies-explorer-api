const User = require('../models/User');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res, next) => {
    const {
        email,
        password,
        name
    } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await new User.create({
            email,
            hashedPassword,
            name
        })
        return res.status(200).send(user);
    }catch (e){
        return next(e);
    }
}

const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try{
        const user = await User.findOne(email).select(password);
        const token = jwt.sign({_id: user._id},
            NODE_ENV === 'production' ? JWT_SECRET : 'SECRET'
        )
        res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: true,
            //secure: true
        })
        res.send({data: user.toJSON()});
    }catch (e){
        next(e);
    }
}

module.exports = {
    createUser,
    login
};