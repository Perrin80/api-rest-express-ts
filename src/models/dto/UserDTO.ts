export interface BaseUserDTO {
    //id?:    number
    firstname:  string
    lastname:   string
    email:      string
}

export interface UserDTO extends BaseUserDTO {
    id:     number
}

export interface CreateUserDTO extends BaseUserDTO {
    password:   string
}

export type UpdateuserDTO = Partial<CreateUserDTO>

export interface LoginUserDTO extends UserDTO {
    password:   string
}

export interface UserTokenPayload {
    sub:    number
    email:  string
    exp:    number
    iat:    number
}