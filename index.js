const express = require("express");
const app= express();
const bodyParser= require("body-parser");
const connection= require("./database/database");
const Pergunta= require('./database/Perguntas');
const Respostas=require('./database/Resposta');


connection
    .authenticate()
    .then(()=> {console.log("conexão feita com sucesso")})
    .catch(() => {console.log("falha na conexão")});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get("/",function(req,res){
   Pergunta.findAll({raw:true,order:[
    ['id','DESC']
   ]}).then((perguntas)=> {
    res.render("index",{
        perguntas:perguntas
    });
   })
    
})

app.get("/pergunta/:id", function(req,res){
    var id= req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta=>{
        if(pergunta !=undefined){
            res.render("pergunta",{
                pergunta:pergunta
            })
        }else{
            res.redirect("/");
        }
    })

})

app.post("/responder",function(req,res){
    var corpo=req.body.resposta;
    var perguntaId= req.body.pergunta;

    Respostas.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
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