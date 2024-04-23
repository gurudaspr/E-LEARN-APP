import  jwt  from 'jsonwebtoken';

 export const verifyToken = (req, res, next) => {

    if (!req.headers['authorization']) {
        return next(new Error(400, 'Invalid authorization header'));
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new Error(400, 'Invalid token '));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return next(new Error(401, 'Invalid token '))
        req.payload = payload;
        next();
    })


  
}