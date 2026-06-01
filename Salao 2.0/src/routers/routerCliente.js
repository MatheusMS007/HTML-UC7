import express from 'express' // importa o express
import { criarCliente, listarClientes, atualizarCliente, removerCliente } from '../controllers/controllersCliente.js' // importa as funções do controller

const routerCliente = express.Router() // cria o roteador de clientes

routerCliente.get('/clientes', listarClientes)          // quando acessar /clientes, lista todos os clientes
routerCliente.post('/clientes', criarCliente)           // quando enviar um formulário, cadastra o cliente
routerCliente.put('/clientes/:id', atualizarCliente)    // quando editar, atualiza o cliente pelo id
routerCliente.delete('/clientes/:id', removerCliente)   // quando apagar, remove o cliente pelo id

export default routerCliente // exporta o router para usar no index.js
