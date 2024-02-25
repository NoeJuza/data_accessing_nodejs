import express from "express";
import bodyParser from 'body-parser';
const {urlencoded} = bodyParser;
import { addUser, getUsers } from "./service/UserService.js";
const app = express();
const port = 8080;
app.use(urlencoded())
app.use(express.static('public'))

app.get("/users", async(req,res) =>{
    const users = await getUsers()
    res.send({users: users})
})

app.post("/users", async(req,res) =>{
    console.log(req.body)
    const result = await addUser(req.body.email,req.body.name,req.body.password)
    if (result.code != 200){
        res.status(result.code).send(result.message)
    }else{
        res.redirect("/demo")
    }
})
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

console.log("yay")