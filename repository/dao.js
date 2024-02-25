import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config()
import { createUser } from '../types/User.js'
const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: process.env.POSTGRESQL_PASSWORD,
    port: 5432,
})
console.log("using postgresql db")
await client.connect()
const dao = {}
dao.getUsers = async () => {
    const usersResponse = await client.query('SELECT * FROM users')
    const users = []
    usersResponse.rows.forEach(dbUser =>{
        users.push(createUser(dbUser.mail,dbUser.name,dbUser.hash,dbUser.creation_date))
    })
    return users
}

dao.getUser = async (mail) =>{
    const usersResponse = await client.query('SELECT * FROM users WHERE mail=$1',[mail])
    const dbUser = usersResponse.rows[0]
    return createUser(dbUser?.mail,dbUser?.name,dbUser?.hash,dbUser?.creation_date)
}
/**
 * @param {import('../types/User').User} user 
 */
dao.addUser = async (user) =>{
    const creationResponse = await client.query("INSERT INTO users(mail,name,hash,creation_date) VALUES ($1,$2,$3,$4)",[user.mail,user.name,user.hash,user.creationDate])
    console.log(creationResponse)
}
dao.removeUser = async (mail) =>{
    const deletionResponse = await client.query("DELETE FROM users WHERE mail=$1",[mail])
    console.log(deletionResponse)
}
/**
 * @param {import('../types/User').User} user 
 */
dao.updateUser = async(user) =>{
    const updateResponse = await client.query("UPDATE users SET name=$1, hash=$2",[user.name,user.hash])
    console.log(updateResponse)
}
export {dao}