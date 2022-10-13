const mongoose = require('mongoose');
const validEmail = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'поле email является обязательным для заполнения'],
        validate: {
            validator(v) {
                return validEmail.isEmail(v);
            },
            message: 'Введите пожалуйста Email',
        },
        unique: [true],
    },
    password: {
        type: String,
        select: false,
        required: [true, 'поле password является обязательным для заполнения'],
    },
    name: {
        type: String,
        default: 'Жак-Ив Кусто',
        minLength: [2, 'минимальное значение поля name 2 символа'],
        maxLength: [30, 'максимально значение поля name 30 символов'],
    }
});

userSchema.methods.toJSON = function toJSN() {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('user', userSchema);
