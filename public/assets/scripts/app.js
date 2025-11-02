const dados = [
  {
    id: 1,
    titulo: "Líder de Ginásio",
    descricao: "O rap alternativo que transforma batalhas pessoais em trap eletrônico, celebrando a conquista de cada insígnia na vida urbana.",
    conteudo: "O álbum Líder de Ginásio, lançado por virgingod* em 2022, é uma obra que utiliza o universo de Pokémon como uma metáfora para jornadas pessoais. A coletânea de 13 faixas, com pouco mais de 25 minutos de duração, explora temas de autodescoberta e desafios emocionais.",
    categoria: "Plugg, Rap",
    autor: "Virgingod*",
    data: "25/11/2022",
    imagem: "assets/img/liderdeginasio.png"
  },
  {
    id: 2,
    titulo: "Estar sozinha não é um sentimento",
    descricao: "Uma viagem introspectiva com tons de melancólica.",
    conteudo: "A obra é marcada por uma sonoridade introspectiva e, por vezes, melancólica, explorando temas de solidão, relacionamentos complexos e angústias emocionais. O título, que aparece como um verso em uma de suas músicas, reflete a profundidade lírica do artista ao questionar e desmistificar a natureza dos sentimentos e do isolamento",
    categoria: "Hip Hop, Rap",
    autor: "Plumasdecera",
    data: "06/09/2024",
    imagem: "assets/img/plumasdecera.png"
  },
  {
    id: 3,
    titulo: "Kebrada Boyz",
    descricao: "Trap alternativo com a urgência urbana, onde batidas eletrônicas e melancólicas narram a introspecção da periferia e do autor.",
    conteudo: "É uma obra marcada por uma sonoridade de Trap melancólico (ou sad trap), onde as letras misturam a realidade da periferia (quebrada) com temas de angústia, tristeza e introspecção.",
    categoria: "Rap, Trap",
    autor: "Linkdozap",
    data: "11/08/2022",
    imagem: "assets/img/linkdozap.png"
  }
];


const carouselContainer = document.getElementById("carousel-items");
if (carouselContainer) {
  dados.forEach((item, index) => {
    const activeClass = index === 0 ? "active" : "";
    const slide = `
      <div class="carousel-item ${activeClass}">
        <img src="${item.imagem}" class="d-block w-100" alt="${item.titulo}">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h5>${item.titulo}</h5>
          <p>${item.descricao}</p>
        </div>
      </div>
    `;
    carouselContainer.innerHTML += slide;
  });
}


const container = document.getElementById("lista-albuns");
if (container) {
  dados.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("col-md-4");
      card.innerHTML = `
      <article class="card h-100 text-center shadow-sm">
        <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body">
          <h5 class="card-title">${item.titulo}</h5>
          <p class="card-text">${item.descricao}</p>
          <a href="detalhes.html?id=${item.id}" class="btn btn-dark">Saiba mais</a>
        </div>
      </article>
    `;
    container.appendChild(card);
  });
}


const detalhesContainer = document.getElementById("detalhes");
if (detalhesContainer) {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const item = dados.find(d => d.id === id);

  if (item) {
    detalhesContainer.innerHTML = `
      <div class="card mx-auto shadow-sm" style="max-width:900px;">
        <div class="row g-0">
          <div class="col-md-5">
            <img src="${item.imagem}" alt="${item.titulo}" class="img-fluid detalhe-img w-100 h-100">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h2 class="card-title">${item.titulo}</h2>
              <p class="text-muted mb-2"><strong>Autor:</strong> ${item.autor} • <strong>Data:</strong> ${item.data}</p>
              <p class="lead">${item.descricao}</p>
              <p>${item.conteudo}</p>
              <p class="small text-muted"><strong>Categoria:</strong> ${item.categoria}</p>
              <a href="index.html" class="btn btn-dark mt-3">Voltar para Home</a>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    detalhesContainer.innerHTML = "<p>Álbum não encontrado.</p>";
  }
}
