type TypeInfoBodyReg ={
    mail: string
    password: string
    name:string
}
type Role = "Admin" | "User"

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
    id: number; 
    mail: string; 
    password: string; 
    name: string | null; 
    role: Role
}

export {TypeInfoBodyReg,TPost, TUser, TypeInfoBodyLog}