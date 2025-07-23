const API = 'http://localhost:3001/api';

function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// -------------------- Crianças ------------------------

async function carregarCriancas() {
  const res = await fetch(`${API}/criancas`);
  const criancas = await res.json();
  console.log(criancas);
  const lista = document.getElementById('listaCriancas');
  lista.innerHTML = '';
  criancas.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c[1]} - ${c[6]} - Encaminhamentos: ${c.encaminhamentos} - Acompanhamentos: ${c.datas_acompanhamento}`;
    lista.appendChild(li);
  });
}

async function adicionarCrianca(event) {
  event.preventDefault();
  const data = {
    nome: document.getElementById('nomeCrianca').value,
    situacao: document.getElementById('situacaoCrianca').value,
    data_nascimento: document.getElementById('encaminhamentos').value,
    sexo: document.getElementById('datasAcompanhamento').value,
    cpf: document.getElementById('cpf').value,
    escola: document.getElementById('Escola').value
  };
  const res = await fetch(`${API}/criancas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    carregarCriancas();
    event.target.reset();
  } else {
    alert('Erro ao adicionar criança');
  }
}

async function buscarCrianca() {
  const nome = document.getElementById('buscaNome').value;
  if (!nome) {
    carregarCriancas();
    return;
  }
  const res = await fetch(`${API}/criancas/buscar/${encodeURIComponent(nome)}`);
  if (!res.ok) {
    alert('Erro na busca');
    return;
  }
  const criancas = await res.json();
  const lista = document.getElementById('listaCriancas');
  lista.innerHTML = '';
  criancas.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c[1]} - ${c[6]} - Encaminhamentos: ${c.encaminhamentos} - Acompanhamentos: ${c.datas_acompanhamento}`;
    lista.appendChild(li);
  });
}

// -------------------- Relatórios ------------------------

async function carregarRelatorios() {
  const res = await fetch(`${API}/relatorios`);
  const dados = await res.json();
  const lista = document.getElementById('listaRelatorios');
  lista.innerHTML = '';
  dados.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.tipo.toUpperCase()} | ${r.data} - ${r.conteudo}`;
    lista.appendChild(li);
  });
}

async function adicionarRelatorio(event) {
  event.preventDefault();
  const data = {
    tipo: document.getElementById('tipoRelatorio').value,
    data: document.getElementById('dataRelatorio').value,
    conteudo: document.getElementById('conteudoRelatorio').value
  };
  const res = await fetch(`${API}/relatorios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    carregarRelatorios();
    event.target.reset();
  } else {
    alert('Erro ao adicionar relatório');
  }
}

// -------------------- Agendamentos ------------------------

async function carregarAgendamentos() {
  const res = await fetch(`${API}/agendamentos`);
  const dados = await res.json();
  console.log(dados);
  const lista = document.getElementById('listaAgendamentos');
  lista.innerHTML = '';
  dados.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a[4] || "Anonimo"} - visita em ${a[1]} - Obs: ${a[3] || '-'}`;
    lista.appendChild(li);
  });
}

async function agendarVisita(event) {
  event.preventDefault();
  const data = {
    nomeCrianca: document.getElementById('nomeAgendado').value,
    dataVisita: document.getElementById('dataVisita').value,
    observacao: document.getElementById('obsAgendamento').value
  };
  const res = await fetch(`${API}/agendamentos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    carregarAgendamentos();
    event.target.reset();
  } else {
    alert('Erro ao agendar visita');
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
agendarVisita();
// -------------------- Inicial ------------------------

window.onload = () => {
  mostrarSecao('criancas'); // Mostrar seção inicial
  carregarCriancas();
  carregarRelatorios();
  carregarAgendamentos();

  // Eventos dos formulários
  document.getElementById('formCrianca').addEventListener('submit', adicionarCrianca);
  document.getElementById('buscaNome').addEventListener('input', buscarCrianca);
  document.getElementById('formRelatorio').addEventListener('submit', adicionarRelatorio);
  document.getElementById('formAgendamento').addEventListener('submit', agendarVisita);
};
