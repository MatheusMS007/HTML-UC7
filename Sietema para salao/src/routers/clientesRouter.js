const express = require("express");
const router = express.Router();
const db = require("../config/database");

// LISTAR todos os clientes
router.get("/", (req, res) => {
  db.all("SELECT * FROM clientes ORDER BY nome", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows); // devolve a lista de clientes
  });
});

// CADASTRAR um novo cliente
router.post("/", (req, res) => {
  const { nome, telefone, email } = req.body; // pega os dados enviados
  db.run(
    "INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)",
    [nome, telefone, email],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: this.lastID, mensagem: "Cliente cadastrado com sucesso!" });
    }
  );
});

// EDITAR um cliente
router.put("/:id", (req, res) => {
  const { nome, telefone, email } = req.body;
  db.run(
    "UPDATE clientes SET nome=?, telefone=?, email=? WHERE id=?",
    [nome, telefone, email, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: "Cliente atualizado com sucesso!" });
    }
  );
});

// APAGAR um cliente
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM clientes WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Cliente removido com sucesso!" });
  });
});

module.exports = router;
