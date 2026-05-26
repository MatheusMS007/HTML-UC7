import express from 'express' // importa o express
import { criarAgendamento, listarAgendamentos, atualizarAgendamento, marcarRealizado, removerAgendamento } from '../controllers/controllersAgendamento.js' // importa as funções do controller

const routerAgendamento = express.Router() // cria o roteador de agendamentos

routerAgendamento.get('/agendamentos', listarAgendamentos)              // quando acessar /agendamentos, lista todos
routerAgendamento.post('/agendamentos', criarAgendamento)               // quando enviar formulário, cria o agendamento
routerAgendamento.put('/agendamentos/:id', atualizarAgendamento)        // quando editar, atualiza o agendamento pelo id
routerAgendamento.patch('/agendamentos/:id/realizado', marcarRealizado) // quando clicar em realizado, muda o status
routerAgendamento.delete('/agendamentos/:id', removerAgendamento)       // quando apagar, remove o agendamento pelo id

export default routerAgendamento // exporta o router para usar no index.js
