import { PrismaClient } from "@prisma/client";
import { CreateUserDTO, LoginUserDTO, UpdateuserDTO, UserDTO } from "../dto/UserDTO";

const prisma = new PrismaClient()

export default class userRepository {
    public readonly FindAll = async (): Promise<UserDTO[]> => {
        const users = await prisma.user.findMany()
        const userWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword
        })
        return userWithoutPassword
    }

    public readonly findById = async (id: number): Promise<UserDTO | undefined> => {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) return

        const { password, ...userWithoutPassword } = user
        return userWithoutPassword

    }

    public readonly findByEmail = async (email: string): Promise<LoginUserDTO | undefined> => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) return

        return user
    }

    public readonly create = async (user: CreateUserDTO): Promise<UserDTO> => {
        const newUser = await prisma.user.create ({
            data: user
        })
        const { password, ...userWithoutPassword } = newUser
        return userWithoutPassword

    }

    public readonly update = async (id: number, user: UpdateuserDTO): Promise<void> => {
        await prisma.user.update ({
            where: {
                id
            },
            data: user
        })

    }

    public readonly delete = async (id: number) => {
        await prisma.user.delete ({
            where: {
                id
            }
        })
    }


}