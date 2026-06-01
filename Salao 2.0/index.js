import express from 'express'                               // importa o express, que é o framework que cria o servidor
import path from 'path'                                     // importa o path, que ajuda a encontrar pastas e arquivos
import morgan from 'morgan'                                 // importa o morgan, que mostra no terminal as requisições feitas
import dotenv from 'dotenv'                                 // importa o dotenv, que lê as configurações do arquivo .env
import { sincronizarBD } from './src/config/orm.js'        // importa a função que cria as tabelas no banco de dados
import routerCliente from './src/routers/routerCliente.js'         // importa as rotas de clientes
import routerAgendamento from './src/routers/routerAgendamento.js' // importa as rotas de agendamentos

dotenv.config() // lê o arquivo .env para pegar as configurações

sincronizarBD() // cria as tabelas no banco de dados quando o sistema iniciar

const app = express() // cria o servidor

const PORT = process.env.PORT || 3000   // porta onde o sistema vai rodar (padrão 3000)
const HOST = process.env.HOST || 'localhost' // endereço do servidor (padrão localhost)

app.use(express.json())                            // permite que o servidor entenda dados em JSON
app.use(express.urlencoded({ extended: true }))    // permite que o servidor entenda dados de formulários HTML
app.use(morgan('common'))                          // mostra no terminal cada requisição feita ao servidor

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
