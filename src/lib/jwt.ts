import jwt from 'jsonwebtoken'
import { UserDTO, UserTokenPayload } from '../models/dto/UserDTO'

const secret = process.env.JWT_SECRET as string

if (!secret) {
    throw new Error('JWT Secret no found on env variables')
}

export function generateToken(user: UserDTO) {
    return jwt.sign(
        { 
            sub: user.id, 
            email: user.email 
        },
        secret,
        { 
            expiresIn: '7d' 
        }
    )
}

export function verifyToken(token: string): UserTokenPayload {
    const verified = jwt.verify(token, secret)
    return verified as unknown as UserTokenPayload
}