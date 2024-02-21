import { Role } from '@prisma/client';

type TypeInfoBodyReg ={
    mail: string
    password: string
    userName: string
    name:string
}

type TypeInfoBodyLog = {
    mail: string
    password: string
}

type TPost ={ 
    id: number; 
    title: string; 
    content: string | null;
    userId: number | null ;
}

type TUser = {
    id: number; mail: string; password: string; name: string | null; userName: string; role: Role
}

export {TypeInfoBodyReg,TPost, TUser, TypeInfoBodyLog}