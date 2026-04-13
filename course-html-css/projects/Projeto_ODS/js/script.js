// --- CABEÇALHO ACOMPANHA SCROLL ---

window.addEventListener("scroll", function() {
    const cabecalho = this.document.getElementById("cabecalho");

    if (window.scrollY > 50) {
        cabecalho.classList.add("shrink");
    } else {
        cabecalho.classList.remove("shrink");
    }
})

// Ao dar "scroll" chama a função, que adiciona o elemento com o id "cabecalho" a variavel cabecalho, ai IF scroll foi maior que 50px add "shrink" do css se for menor q 50px (está no topo da página o "shrink" é deletado)

// --- EFEITO REVEAL AO SCROLL ---

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();




// --- ÁREA DE CALCULO DE CONSUMO ---

  const aparelhos = [];

  function adicionarAparelho() {
    const nome = document.getElementById('nome').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const horas = parseFloat(document.getElementById('horas').value);

    if (!nome || isNaN(quantidade) || isNaN(consumo) || isNaN(horas)) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    aparelhos.push({ nome, quantidade, consumo, horas });
    atualizarTabela();

    document.getElementById('nome').value = "";
    document.getElementById('quantidade').value = "";
    document.getElementById('consumo').value = "";
    document.getElementById('horas').value = "";
  }

  function atualizarTabela() {
    const corpo = document.querySelector("#tabela tbody");
    corpo.innerHTML = "";

    aparelhos.forEach(a => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${a.nome}</td>
        <td>${a.quantidade}</td>
        <td>${a.consumo}</td>
        <td>${a.horas}</td>
        <td>-</td>
      `;
      corpo.appendChild(linha);
    });
  }

  function calcularConsumo() {
    const corpo = document.querySelector("#tabela tbody");
    corpo.innerHTML = "";
    let total = 0;
    let co2 = 0;
    let arvore = 0;

    aparelhos.forEach(a => {
      const consumoDiario = a.quantidade * a.consumo * a.horas;
      total += consumoDiario;

      const co2Gerado = consumoDiario * 0.10
      co2 += co2Gerado

      const conversaoArvore = co2Gerado / 0.06
      arvore += conversaoArvore

      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${a.nome}</td>
        <td>${a.quantidade}</td>
        <td>${a.consumo}</td>
        <td>${a.horas}</td>
        <td>${consumoDiario.toFixed(2)} kWh</td>
      `;
      corpo.appendChild(linha);
    });

    document.getElementById("resultado").innerHTML =
      `Consumo total diário: <strong>${total.toFixed(2)} kWh</strong>`;

    document.getElementById("co2").innerHTML =
      `O que equivale há: <strong>${co2.toFixed(2)} Kg de gás CO₂</strong>`;
      
    document.getElementById("arvore").innerHTML = 
      `Você precisaria de aproximadamente <strong>${arvore.toFixed(2)} árvores para compensar esse CO₂</strong>`  
  }