const express = require("express");
const router = express.Router();
const db = require("../config/database");

// LISTAR todos os agendamentos (com o nome do cliente junto)
router.get("/", (req, res) => {
  db.all(
    `SELECT agendamentos.*, clientes.nome AS cliente_nome
     FROM agendamentos
     JOIN clientes ON agendamentos.cliente_id = clientes.id
     ORDER BY data, hora`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    }
  );
});

// CRIAR um novo agendamento
router.post("/", (req, res) => {
  const { cliente_id, servico, data, hora } = req.body;
  db.run(
    "INSERT INTO agendamentos (cliente_id, servico, data, hora) VALUES (?, ?, ?, ?)",
    [cliente_id, servico, data, hora],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: this.lastID, mensagem: "Agendamento criado com sucesso!" });
    }
  );
});

// EDITAR um agendamento
router.put("/:id", (req, res) => {
  const { cliente_id, servico, data, hora } = req.body;
  db.run(
    "UPDATE agendamentos SET cliente_id=?, servico=?, data=?, hora=? WHERE id=?",
    [cliente_id, servico, data, hora, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: "Agendamento atualizado com sucesso!" });
    }
  );
});

// MARCAR como REALIZADO
router.patch("/:id/realizado", (req, res) => {
  db.run(
    "UPDATE agendamentos SET status='realizado' WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: "Procedimento marcado como realizado!" });
    }
  );
});

// APAGAR um agendamento
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM agendamentos WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Agendamento removido com sucesso!" });
  });
});

module.exports = router;
