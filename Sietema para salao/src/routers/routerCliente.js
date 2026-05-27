import express from 'express' // importa o express
import { criarCliente, listarClientes, atualizarCliente, removerCliente, cadastroCliente, editarCliente } from '../controllers/controllersCliente.js'

const routerCliente = express.Router()

routerCliente.get('/clientes', listarClientes)
routerCliente.get('/cadastroCliente', cadastroCliente)       // abre a página de cadastro
routerCliente.get('/editarCliente/:id', editarCliente)       // abre a página de editar
routerCliente.post('/clientes', criarCliente)
routerCliente.put('/clientes/:id', atualizarCliente)
routerCliente.delete('/clientes/:id', removerCliente)

export default routerCliente // exporta o router para usar no index.js
