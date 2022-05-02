import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

const MISSING_AETH_MSG = 'Missing authorization header'

export default function tokenValidator() {
    return async function (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            res.status(401).json({ message: MISSING_AETH_MSG })
            return
        }

        const [bearer, token] = authHeader.split(' ')

        if (bearer != 'Bearer') {
            res.status(401).json({ message: MISSING_AETH_MSG })
            return
        }
 
        try {
            const tokenPayload = verifyToken(token)
            req.user = tokenPayload
        } catch {
            res.status(401).json({ message: MISSING_AETH_MSG })
            return
        }
        
        return next()
    }
}