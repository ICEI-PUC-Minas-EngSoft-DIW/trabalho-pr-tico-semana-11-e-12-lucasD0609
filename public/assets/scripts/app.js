document.addEventListener('DOMContentLoaded', () => {
  const API_URL = "http://localhost:3000/albuns";
  const container = document.getElementById("lista-albuns");
  const carouselContainer = document.getElementById("carousel-items");


  async function carregarAlbuns() {
    try {
      const resposta = await fetch(API_URL);
      if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
      const albuns = await resposta.json();
      renderizarAlbuns(albuns);
    } catch (err) {
      console.error("Erro ao carregar API:", err);
      container.innerHTML = `<p class="text-center text-danger">Erro ao conectar ao servidor JSON (db.json). Certifique-se que ele está rodando.</p>`;
    }
  }


  function renderizarAlbuns(albuns) {
    if (container) {
      container.innerHTML = albuns.map(a => `
        <div class="col-md-4">
          <article class="card h-100 text-center shadow-sm">
            <img src="${a.imagem}" class="card-img-top" alt="${a.titulo}">
            <div class="card-body">
              <h5 class="card-title">${a.titulo}</h5>
              <p class="card-text">${a.descricao}</p>
              <a href="detalhes.html?id=${a.id}" class="btn btn-dark btn-saiba-mais">Saiba mais</a>
              <button class="btn btn-outline-danger mt-2" onclick="deletarAlbum(${a.id})">Excluir</button>
            </div>
          </article>
        </div>
      `).join('');
    }

    if (carouselContainer) {
      carouselContainer.innerHTML = albuns.map((a, i) => `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${a.imagem}" class="d-block w-100" alt="${a.titulo}">
          <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
            <h5>${a.titulo}</h5>
            <p>${a.descricao}</p>
          </div>
        </div>
      `).join('');
    }
  }


  window.deletarAlbum = async function(id) {
    if (!confirm("Tem certeza que deseja excluir este álbum?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      await carregarAlbuns();
    } catch (err) {
      alert('Erro ao excluir álbum. Verifique o console.');
      console.error(err);
    }
  };

  carregarAlbuns();


  const detalhesContainer = document.getElementById("detalhes");
  if (detalhesContainer) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      detalhesContainer.innerHTML = "<p>ID não fornecido.</p>";
      return;
    }

    fetch(`${API_URL}/${id}`)
      .then(r => {
        if (!r.ok) throw new Error(`Erro ${r.status}`);
        return r.json();
      })
      .then(a => {
        detalhesContainer.innerHTML = `
          <div class="card mx-auto shadow-sm" style="max-width:900px;">
            <div class="row g-0">
              <div class="col-md-5">
                <img src="${a.imagem}" alt="${a.titulo}" class="img-fluid detalhe-img w-100 h-100">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <h2 class="card-title">${a.titulo}</h2>
                  <p class="text-muted mb-2"><strong>Autor:</strong> ${a.autor} • <strong>Data:</strong> ${a.data}</p>
                  <p class="lead">${a.descricao}</p>
                  <p>${a.conteudo}</p>
                  <p class="small text-muted"><strong>Categoria:</strong> ${a.categoria}</p>
                  <a href="index.html" class="btn btn-dark mt-3">Voltar para Home</a>
                </div>
              </div>
            </div>
          </div>`;
      })
      .catch(err => {
        console.error('Erro ao carregar detalhes:', err);
        detalhesContainer.innerHTML = `<p class="text-danger">Erro ao buscar detalhes. Verifique se o servidor JSON está ativo.</p>`;
      });
  }
});