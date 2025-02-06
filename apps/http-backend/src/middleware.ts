import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export function middleware(req: Request, res: Response, next: NextFunction) {
    console.log("middleware")
    const token = req.headers["authorization"] ?? "";
    console.log("middleware2")
    const decoded = jwt.verify(token, JWT_SECRET);

    try{

    if (decoded) {
        // @ts-ignore: TODO: Fix this
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}catch{
    res.status(500).json({
        message:'not found'
    })
}
}