import  express  from "express";
import { pool } from "./db.js";
import bodyParser from "body-parser";
import { PORT} from "./config.js";
import cors from "cors";
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', cors() , (req, res) => {

    res.send("welcome to server express, please enter your name and password");

})
app.get('/users', async(req, res)=>{
    //req.headers('Content-Type', 'application/json')
    const [users] = await pool.query('SELECT * FROM users');
    res.send(users)
})
app.get('/ping', async (req, res)=>{
     const [Bienvenida] = await pool.query('SELECT "Hello world" AS Bienvenida');
     console.log(Bienvenida);
     res.json(Bienvenida[0]);

})


app.get('/create',async(req,res)=>{
  
    await pool.query('INSERT INTO users(user, invitados) values("gabriel@hotmail.com", 0)');
    res.redirect('/users')
})
app.post('/register' , cors(), async (req, res)=>{
    let telefono = req.body.email
    
    let invitados = req.body.invitados
    let asistencia = req.body.asistencia

    const existe = await pool.query(`UPDATE users SET telefono = "${telefono}", invitados = "${invitados}", asistencia = "${asistencia}" where telefono = "${telefono}"`)
  
    if(existe[0].affectedRows >= 1){
       
        console.log('success')
        res.json(existe[0][0])
        
    }
    else{
        res.json('not found')
        res.status(400);
    }
})
app.post('/verifyUser', cors(), async (req, res)=>{
    
   
    const email = req.body.email
  
    const existe = await pool.query(`SELECT * FROM users WHERE telefono = "${email}"`)
   
    if(existe[0].length >= 1){
       
        
        res.json(existe[0][0])
        
    }
    else{
        res.json('not found')
        res.status(400);
    }
})

app.listen(PORT);
console.log("Server on port: ", PORT)
