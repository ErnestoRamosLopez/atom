export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = 'user/SET_CURRENT_USER',
}

export type User = {
    id?: number,
    name: string,
    lastname: string,
    email: string,
    password?: string
}