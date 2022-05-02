import Joi from 'joi'

export const loginSchema = Joi.object().keys ({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const registerSchema = Joi.object().keys ({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})