import express from 'express' // importa o express
import { criarAgendamento, listarAgendamentos, atualizarAgendamento, marcarRealizado, removerAgendamento, cadastroAgendamento, editarAgendamento } from '../controllers/controllersAgendamento.js'

const routerAgendamento = express.Router()

routerAgendamento.get('/agendamentos', listarAgendamentos)
routerAgendamento.get('/cadastroAgendamento', criarAgendamento)       // abre a página de cadastro
routerAgendamento.get('/editarAgendamento/:id', atualizarAgendamento)       // abre a página de editar
routerAgendamento.post('/agendamentos', criarAgendamento)
routerAgendamento.put('/agendamentos/:id', atualizarAgendamento)
routerAgendamento.patch('/agendamentos/:id/realizado', marcarRealizado)
routerAgendamento.delete('/agendamentos/:id', removerAgendamento)

export default routerAgendamento 
