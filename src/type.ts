import { Role } from "@prisma/client"

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
export {TypeInfoBodyReg, TypeInfoBodyLog}