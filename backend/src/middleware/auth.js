const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success:false,
            message:"Authentication required"
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });
    }

    try{

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        });

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }

        req.user = user;

        next();

    }
    catch{

        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });

    }

}