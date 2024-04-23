import bcrypt from 'bcrypt'
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const payload = {
            username: email,
          }
        const secret = process.env.JWT_SECRET


        const token = jwt.sign(payload, secret)

        // console.log(token)
        res.status(200).json({
            _id: user._id,
            Fullname: user.Fullname,
            email: user.email,
            token : token,
            userRole : user.userRole,
            message : "succesfully logged in"
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const signup = async(req,res) => {
    try {
        const { email, fullName, password, confirmPassword,} = req.body;
        if (password != confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

        const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "Email already exists" });
		}
        // console.log(user,mail);

        //password hashing
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
			email,
			fullName,
			password: hashedPassword,
            userRole : "user"
			
		});

        if (newUser) {
			await newUser.save();
			res.status(201).json({
				_id: newUser._id,
				email: newUser.email,
				fullName: newUser.fullName,
                userRole : 'user',
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const logout = () => {

}

