var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "O conteúdo não pode ser vazio!"});
        return;
    }

     // new user
     const user = new Userdb({
        tipo : req.body.tipo,
        marca : req.body.marca,
        preço: req.body.preço
        
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Ocorreu algum erro ao criar uma operação de criação"
            });
        });

}
// retrieve and return all type/ retrive and return a single types
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Não foi encontrada bebida com esse id =  "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro ao recuperar bebida com id = " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}
// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Os dados a serem atualizados não podem estar vazios"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Não é possível atualizar a bebida com ${id}. Talvez a bebebida não sido cadastrada!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Erro ao atualizar as informações da bebida"})
        })

}
// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Não foi possível deletar esse ${id}.`})
            }else{
                res.send({
                    message : "Bebida deletada!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Não foi possível deletar bebida com esse id =" + id
            });
        });
}
