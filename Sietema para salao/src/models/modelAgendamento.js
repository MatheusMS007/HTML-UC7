import { DataTypes } from 'sequelize'   // importa os tipos de dados (texto, número, etc)
import sequelize from '../config/orm.js'  // importa a conexão com o banco de dados
import Clientes from './modelCliente.js'  // importa o model de clientes para fazer a ligação

// Define a tabela de agendamentos no banco de dados
const Agendamentos = sequelize.define('Agendamento', { // 'Agendamento' é o nome do modelo

    idAgendamento: {
        type: DataTypes.INTEGER,  // tipo número inteiro
        primaryKey: true,         // identificador único do agendamento
        autoIncrement: true,      // cresce sozinho a cada agendamento (1, 2, 3...)
        allowNull: false          // não pode ficar vazio
    },
    servico: {
        type: DataTypes.STRING,   // tipo texto
        allowNull: false          
    },
    data: {
        type: DataTypes.STRING,   // tipo texto para guardar a data (ex: 2025-06-01)
        allowNull: false          
    },
    hora: {
        type: DataTypes.STRING,   // tipo texto para guardar a hora (ex: 14:30)
        allowNull: false          
    },
    status: {
        type: DataTypes.STRING,   // tipo texto
        allowNull: false,         // não pode ficar vazio
        defaultValue: 'pendente'  // quando criar um agendamento, o status começa como 'pendente'
    }
},
{
    tableName: 'agendamentos', // nome da tabela no banco de dados
    timestamps: false,         // não cria colunas de data automáticas
    charset: 'utf8'            // aceita acentos e caracteres especiais
})

// Liga a tabela de agendamentos com a tabela de clientes
Clientes.hasMany(Agendamentos, { foreignKey: 'idCliente' })       // um cliente tem muitos agendamentos
Agendamentos.belongsTo(Clientes, { foreignKey: 'idCliente' })     // um agendamento pertence a um cliente

export default Agendamentos
