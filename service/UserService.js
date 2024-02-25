import { checkUser } from "../controller/UserController.js"
import { dao } from "../repository/dao.js"
import { createUser } from "../types/User.js"
import bcrypt from 'bcrypt';
/**
 * 
 * @param {import("../types/User.js").User} user 
 * @returns 
 */
const addUser = async (mail,name,password) =>{
    const resCheck = await checkUser(mail,name,password)
    if (resCheck.code != 200){
        return resCheck
    }else{
        const hash = await bcrypt.hash(password, 2)
        await dao.addUser(createUser(mail,name,hash,(new Date().toUTCString())))
        return {"code": 200, "message": "ok"}
    }
}
const getUsers = async () =>{
    const users = await dao.getUsers()
    return users
}
const getUser = async (email) => {
    const user = dao.getUser(email)
    return user
}
const updateUser = (updatedData) =>{

}
const removeUser = (email) => {
       
}

export {addUser,getUsers,getUser,updateUser,removeUser}