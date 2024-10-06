let listadoPeliculas = [];
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then((response) => response.json())
    .then((data) => {
      listadoPeliculas = data;
    });

  function mostrarPeliculas(texto) {
    const texto_lowercase = texto.toLowerCase();
    const listadoPeliculasFiltradas = listadoPeliculas.filter((pelicula) => {
      return (
        pelicula.title.toLowerCase().includes(texto_lowercase) ||
        pelicula.genres.toString().toLowerCase().includes(texto_lowercase) ||
        pelicula.tagline.toLowerCase().includes(texto_lowercase) ||
        pelicula.overview.toLowerCase().includes(texto_lowercase)
      );
    });
    console.log(listadoPeliculasFiltradas)
    listadoPeliculasFiltradas.forEach((element) => {
      let contenedor = document.getElementById("lista");
      let elementosEstrellas = null;
      const cantidadEstrellas = (element.vote_average / 10) * 5;
      if(Math.round(cantidadEstrellas) <= 1){
        elementosEstrellas = `<div>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
              </div>`
      }
      if(Math.round(cantidadEstrellas) == 2){
        elementosEstrellas = `<div>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
              </div>`
      }
      if(Math.round(cantidadEstrellas) == 3){
        elementosEstrellas = `<div>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
              </div>`
      }
      if(Math.round(cantidadEstrellas) == 4){
        elementosEstrellas = `<div>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
              </div>`
      }
      if(Math.round(cantidadEstrellas) == 5){
        elementosEstrellas = `<div>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
              </div>`
      }
      contenedor.insertAdjacentHTML(
        "beforeend",
        `
      <li onClick="mostrarContenedor('${element.id}')">
        <div class="item-pelicula">
          <div>
              <div class="item-pelicula-titulo">${element.title}</div>
              <div class="item-pelicula-subtitulo">${element.tagline}</div>
          </div>
          <div>
              ${elementosEstrellas}
          </div>
        </div>
      </li>
                `
      );
    });
    return listadoPeliculasFiltradas;
  }

  document.getElementById("btnBuscar").addEventListener("click", () => {
    document.getElementById('lista').innerHTML = "";
    const texto = document.getElementById("inputBuscar").value;
    if (!texto) {
        return
    }
    const peliculas = mostrarPeliculas(texto);
    console.log(peliculas);
  });
  
});

function mostrarContenedor(id) {
    const pelicula = listadoPeliculas.find((element)=>{
        return element.id == id
    })
    document.getElementById("modal-titulo").innerText = pelicula.title
    document.getElementById("modal-overview").innerText = pelicula.overview
    console.log(pelicula.genres)
    const genres = pelicula.genres.map((element)=>{
        return element.name
    })
    document.getElementById("modal-genres").innerText = genres.join(' - ');
    const dropdownLista = `
    <li><div class="dropdown-item"><div>Year:</div> <div>${pelicula.release_date}</div></div></li>
    <li><div class="dropdown-item"><div>Runtime:</div> <div>${pelicula.runtime} mins</div></div></li>
    <li><div class="dropdown-item"><div>Budget:</div> <div>$${pelicula.revenue}</div></div></li>
    <li><div class="dropdown-item"><div>Revenue:</div> <div>$${pelicula.budget}</div></div></li>
    `
    document.getElementById('dropdown-list').innerHTML = "";
    document.getElementById("dropdown-list").insertAdjacentHTML("beforeend",dropdownLista)
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasTop"));
    bsOffcanvas.show();
}