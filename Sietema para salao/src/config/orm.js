import { Sequelize } from 'sequelize'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database', 'salao.db') // caminho absoluto para o banco de dados
})

// Função que testa se a conexão com o banco de dados funcionou
const conexaoBD = async () => {
    try {
        await sequelize.authenticate()
        console.log('Banco de dados conectado com sucesso!')
    } catch (error) {
        console.error('Erro ao conectar no banco de dados:', error)
    }
}

conexaoBD() // chama a função acima para testar a conexão quando o sistema iniciar


// Função que cria as tabelas no banco de dados com base nos modelos
export const sincronizarBD = async () => {
    try {
        await sequelize.sync({ force: false }) // force: false significa que NÃO apaga os dados já salvos
        console.log('Tabelas sincronizadas com sucesso!')
    } catch (error) {
        console.error('Erro ao sincronizar tabelas:', error)
    }
}

export default sequelize // exporta a conexão para poder usar em outros arquivos
