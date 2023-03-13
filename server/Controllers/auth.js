import Jwt  from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from '../models/auth.js';

export const signup = async (req,res) => {

    const { name, email, password } = req.body;

    try{
       
        const existinguser = await User.findOne({email})

        if (existinguser) {
            res.status(404).json( {message: "user already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({name, email, password: hashedPassword})
        const token = Jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET , {expiresIn: "1h"});
        
        res.status(200).json({result: newUser,token})
    }catch(error){
        res.status(500).json("something went wrong...")
    }

}
export const login = async (req,res) => {
    
    const { email, password } = req.body;

    try {
        
        const existinguser = await User.findOne({email});
        if (!existinguser) {
            res.status(404).json( {message: "user doesn't exist"})
        }

        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)

        if (!isPasswordCrt) {
            res.status(400).json( {message: "invalid credenstials"})
        }
       
        const token = Jwt.sign({email: existinguser.email, id: existinguser._id}, process.env.JWT_SECRET , {expiresIn: "1h"});
        res.status(200).json({result: existinguser, token})

    } catch (error) {
        res.status(500).json({message: error.messgae})
    }

}