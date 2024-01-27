import mongoose, {Schema} from "mongoose";


const userSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password:{
            type: String,
            required: true,
        }
    },{timestamps: true}
)

userSchema.methods.isPasswordCorrect = async function(password){
    return this.password===password;
}

export const User = mongoose.model("User",userSchema);