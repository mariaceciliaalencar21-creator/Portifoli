// ==============================
// INTERAÇÕES DO PORTFÓLIO
// Maria Cecília Alencar
// ==============================

document.addEventListener("DOMContentLoaded", function () {
  const documentoHtml = document.documentElement;
  const botaoTema = document.getElementById("botao-tema");
  const textoBotaoTema = botaoTema.querySelector("span");
  const iconeBotaoTema = botaoTema.querySelector("i");
  const botaoMenu = document.getElementById("botao-menu");
  const menuNavegacao = document.getElementById("menu-navegacao");
  const botaoTopo = document.getElementById("botao-topo");
  const textoDigitacao = document.getElementById("texto-digitacao");
  const anoAtual = document.getElementById("ano-atual");

  // Atualiza automaticamente o ano do rodapé.
  anoAtual.textContent = new Date().getFullYear();

  // Alterna entre o modo escuro e o modo claro.
  botaoTema.addEventListener("click", function () {
    const temaAtual = documentoHtml.getAttribute("data-tema");
    const novoTema = temaAtual === "escuro" ? "claro" : "escuro";

    documentoHtml.setAttribute("data-tema", novoTema);

    if (novoTema === "claro") {
      textoBotaoTema.textContent = "Modo escuro";
      iconeBotaoTema.className = "bi bi-moon-fill";
    } else {
      textoBotaoTema.textContent = "Modo claro";
      iconeBotaoTema.className = "bi bi-sun-fill";
    }
  });

  // Abre e fecha o menu em telas pequenas.
  botaoMenu.addEventListener("click", function () {
    const menuEstaAberto = menuNavegacao.classList.toggle("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
    botaoMenu.setAttribute("aria-label", menuEstaAberto ? "Fechar menu" : "Abrir menu");
    botaoMenu.querySelector("i").className = menuEstaAberto ? "bi bi-x-lg" : "bi bi-list";
  });

  // Fecha o menu depois que uma seção é selecionada.
  menuNavegacao.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menuNavegacao.classList.remove("menu-aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
      botaoMenu.querySelector("i").className = "bi bi-list";
    });
  });

  // Efeito de máquina de escrever na apresentação principal.
  const fraseDigitacao = "Tecnologia e Programação";
  let indiceLetra = 0;

  function escreverFrase() {
    if (indiceLetra < fraseDigitacao.length) {
      textoDigitacao.textContent += fraseDigitacao.charAt(indiceLetra);
      indiceLetra += 1;
      window.setTimeout(escreverFrase, 75);
    }
  }

  if (textoDigitacao) {
    textoDigitacao.textContent = "";
    escreverFrase();
  }

  // Mostra o botão de voltar ao topo após rolar a página.
  function atualizarBotaoTopo() {
    if (window.scrollY > 350) {
      botaoTopo.classList.add("visivel");
    } else {
      botaoTopo.classList.remove("visivel");
    }
  }

  window.addEventListener("scroll", atualizarBotaoTopo, { passive: true });
  atualizarBotaoTopo();

  botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Revela os elementos conforme eles entram na área visível da tela.
  const elementosRevelar = document.querySelectorAll(".elemento-revelar");

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(function (entradas, observadorAtual) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("revelado");
          observadorAtual.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosRevelar.forEach(function (elemento) {
      observador.observe(elemento);
    });
  } else {
    // Alternativa para navegadores sem suporte ao IntersectionObserver.
    elementosRevelar.forEach(function (elemento) {
      elemento.classList.add("revelado");
    });
  }
});
