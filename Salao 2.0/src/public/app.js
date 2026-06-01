

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
    const tr = document.createElement("tr");                  // cria a linha da tabela

    const tdNome = document.createElement("td");              // cria a célula do nome
    tdNome.textContent = cliente.nome;                        // insere o nome como texto puro

    const tdTelefone = document.createElement("td");          // cria a célula do telefone
    tdTelefone.textContent = cliente.telefone;                // insere o telefone como texto puro

    const tdEmail = document.createElement("td");             // cria a célula do email
    tdEmail.textContent = cliente.email || "-";               // insere o email como texto puro

    const btnEditar = document.createElement("button");       // cria o botão Editar
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarCliente(cliente.id, cliente.nome, cliente.telefone, cliente.email || ""); // liga a função diretamente

    const btnApagar = document.createElement("button");       // cria o botão Apagar
    btnApagar.className = "btn-apagar";
    btnApagar.textContent = "Apagar";
    btnApagar.onclick = () => apagarCliente(cliente.id);      // liga a função diretamente

    const tdAcoes = document.createElement("td");             // cria a célula de ações
    tdAcoes.appendChild(btnEditar);                           // coloca o botão Editar dentro
    tdAcoes.appendChild(btnApagar);                           // coloca o botão Apagar dentro

    tr.appendChild(tdNome);                                   // monta a linha com todas as células
    tr.appendChild(tdTelefone);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);                                    // adiciona a linha na tabela
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
function apagarCliente(id) {
  // busca o botão "Apagar" que foi clicado pelo evento onclick ligado diretamente
  const botoes = document.querySelectorAll(".btn-apagar");
  let botao = null;
  botoes.forEach(b => { if (b.onclick && b.onclick.toString().includes(`apagarCliente(${id})`)) botao = b; });
  if (!botao) return;

  // substitui o botão por "Confirmar" e "Cancelar"
  const btnConfirmar = document.createElement("button");
  btnConfirmar.className = "btn-confirmar";
  btnConfirmar.textContent = "Confirmar ✔";
  btnConfirmar.onclick = () => confirmarApagarCliente(id);

  const btnCancelar = document.createElement("button");
  btnCancelar.className = "btn-cancelar-apagar";
  btnCancelar.textContent = "Cancelar ✖";
  btnCancelar.onclick = () => cancelarApagarCliente(id, botao.parentNode);

  const td = botao.parentNode;
  td.replaceChild(btnConfirmar, botao);  // substitui o botão Apagar pelo Confirmar
  td.appendChild(btnCancelar);           // adiciona o botão Cancelar
}

// Executado quando o usuário clica em "Confirmar"
async function confirmarApagarCliente(id) {
  await fetch(`/clientes/${id}`, { method: "DELETE" }); // envia o pedido de apagar ao servidor
  carregarClientes();                                   // atualiza a tabela
}

// Executado quando o usuário clica em "Cancelar" — volta o botão original
function cancelarApagarCliente(id, td) {
  const btnEditar = document.createElement("button");  // recria o botão Editar
  btnEditar.className = "btn-editar";
  btnEditar.textContent = "Editar";
  btnEditar.onclick = () => editarCliente(id);

  const btnApagar = document.createElement("button");  // recria o botão Apagar original
  btnApagar.className = "btn-apagar";
  btnApagar.textContent = "Apagar";
  btnApagar.onclick = () => apagarCliente(id);

  td.innerHTML = "";               // limpa os botões temporários
  td.appendChild(btnEditar);       // readiciona o botão Editar
  td.appendChild(btnApagar);       // readiciona o botão Apagar
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
    const dataFormatada = ag.data.split("-").reverse().join("/");

    const tr = document.createElement("tr");                  // cria a linha da tabela

    const tdNome = document.createElement("td");              // cria a célula do nome
    tdNome.textContent = ag.cliente_nome;                     // insere o nome como texto puro

    const tdServico = document.createElement("td");           // cria a célula do serviço
    tdServico.textContent = ag.servico;                       // insere o serviço como texto puro

    const tdData = document.createElement("td");              // cria a célula da data
    tdData.textContent = dataFormatada;                       // insere a data formatada como texto puro

    const tdHora = document.createElement("td");              // cria a célula da hora
    tdHora.textContent = ag.hora;                             // insere a hora como texto puro

    const span = document.createElement("span");              // cria o span do status
    span.className = `status-${ag.status}`;
    span.textContent = ag.status;                             // insere o status como texto puro
    const tdStatus = document.createElement("td");            // cria a célula do status
    tdStatus.appendChild(span);                               // coloca o span dentro da célula

    const tdAcoes = document.createElement("td");             // cria a célula de ações

    if (ag.status === "pendente") {                           // botão realizado só aparece se pendente
      const btnRealizado = document.createElement("button");
      btnRealizado.className = "btn-realizado";
      btnRealizado.textContent = "✔ Realizado";
      btnRealizado.onclick = () => marcarRealizado(ag.id);    // liga a função diretamente
      tdAcoes.appendChild(btnRealizado);
    }

    const btnEditar = document.createElement("button");       // cria o botão Editar
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarAgendamento(ag.id, ag.cliente_id, ag.servico, ag.data, ag.hora); // liga a função diretamente

    const btnApagar = document.createElement("button");       // cria o botão Apagar
    btnApagar.className = "btn-apagar";
    btnApagar.textContent = "Apagar";
    btnApagar.onclick = () => apagarAgendamento(ag.id);       // liga a função diretamente

    tdAcoes.appendChild(btnEditar);                           // coloca o botão Editar na célula
    tdAcoes.appendChild(btnApagar);                           // coloca o botão Apagar na célula

    tr.appendChild(tdNome);                                   // monta a linha com todas as células
    tr.appendChild(tdServico);
    tr.appendChild(tdData);
    tr.appendChild(tdHora);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);                                    // adiciona a linha na tabela
  });
}

