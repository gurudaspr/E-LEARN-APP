import bcrypt from 'bcrypt'
import User from "../model/user.model.js";
import Otp from "../model/otp.model.js";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import generateToken from '../utils/generateToken.js';

function generateNumericOTP(length) {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        // console.log(isPasswordCorrect);

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = generateToken(user);

        // console.log(token)
        res.status(200).json({
            userId: user._id,
            Fullname: user.fullName,
            email: user.email,
            token: token,
            userRole: user.userRole,
            message: "succesfully logged in"
        });
    } catch (error) {
        console.log("Error in login controller", error.message);

        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logout = () => {

}

export const checkEmailExists = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        const exists = !!user;
        res.json({ exists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = generateNumericOTP(4);
        const existingOtp = await Otp.findOne({ email });
        if (existingOtp) {

            existingOtp.otp = otp;
            await existingOtp.save();
        } else {

            await Otp.create({ email, otp });
        }
        console.log('OTP:', otp);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.FROM_MAIL_ID,
                pass: process.env.FROM_MAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.FROM_MAIL_ID,
            to: email,
            subject: 'OTP for account verification',
            text: `Your OTP is: ${otp}`
        });
        console.log('OTP sent successfully');

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' }); // Send error response
    }
}

export const verifyOtp = async (req, res) => {
    const { otp, userData } = req.body;
    const { fullName, email, password, confirmPassword } = userData;
    try {
        const existingOtp = await Otp.findOne({ email });
        if (!existingOtp) {
            return res.status(400).json({ error: 'Otp expired' });
        }
        if (existingOtp.otp !== otp) {
            return res.status(400).json({ error: 'Invalid Otp' });
        }
        if (password != confirmPassword) {
         return res.status(400).json({ error: "Passwords don't match" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
            userRole: "user"

        });
        if (newUser) {
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                userRole: 'user',
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
   
    }
    catch (error) {
        console.error('Error verifying Otp:', error);
        res.status(500).json({ error: 'Failed to verify Otp' });
    }
}


export const sendResetPasswordOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = generateNumericOTP(4);
        const user =  await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }
        const existingOtp = await Otp.findOne({ email });
        if (existingOtp) {
            existingOtp.otp = otp;
            await existingOtp.save();
        } else {
            await Otp.create({ email, otp });
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.FROM_MAIL_ID,
                pass: process.env.FROM_MAIL_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.FROM_MAIL_ID,
            to: email,
            subject: 'OTP for account verification',
            text: `Your OTP is: ${otp}`
        });
        // console.log(otp);
        // console.log('OTP sent successfully');

        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
}

export const verifyResetPasswordOtp = async (req, res) => {
    
    const { otp, email } = req.body;
    try {
        const existingOtp = await Otp.findOne({ email });
        if (!existingOtp) {
            return res.status(400).json({ error: 'Otp expired' });
        }
        if (existingOtp.otp !== otp) {
            return res.status(400).json({ error: 'Invalid Otp' });
        }
        res.status(200).json({message: 'Otp verified successfully'});
    }
    catch (error) {
        console.error('Error verifying Otp:', error);
        res.status(500).json({ error: 'Failed to verify Otp' });
    }   
}

export const  resetPassword = async (req, res) => {
    const {email, password, confirmPassword} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }
        if (password !== confirmPassword) {
            return res.status(400).json({error: 'Passwords do not match'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       
        await User.updateOne({email}, {password: hashedPassword});
        res.status(200).json({message: 'Password reset successful'});
    }
        catch (error) {
            console.error('Error resetting password:', error);
            res.status(500).json({error: 'Failed to reset password'});
        }

}
































// export const signup = async (req, res) => {
    //     try {
    //         const { email, fullName, password, confirmPassword, } = req.body;
    //         if (password != confirmPassword) {
    //             return res.status(400).json({ error: "Passwords don't match" });
    //         }
    
    //         const user = await User.findOne({ email });
    
    //         if (user) {
    //             return res.status(400).json({ error: "Email already exists" });
    //         }
    //         // console.log(user,mail);
    
    //         //password hashing
    //         const salt = await bcrypt.genSalt(10);
    //         const hashedPassword = await bcrypt.hash(password, salt);
    
    //         const newUser = new User({
    //             email,
    //             fullName,
    //             password: hashedPassword,
    //             userRole: "user"
    
    //         });
    
    //         if (newUser) {
    //             await newUser.save();
    //             res.status(201).json({
    //                 _id: newUser._id,
    //                 email: newUser.email,
    //                 fullName: newUser.fullName,
    //                 userRole: 'user',
    //             });
    //         } else {
    //             res.status(400).json({ error: "Invalid user data" });
    //         }
    //     } catch (error) {
    //         console.log("Error in signup controller", error.message);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }
    // };
    