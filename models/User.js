import mongoose from "mongoose";
const Schema = mongoose.Schema

// Create Schema

const UserSchema = new Schema({
    name:{
      type: String,
      required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    register_date:{
      type: Date,
      default: Date.now
    }

})

const User = mongoose.model('User',UserSchema);

export default User