const express = require("express");
const app = express();

//Habilitamos el cors
const cors = require('cors');
app.use(cors());

//Modelos Mongoose - MongoBD
const Mongoose = require('./moongose')
const User = require('./models/user');

//Sin esta configuración no podemos manejar el body de la request
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const PORT = 3001;

//BD Connection

app.post("/login", (req, res) => {
    const userReq = req.body;

    User.findOne({
        email: userReq.email
    }).then(user => {
        if(user){
            if(user.password === userReq.password){
                res.send('Accept');
            }else{
                res.status(400).send('Credenciales erroneas')
            }
        }else{
            res.status(400).send('Credenciales erroneas')
        }
    }
    ).catch(res.send)
});

app.post("/register", (req, res) => {
    new User({
        ...req.body
    }).save().then(user => res.send(user)).catch(err => res.status(401).send(err));
});

//La comprobación del Login debe hacerse desde el Backend y no desde el FrontEnd ya que esto podría ser un gran fallo de seguridad
app.post('/login', async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (!user) return res.status(400).send('wrong crendentials')
    res.send({
        info: 'Welcome back',
        user
    })
})

app.listen(PORT, () => {
    console.log(`Backend escuchando en el puerto: ${PORT}`);
});