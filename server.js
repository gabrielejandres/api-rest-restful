const express = require("express");
const app = express();
const data = require('./data.json'); //simula a conexão com o BD

app.use(express.json());

/* O segundo parâmetro é chamado de callback function e é ela quem processa a requisição */

app.get('/clients', function(req, res){
    res.json(data);
});

app.get('/clients/:id', function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id === id); 

    if (!client) return res.status(204).json(); //a rota existe mas o conteúdo não
    res.json(client);
});

app.post('/clients', function(req, res){
    const { name, email } = req.body;

    //salvar

    res.json({ name, email });
});

app.put('/clients/:id', function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id === id); 

    if (!client) return res.status(204).json(); //a rota existe mas o conteúdo não
    
    const { name } = req.body;

    client.name = name;
    
    res.json(client);
});

app.delete('/clients/:id', function(req, res){
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id !== id); 

    res.json(clientsFiltered);
});

app.listen(3000, function(){
    console.log("Server is running");
})