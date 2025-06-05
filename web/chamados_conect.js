// POST
document
  .getElementById("chamadoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const chamado = {
      titulo: document.getElementById("titulo").value,
      descricao: document.getElementById("descricao").value,
      cidade: document.getElementById("cidade").value,
      bairro: document.getElementById("bairro").value,
      rua: document.getElementById("rua").value,
    };
    if (
      titulo.length > 60 ||
      descricao.length > 300 ||
      cidade.length > 50 ||
      bairro.length > 50 ||
      rua.length > 50
    ) {
      alert(
        "Por favor, respeite os limites de caracteres: \n- Título: 60\n- Descrição: 300\n- Cidade, Bairro, Rua: 50 cada"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/chamados/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `{
                "titulo": "${chamado.titulo}",
                "descricao": "${chamado.descricao}",
                "cidade": "${chamado.cidade}",
                "bairro": "${chamado.bairro}",
                "rua": "${chamado.rua}" 
            }`,
      });

      if (!response.ok) {
        // Se a resposta HTTP não for bem-sucedida, lança um erro com o status
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json(); // Processa a resposta do servidor
      console.log(response.status);

      const chamadosContainer = document.getElementById("chamadosContainer");
      const chamadoInsert = document.createElement("div");
      chamadoInsert.classList.add("background-chamado", "card", "p-3", "mb-3");
      chamadoInsert.innerHTML = `
            <h5>${data.titulo}</h5>
            <p>${data.descricao}</p>
            <small><strong>Cidade:</strong> ${data.cidade} | 
            <strong>Bairro:</strong> ${data.bairro} | 
            <strong>Rua:</strong> ${data.rua} |
            <strong id="curtidas-count">Curtidas: </strong> <span id="curtidas-number-${data.id}">
              ${data.curtidas}
            </span> |
            <button type="button" class="btn btn-outline-danger w-20 h-20" id="curtir" data-id="${data.id}" onclick="curtir(this)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              </svg>
            </button>
            </small>
        `;
      chamadosContainer.appendChild(chamadoInsert);

      document.getElementById("chamadoForm").reset();
      document.querySelector(".btn-close").click();
    } catch (error) {
      alert(error);
      console.error("Erro ao enviar chamado:", error);
      alert("Erro ao conectar com o servidor");
    }
  });

//GET
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:8080/chamados", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();

    if (!response.status == 200) {
      throw new Error(`Erro: ${response.status}`);
    }

    // Exibir os dados na página (exemplo simples)
    const chamadosContainer = document.getElementById("chamadosContainer");
    data.forEach((chamado) => {
      const chamadoInsert = document.createElement("div");
      chamadoInsert.classList.add("background-chamado", "card", "p-3", "mb-3");
      chamadoInsert.innerHTML = `
            <h5>${chamado.titulo}</h5>
            <p>${chamado.descricao}</p>
            <small>
            <strong>Cidade:</strong> ${chamado.cidade} | 
            <strong>Bairro:</strong> ${chamado.bairro} | 
            <strong>Rua:</strong> ${chamado.rua} | 
            <strong id="curtidas-count">Curtidas: </strong> <span id="curtidas-number-${chamado.id}">
              ${chamado.curtidas}
            </span> |
            <button type="button" class="btn btn-outline-danger w-20 h-20" id="curtir" data-id="${chamado.id}" onclick="curtir(this)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              </svg>
            </button>
            </small>
        `;
      chamadosContainer.appendChild(chamadoInsert);
    });
  } catch (error) {
    alert(error);
    console.error("Erro ao buscar chamados:", error);
    alert("erro ao buscar os chamados para mostrar");
  }
});

// POST
async function curtir(button) {
  // Obtendo o ID do chamado a partir do atributo "data-id"
  const idChamado = button.getAttribute("data-id");

  if (idChamado) {
    // chama uma função para curtir o chamado
    await curtirChamado(idChamado);

    let currentCurtidas = parseInt(
      document.getElementById(`curtidas-number-${idChamado}`).textContent
    );

    currentCurtidas++;
  
    // Atualiza o texto dentro do <span> com o novo número de curtidas
    document.getElementById(`curtidas-number-${idChamado}`).textContent = currentCurtidas;
  } else {
    console.error("ID do chamado não encontrado.");
  }
}

// Função para enviar requisição de curtida
async function curtirChamado(id) {
  try {
    const response = await fetch(`http://localhost:8080/chamados/like/${id}`, {
      method: "POST",
    });

    if (response.ok) {
      console.log(`Chamado curtido com sucesso!`);
    } else {
      console.error("Erro ao curtir o chamado");
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor", error);
  }
}
