const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req,res) =>{
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });  

        if(userExists) {
            res.status(400)
            throw new Error("User already Exists");
        };

        const salt = await bcrypt.genSalt(10);   
        const hashedPassword = await bcrypt.hash(password, salt);  

        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,   
        });

        res.status(201).json({
            message : "User is registered successfully",
        });

    }
    catch(error){
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        throw error;
    }
};

const loginUser = async(req,res) => {
    try{

        const { email, password } = req.body;

        const existingUser  = await User.findOne({ email });  
        if(!existingUser ) {
            res.status(401)  
            throw new Error("Invalid User or Password");
        }

        const isPasswordMatch = await bcrypt.compare(password,existingUser.password);    
        if(!isPasswordMatch) {
            res.status(401)
            throw new Error("Invalid User or Password")    
        }

        const token = jwt.sign(
            { 
                id : existingUser._id,
                role : existingUser.role
            },
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
        )
        res.status(200).json({
            message: "Login Successful",
            token: token,
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            }
        });


    }catch(error){
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        throw error;
    }
};

const getUserProfile = async (req,res) =>{
    try{
        const foundUser = await User.findById(req.user.id).select("-password");

        if (!foundUser) {
            res.status(404);
            throw new Error("User not found");
        }

        res.status(200).json({
            message : "Profile fetched successfully",
            user : foundUser,
        });

    }catch(error){
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        throw error;
    }
};

module.exports = { registerUser, loginUser, getUserProfile };