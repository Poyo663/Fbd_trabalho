const API = "http://localhost:3001/api";

function mostrarSecao(id) {
  document
    .querySelectorAll(".secao")
    .forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// -------------------- Crianças ------------------------

async function carregarCriancas() {
  const res = await fetch(`${API}/criancas`);
  const criancas = await res.json();
  const lista = document.getElementById("listaCriancas");
  lista.innerHTML = "";
  criancas.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${c[1]} - ${c[6]} - Encaminhamentos: ${c.encaminhamentos} - Acompanhamentos: ${c.datas_acompanhamento}`;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&#10006;";
    removeButton.addEventListener("click", async () => {
      const re = await fetch(`${API}/criancas/remove/${c[1]}`);
      if(re.ok) carregarCriancas();
    });
    li.appendChild(removeButton);

    lista.appendChild(li);
  });
}

async function adicionarCrianca(event) {
  event.preventDefault();
  const data = {
    nome: document.getElementById("nomeCrianca").value,
    situacao: document.getElementById("situacaoCrianca").value,
    data_nascimento: document.getElementById("encaminhamentos").value,
    sexo: document.getElementById("datasAcompanhamento").value,
    cpf: document.getElementById("cpf").value,
    escola: document.getElementById("Escola").value,
  };
  const res = await fetch(`${API}/criancas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    carregarCriancas();
    event.target.reset();
  } else {
    alert("Erro ao adicionar criança");
  }
}

async function buscarCrianca() {
  const nome = document.getElementById("buscaNome").value;
  if (!nome) {
    carregarCriancas();
    return;
  }
  const res = await fetch(`${API}/criancas/buscar/${encodeURIComponent(nome)}`);
  if (!res.ok) {
    alert("Erro na busca");
    return;
  }
  const criancas = await res.json();
  const lista = document.getElementById("listaCriancas");
  lista.innerHTML = "";
  criancas.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${c[1]} - ${c[6]} - Encaminhamentos: ${c.encaminhamentos} - Acompanhamentos: ${c.datas_acompanhamento}`;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&#10006;";
    removeButton.addEventListener("click", async () => {
      const re = await fetch(`${API}/criancas/remove/${c[1]}`);
      if(re.ok) carregarCriancas();
    });
    li.appendChild(removeButton);

    lista.appendChild(li);
  });
}

// -------------------- Relatórios ------------------------

async function carregarProfissionais() {
  const res = await fetch(`${API}/profissionais`);
  const dados = await res.json();
  const lista = document.getElementById("Plista");
  lista.innerHTML = "";
  dados.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r[0]} - ${r[1]}`;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&#10006;";
    removeButton.addEventListener("click", async () => {
      const re = await fetch(`${API}/profissionais/remove/${r[0]}`);
      if(re.ok) carregarProfissionais();
    });
    li.appendChild(removeButton);

    lista.appendChild(li);
  });
}

async function adicionarProfissionais(event) {
  event.preventDefault();
  const data = {
    nome: document.getElementById("nomeProfissional").value,
    genero: document.getElementById("generoProfissional").value,
    cpf: document.getElementById("cpfProfissional").value,
    setor: document.getElementById("setorProfissional").value,
  };
  const res = await fetch(`${API}/profissionais`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    carregarProfissionais();
    event.target.reset();
  } else {
    alert("Erro ao adicionar relatório");
  }
}

async function buscarProfissional() {
  const nome = document.getElementById("PbuscaNome").value;
  if (!nome) {
    carregarProfissionais();
    return;
  }
  const res = await fetch(
    `${API}/profissionais/buscar/${encodeURIComponent(nome)}`,
  );
  if (!res.ok) {
    alert("Erro na busca");
    return;
  }
  const prof = await res.json();
  const lista = document.getElementById("Plista");
  lista.innerHTML = "";
  prof.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r[0]} - ${r[1]}`;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&#10006;";
    removeButton.addEventListener("click", async () => {
      const re = await fetch(`${API}/profissionais/remove/${r[0]}`);
      if(re.ok) carregarProfissionais();
    });
    li.appendChild(removeButton);

    lista.appendChild(li);
  });
}

// -------------------- Agendamentos ------------------------

async function carregarAgendamentos() {
  const res = await fetch(`${API}/agendamentos`);
  const dados = await res.json();
  const lista = document.getElementById("listaAgendamentos");
  lista.innerHTML = "";
  dados.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = `${a[4] || "Anonimo"} - visita em ${a[1]} - Obs: ${a[3] || "-"}`;
    lista.appendChild(li);
  });
}

async function agendarVisita(event) {
  event.preventDefault();
  const data = {
    data: document.getElementById("dataVisita").value,
    setor: document.getElementById("setorAgendamento").value,
    resumo: document.getElementById("obsAgendamento").value,
  };
  const res = await fetch(`${API}/agendamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    carregarAgendamentos();
    event.target.reset();
  } else {
    alert("Erro ao agendar visita");
  }
}

// async function agendarVisita(/* event */) {
//   // event.preventDefault();
//   const data = {
//     nomeCrianca: "Anna",
//     dataVisita: "25-04-2025",
//     observacao: "Nada demais"
//   };
//   const res = await fetch(`${API}/agendamentos`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   });
//   if (res.ok) {
//     carregarAgendamentos();
//     // event.target.reset();
//   } else {
//     alert('Erro ao agendar visita');
//   }
// }
//
// -------------------- Inicial ------------------------

window.onload = () => {
  mostrarSecao("criancas"); // Mostrar seção inicial
  carregarCriancas();
  carregarProfissionais();
  carregarAgendamentos();

  // Eventos dos formulários
  document
    .getElementById("formCrianca")
    .addEventListener("submit", adicionarCrianca);
  document.getElementById("buscaNome").addEventListener("input", buscarCrianca);
  document
    .getElementById("Psubmit")
    .addEventListener("click", adicionarProfissionais);
  document
    .getElementById("PbuscaNome")
    .addEventListener("input", buscarProfissional);
  document
    .getElementById("formAgendamento")
    .addEventListener("submit", agendarVisita);
};
