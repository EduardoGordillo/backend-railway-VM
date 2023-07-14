import  express  from "express";
import { pool } from "./db.js";
import bodyParser from "body-parser";
import { PORT} from "./config.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', (req, res) => {

    res.send("welcome to server express, please enter your name and password");

})
app.get('/users', async(req, res)=>{
        const [users] = await pool.query('SELECT * FROM users');
        res.send(users)
})
app.get('/ping', async (req, res)=>{
     const [Bienvenida] = await pool.query('SELECT "Hello world" AS Bienvenida');
     console.log(Bienvenida);
     res.json(Bienvenida[0]);

})
app.post('/verifyUser', async (req, res)=>{
    
    const email = req.body.email
    const existe = await pool.query(`SELECT * FROM users WHERE user = "${email}"`)
    if(existe[0].length > 1){
       
        console.log(existe);
        res.json(existe[0][0])
        
    }
    else{
        res.json('not found')
        res.status(400);
    }
})

app.get('/create',async(req,res)=>{
    await pool.query('INSERT INTO users(user, invitados) values("Viridiana", 2)');
    res.redirect('/users')
})

app.listen(PORT);
console.log("Server on port: ", PORT)
