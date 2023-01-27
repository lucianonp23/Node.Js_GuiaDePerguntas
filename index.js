const express = require("express");
const app= express();
const bodyParser= require("body-parser");
const connection= require("./database/database");
const Pergunta= require('./database/Perguntas');


connection
    .authenticate()
    .then(()=> {console.log("conexão feita com sucesso")})
    .catch(() => {console.log("falha na conexão")});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get("/",function(req,res){
   Pergunta.findAll({raw:true}).then((perguntas)=> {
    res.render("index",{
        perguntas:perguntas
    });
   })
    
})

app.get("/perguntar",function(req,res){
    res.render("perguntar");
 })

app.post("/salvandoperguntas",function (req,res){
    var titulo= req.body.titulo;
    var descricao= req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=> {
        res.redirect("/");
    })
   
    })

app.listen("8080",()=>{
    console.log("Server running");
})