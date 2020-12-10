const { Command } = require('commander');
const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar Herois")
        .option('-r, --remover', "Remove um heroi com o id")
        .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")
        .parse(process.argv)
    const heroi = new Heroi(Commander);
    try{
        if(Commander.cadastrar){
            if(!heroi.id)
                heroi.id = Date.now();

            const resultado = await Database.cadastrar(heroi);
            if(!resultado)
                throw "erro ao cadastrar heroi";

            console.log("Heroi Cadastrado com Sucesso");
        }

        if(Commander.listar){
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        if(Commander.remover){
            const resultado = await Database.remover(heroi.id);
            if(!resultado)
                throw "erro ao remover heroi";
            
            console.log("Heroi removido com sucesso");
        }

        if(Commander.atualizar){
            const idAtualizarHeroi = parseInt(Commander.atualizar);
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await Database.atualizar(idAtualizarHeroi, heroiAtualizar);
            if(!resultado)
                throw "erro ao atualizar heroi";
            
            console.log("Heroi atualizado com sucesso");
        }
    }catch(err){
        console.error("Error: ", err);
    }
}

main();