import express from 'express'                             
import path from 'path'                                     
import morgan from 'morgan'
import methodOverride from 'method-override'                                 
import dotenv from 'dotenv'                                
import { sincronizarBD } from './src/config/orm.js'
import './src/models/modelCliente.js'     // carrega o model para criar a tabela clientes
import './src/models/modelAgendamento.js' // carrega o model para criar a tabela agendamentos
import routerCliente from './src/routers/routerCliente.js'        
import routerAgendamento from './src/routers/routerAgendamento.js' 

dotenv.config() // lê o arquivo .env 

sincronizarBD() // cria as tabelas no banco de dados

const app = express() // cria o servidor

const PORT = process.env.PORT || 3000   // porta onde o sistema vai rodar (padrão 3000)
const HOST = process.env.HOST || 'localhost' // endereço do servidor (padrão localhost)

app.use(express.json())                         // permite que o servidor entenda dados em JSON
app.use(express.urlencoded({ extended: true })) // permite que o servidor entenda dados de formulários HTML
app.use(morgan('common'))
app.use(methodOverride('_method'))                       // mostra no terminal cada requisição feita ao servidor

app.use(express.static(path.join(import.meta.dirname, 'src', 'public'))) // diz onde ficam os arquivos HTML, CSS e JS

app.set('view engine', 'ejs')                                          // configura o EJS como motor de templates
app.set('views', path.join(import.meta.dirname, 'src', 'views'))      // diz onde ficam as páginas EJS

app.use(routerCliente)      // liga as rotas de clientes ao servidor
app.use(routerAgendamento)  // liga as rotas de agendamentos ao servidor

// rota principal - quando acessar http://localhost:3000 abre a página inicial
app.get('/', (req, res) => {
    res.redirect('/clientes') // redireciona para a lista de clientes
})

// inicia o servidor
app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`) // mostra no terminal que o servidor está funcionando
})