// Preenche o select de clientes no formulário de agendamento
async function preencherSelectClientes() {
  const resposta = await fetch("/clientes");
  const clientes = await resposta.json();

  const select = document.getElementById("agendamentoCliente");
  select.innerHTML = "";                                      // limpa o select antes de preencher

  const optPadrao = document.createElement("option");         // cria a opção padrão
  optPadrao.value = "";
  optPadrao.textContent = "Selecione o cliente";              // texto puro, sem risco de código
  select.appendChild(optPadrao);

  clientes.forEach(c => {
    const option = document.createElement("option");          // cria uma opção para cada cliente
    option.value = c.id;
    option.textContent = c.nome;                              // nome como texto puro
    select.appendChild(option);                               // adiciona no select
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
function apagarAgendamento(id) {
  // busca o botão "Apagar" que foi clicado pelo evento onclick ligado diretamente
  const botoes = document.querySelectorAll(".btn-apagar");
  let botao = null;
  botoes.forEach(b => { if (b.onclick && b.onclick.toString().includes(`apagarAgendamento(${id})`)) botao = b; });
  if (!botao) return;

  const btnConfirmar = document.createElement("button");    // cria o botão Confirmar
  btnConfirmar.className = "btn-confirmar";
  btnConfirmar.textContent = "Confirmar ✔";
  btnConfirmar.onclick = () => confirmarApagarAgendamento(id);

  const btnCancelar = document.createElement("button");     // cria o botão Cancelar
  btnCancelar.className = "btn-cancelar-apagar";
  btnCancelar.textContent = "Cancelar ✖";
  btnCancelar.onclick = () => cancelarApagarAgendamento(id, botao.parentNode);

  const td = botao.parentNode;
  td.replaceChild(btnConfirmar, botao);  // substitui o botão Apagar pelo Confirmar
  td.appendChild(btnCancelar);           // adiciona o botão Cancelar
}

// Executado quando o usuário clica em "Confirmar"
async function confirmarApagarAgendamento(id) {
  await fetch(`/agendamentos/${id}`, { method: "DELETE" }); // envia o pedido de apagar ao servidor
  carregarAgendamentos();                                   // atualiza a tabela
}

// Executado quando o usuário clica em "Cancelar" — volta o botão original
function cancelarApagarAgendamento(id, td) {
  const btnEditar = document.createElement("button");       // recria o botão Editar
  btnEditar.className = "btn-editar";
  btnEditar.textContent = "Editar";
  btnEditar.onclick = () => editarAgendamento(id);

  const btnApagar = document.createElement("button");       // recria o botão Apagar original
  btnApagar.className = "btn-apagar";
  btnApagar.textContent = "Apagar";
  btnApagar.onclick = () => apagarAgendamento(id);

  td.innerHTML = "";               // limpa os botões temporários
  td.appendChild(btnEditar);       // readiciona o botão Editar
  td.appendChild(btnApagar);       // readiciona o botão Apagar
}

// =============================================
// INICIALIZAÇÃO - roda quando a página abre
// =============================================
carregarClientes();
