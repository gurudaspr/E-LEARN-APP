import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
        userRole: user.userRole
    };
    const secret = process.env.JWT_SECRET;
 return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export default generateToken;