import { Sequelize } from 'sequelize' // importa o Sequelize, que é a ferramenta que conecta o sistema ao banco de dados

const sequelize = new Sequelize({  // cria a conexão com o banco de dados
    dialect: 'sqlite',             // diz que o tipo do banco de dados é SQLite
    storage: './src/database/salao.db' // diz onde o arquivo do banco de dados vai ser salvo
})

// Função que testa se a conexão com o banco de dados funcionou
const conexaoBD = async () => {
    try {
        await sequelize.authenticate()                            // tenta conectar
        console.log('Banco de dados conectado com sucesso!')     // se funcionou, mostra no terminal
    } catch (error) {
        console.error('Erro ao conectar no banco de dados:', error) // se deu erro, mostra o erro
    }
}

conexaoBD() // chama a função acima para testar a conexão quando o sistema iniciar

// Função que cria as tabelas no banco de dados com base nos modelos que vamos criar depois
export const sincronizarBD = async () => {
    try {
        await sequelize.sync({ force: false }) // force: false significa que NÃO apaga os dados já salvos
        console.log('Tabelas sincronizadas com sucesso!')
    } catch (error) {
        console.error('Erro ao sincronizar tabelas:', error)
    }
}

export default sequelize // exporta a conexão para poder usar em outros arquivos
