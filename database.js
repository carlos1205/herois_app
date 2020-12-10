const {readFile, writeFile} = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor(){
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterDadosArquivo () {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        const res = JSON.parse(arquivo.toString());
        return res;
    }

    async escreverArquivo(data){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data));
        return true;
    }

    async cadastrar(heroi){
        const data = await this.obterDadosArquivo();

        const heroiWithId = heroi;
        const newData = [
            ...data,
            heroiWithId
        ]
        const response = await this.escreverArquivo(newData);
        return response;
    }

    async listar(id){
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id): true));
        return dadosFiltrados;
    }

    async remover(id){
        if(!id)
            return await this.escreverArquivo([]);
        
        const dados = await this.obterDadosArquivo();
        const index = dados.findIndex(item => item.id === parseInt(id));

        if(index === -1)
            throw Error('O heroi informado não existe');

        dados.splice(index, 1);
        return await this.escreverArquivo(dados);
    }

    async atualizar(id, newDados){
        const dados = await this.obterDadosArquivo();
        const index = dados.findIndex(item => item.id === parseInt(id));

        if(index === -1 )
            throw Error('O heroi informado não existe');

        const atual = dados[index];
        newDados = {
            ...newDados,
            id
        }
        const objetoAtualizar = {
            ...atual,
            ...newDados
        }

        dados.splice(index, 1);
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ]);
    }
}

module.exports = new Database();