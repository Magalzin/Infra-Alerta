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
      const response = await fetch("/chamados/criar", {
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
      console.log("Chamado criado:", data);
      if (!data.id) {
        console.log("Data id não pega", data.id);
      }

      const chamadosContainer = document.getElementById("chamadosContainer");
      const chamadoInsert = document.createElement("div");
      chamadoInsert.classList.add("background-chamado", "card", "p-3", "mb-3");
      chamadoInsert.innerHTML = `
  <div class="position-relative">
  <h5 contenteditable="false" class="editable" data-field="titulo">${data.titulo}</h5>
  <p contenteditable="false" class="editable" data-field="descricao">${data.descricao}</p>
    <small>
      <strong>Cidade:</strong> <span contenteditable="false" class="editable" data-field="cidade">${data.cidade}</span> |
      <strong>Bairro:</strong> <span contenteditable="false" class="editable" data-field="bairro">${data.bairro}</span> |
      <strong>Rua:</strong> <span contenteditable="false" class="editable" data-field="rua">${data.rua}</span> |
      <strong>Curtidas:</strong> <span id="curtidas-number-${data.id}">${data.curtidas}</span> |
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="curtir(this)" data-id="${data.id}">
        ❤️
      </button>
      <button class="btn btn-outline-light btn-sm ms-2" onclick="toggleEdit(this)" data-id="${data.id}">
        ✏️
      </button>
      <button class="btn btn-outline-light btn-sm ms-2" onclick="deleteChamado(this)" data-id="${data.id}" data-titulo="${data.titulo}">
        🗑️
      </button>
    </small>
  </div>
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
    const response = await fetch("/chamados", {
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
  <div class="position-relative">
    <h5 contenteditable="false" class="editable" data-field="titulo">${chamado.titulo}</h5>
    <p contenteditable="false" class="editable" data-field="descricao">${chamado.descricao}</p>
    <small>
      <strong>Cidade:</strong> <span contenteditable="false" class="editable" data-field="cidade">${chamado.cidade}</span> |
      <strong>Bairro:</strong> <span contenteditable="false" class="editable" data-field="bairro">${chamado.bairro}</span> |
      <strong>Rua:</strong> <span contenteditable="false" class="editable" data-field="rua">${chamado.rua}</span> |
      <strong>Curtidas:</strong> <span id="curtidas-number-${chamado.id}">${chamado.curtidas}</span> |
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="curtir(this)" data-id="${chamado.id}">
        ❤️
      </button>
      <button class="btn btn-outline-light btn-sm ms-2" onclick="toggleEdit(this)" data-id="${chamado.id}">
        ✏️
      </button>
      <button class="btn btn-outline-light btn-sm ms-2" onclick="deleteChamado(this)" data-id="${chamado.id}" data-titulo="${chamado.titulo}">
        🗑️
      </button>
    </small>
  </div>
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
  console.log("VAMOS CURTIR", idChamado);

  if (idChamado) {
    // chama uma função para curtir o chamado
    await curtirChamado(idChamado);

    let currentCurtidas = parseInt(
      document.getElementById(`curtidas-number-${idChamado}`).textContent
    );

    currentCurtidas++;

    // Atualiza o texto dentro do <span> com o novo número de curtidas
    document.getElementById(`curtidas-number-${idChamado}`).textContent =
      currentCurtidas;
  } else {
    console.error("ID do chamado não encontrado.");
  }
}

// Função para enviar requisição de curtida
async function curtirChamado(id) {
  try {
    const response = await fetch(`/chamados/like/${id}`, {
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

// PUT
function toggleEdit(button) {
  const card = button.closest(".card");
  const isEditing = button.getAttribute("data-editing") === "true";
  const id = button.getAttribute("data-id");

  const fields = card.querySelectorAll(".editable");

  if (!isEditing) {
    // Torna os campos editáveis
    fields.forEach((el) => el.setAttribute("contenteditable", "true"));
    button.innerText = "💾";
    button.setAttribute("data-editing", "true");
  } else {
    // Coleta os dados atualizados
    const chamadoAtualizado = {};
    fields.forEach((el) => {
      chamadoAtualizado[el.getAttribute("data-field")] = el.innerText;
      el.setAttribute("contenteditable", "false");
    });

    button.innerText = "✏️";
    button.setAttribute("data-editing", "false");

    // Envia o PUT
    fetch(`/chamados/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chamadoAtualizado),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar chamado");
        return res.json();
      })
      .then((data) => {
        alert("Chamado atualizado com sucesso!");
        console.log("Atualizado:", data);
      })
      .catch((err) => {
        alert("Erro ao atualizar");
        console.error(err);
      });
  }
}

// DELETE
async function deleteChamado(button){
  const id = button.getAttribute("data-id");
  const titulo = button.getAttribute("data-titulo");

  // Aqui você deve fazer uma requisição DELETE para remover o chamado
  try {
    const response = await fetch(`/chamados/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar chamado");
    }
    
    const card = button.closest(".card");

    alert(`Chamado ${titulo} deletado com sucesso!`);
    // Remove o card da interface
    if (card) card.remove();
  } catch (err) {
    alert("Erro ao deletar chamado");
    console.error(err);
  }
}
