import { getUser } from "../service/UserService.js"
import { createError } from "../types/Error.js"

/**
 * 
 * @param {String} mail 
 * @param {String} name 
 * @param {String} password 
 */
const checkUser = async(mail, name, password) =>{
  const res = createError(200,"user is valid")
  const alreadyExistingUser = await getUser(mail)
  if(alreadyExistingUser?.mail != undefined){
    res.code = 409
    res.message = `a user with the email ${mail} already exists`
  }
  if (! mail.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ){
    res.code = 400
    res.message = "email is invalid"
    return res;
  }
  if(name.length < 3 || name.length > 20){
    res.code = 400
    res.message = "username should be at least 3 characters long and max 20 characters long"
    return res;
  }
  if(password.length < 8){
    res.code = 400
    res.message = "password should be at least 8 characters long"
  }
  return res
} 
export{checkUser}