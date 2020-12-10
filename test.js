//deepEqual foi depreciado
const {
    deepStrictEqual,
    ok
} = require ('assert');
const { cadastrar } = require('./database');

const database = require('./database');
const DEFAULT_ITEM_CADASTRAR = {
    name: "Flash",
    power: "Speed",
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    name: "Lanterna Verde",
    power: "O poder do anel",
    id: 2
}

describe('Suite de manipulação de herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    });

    it ('Deve listar um heroí, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [response] = await database.listar(expected.id);
        
       deepStrictEqual(response, expected);
    });
    
    it ('Deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

        deepStrictEqual(actual, expected);
    });

    it('Deve remover um heroi por id', async() => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);

        deepStrictEqual(resultado, expected);
    });

    it('Deve atualizar um heroi por id', async () => {
        const expected = {
            ... DEFAULT_ITEM_ATUALIZAR,
            name: "Batman",
            power: "Dinheiro"
        };
        const newDado = {
            name: "Batman",
            power: "Dinheiro"
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, newDado);
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
        deepStrictEqual(resultado, expected);
    });
});