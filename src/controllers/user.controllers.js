import { User } from "../models/user.models.js";


const registerUser = async(req,res)=>{
    const {email,password} = req.body;

    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        res.status(404).send({message: "All Fields are required"});
    }
    
    const existedUser = await User.findOne({email: email})

    if(existedUser){
        res.status(404).send({message:"User already Exists Please Log in"})
    }

    const user = await User.create({
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    
    if(!createdUser){
        res.status(500).send({message: "Internal Error"});
    }

    res.status(200).send({message: "User Registered Successfully"});
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;

    if(!email){
        res.status(404).send({message: "Email is required"});
    }

    const user = await User.findOne({email : email});

    if(!user){
        res.status(404).send({message: "User does not exist"});
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        res.status(404).send({message: "Invalid Password"});
    }

    res.status(200).send({message: "Login Successfully"});
}



export {
    registerUser,
    loginUser,

}