const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const resultado = document.getElementById("resultado");
const btnTema = document.getElementById("btnTema");

document.getElementById("btnSaudar").addEventListener("click", function () {
  const nome = nomeInput.value.trim();

  if (nome === "") {
    resultado.textContent = "Por favor, insira um nome.";
  } else {
    resultado.textContent = "Olá, " + nome + "! Seja bem-vindo(a).";
  }
});

document.getElementById("btnIdade").addEventListener("click", function () {
  const idade = idadeInput.value;

  if (idade === "" || isNaN(idade) || Number(idade) < 0) {
    resultado.textContent = "Por favor, insira uma idade válida.";
    return;
  }

  const idadeNum = Number(idade);

  if (idadeNum < 12) {
    resultado.textContent = "Você é criança.";
  } else if (idadeNum >= 12 && idadeNum <= 17) {
    resultado.textContent = "Você é adolescente.";
  } else {
    resultado.textContent = "Você é adulto.";
  }
});

btnTema.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    btnTema.textContent = "Modo claro";
  } else {
    btnTema.textContent = "Modo noturno";
  }
});

document.getElementById("btnLimpar").addEventListener("click", function () {
  nomeInput.value = "";
  idadeInput.value = "";
  resultado.textContent = "";
  nomeInput.focus();
});