import {model, Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
      }
});

const User = model('User', UserSchema);


export default User;