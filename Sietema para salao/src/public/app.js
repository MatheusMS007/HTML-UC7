

// Alterna entre a aba de Clientes e Agendamentos
function mostrarAba(aba) {
  document.getElementById("aba-clientes").style.display = aba === "clientes" ? "block" : "none";
  document.getElementById("aba-agendamentos").style.display = aba === "agendamentos" ? "block" : "none";
  if (aba === "agendamentos") carregarAgendamentos();
}

// Carrega e mostra todos os clientes na tabela
async function carregarClientes() {
  const resposta = await fetch("/clientes");       // pede a lista ao servidor
  const clientes = await resposta.json();          // converte para lista

  const tbody = document.querySelector("#tabelaClientes tbody");
  tbody.innerHTML = "";                            // limpa a tabela antes de preencher

  clientes.forEach(cliente => {
    tbody.innerHTML += `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email || "-"}</td>
        <td>
          <button class="btn-editar" onclick="editarCliente(${cliente.id}, '${cliente.nome}', '${cliente.telefone}', '${cliente.email || ""}')">Editar</button>
          <button class="btn-apagar" onclick="apagarCliente(${cliente.id})">Apagar</button>
        </td>
      </tr>
    `;
  });
}

// Quando o formulário de cliente é enviado (cadastrar ou editar)
document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault(); // impede a página de recarregar

  const id = document.getElementById("clienteId").value;
  const dados = {
    nome: document.getElementById("clienteNome").value,
    telefone: document.getElementById("clienteTelefone").value,
    email: document.getElementById("clienteEmail").value,
  };

  if (id) {
    // Se tem id, é uma edição
    await fetch(`/clientes/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  } else {
    // Se não tem id, é um cadastro novo
    await fetch("/clientes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  }

  cancelarEdicaoCliente(); // limpa o formulário
  carregarClientes();      // atualiza a tabela
});

// Preenche o formulário com os dados do cliente para editar
function editarCliente(id, nome, telefone, email) {
  document.getElementById("clienteId").value = id;
  document.getElementById("clienteNome").value = nome;
  document.getElementById("clienteTelefone").value = telefone;
  document.getElementById("clienteEmail").value = email;
}

// Limpa o formulário de cliente
function cancelarEdicaoCliente() {
  document.getElementById("clienteId").value = "";
  document.getElementById("clienteNome").value = "";
  document.getElementById("clienteTelefone").value = "";
  document.getElementById("clienteEmail").value = "";
}

// Apaga um cliente
async function apagarCliente(id) {
  if (!confirm("Tem certeza que deseja apagar este cliente?")) return;
  await fetch(`/clientes/${id}`, { method: "DELETE" });
  carregarClientes();
}

// =============================================
// AGENDAMENTOS
// =============================================

// Carrega e mostra todos os agendamentos na tabela
async function carregarAgendamentos() {
  const resposta = await fetch("/agendamentos");
  const agendamentos = await resposta.json();

  // Também atualiza o select de clientes no formulário
  await preencherSelectClientes();

  const tbody = document.querySelector("#tabelaAgendamentos tbody");
  tbody.innerHTML = "";

  agendamentos.forEach(ag => {
    // Formata a data para o padrão brasileiro (dd/mm/aaaa)
    const dataFormatada = ag.data.split("-").reverse().join("/");

    tbody.innerHTML += `
      <tr>
        <td>${ag.cliente_nome}</td>
        <td>${ag.servico}</td>
        <td>${dataFormatada}</td>
        <td>${ag.hora}</td>
        <td><span class="status-${ag.status}">${ag.status}</span></td>
        <td>
          ${ag.status === "pendente" ? `<button class="btn-realizado" onclick="marcarRealizado(${ag.id})">✔ Realizado</button>` : ""}
          <button class="btn-editar" onclick="editarAgendamento(${ag.id}, ${ag.cliente_id}, '${ag.servico}', '${ag.data}', '${ag.hora}')">Editar</button>
          <button class="btn-apagar" onclick="apagarAgendamento(${ag.id})">Apagar</button>
        </td>
      </tr>
    `;
  });
}

// Preenche o select de clientes no formulário de agendamento
async function preencherSelectClientes() {
  const resposta = await fetch("/clientes");
  const clientes = await resposta.json();

  const select = document.getElementById("agendamentoCliente");
  select.innerHTML = `<option value="">Selecione o cliente</option>`;
  clientes.forEach(c => {
    select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
  });
}

// Quando o formulário de agendamento é enviado
document.getElementById("formAgendamento").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("agendamentoId").value;
  const dados = {
    cliente_id: document.getElementById("agendamentoCliente").value,
    servico: document.getElementById("agendamentoServico").value,
    data: document.getElementById("agendamentoData").value,
    hora: document.getElementById("agendamentoHora").value,
  };

  if (id) {
    await fetch(`/agendamentos/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  } else {
    await fetch("/agendamentos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  }

  cancelarEdicaoAgendamento();
  carregarAgendamentos();
});

// Preenche o formulário com os dados do agendamento para editar
function editarAgendamento(id, clienteId, servico, data, hora) {
  document.getElementById("agendamentoId").value = id;
  document.getElementById("agendamentoCliente").value = clienteId;
  document.getElementById("agendamentoServico").value = servico;
  document.getElementById("agendamentoData").value = data;
  document.getElementById("agendamentoHora").value = hora;
}

// Limpa o formulário de agendamento
function cancelarEdicaoAgendamento() {
  document.getElementById("agendamentoId").value = "";
  document.getElementById("agendamentoCliente").value = "";
  document.getElementById("agendamentoServico").value = "";
  document.getElementById("agendamentoData").value = "";
  document.getElementById("agendamentoHora").value = "";
}

// Marca um agendamento como realizado
async function marcarRealizado(id) {
  await fetch(`/agendamentos/${id}/realizado`, { method: "PATCH" });
  carregarAgendamentos();
}

// Apaga um agendamento
async function apagarAgendamento(id) {
  if (!confirm("Tem certeza que deseja apagar este agendamento?")) return;
  await fetch(`/agendamentos/${id}`, { method: "DELETE" });
  carregarAgendamentos();
}

// =============================================
// INICIALIZAÇÃO - roda quando a página abre
// =============================================
carregarClientes();
