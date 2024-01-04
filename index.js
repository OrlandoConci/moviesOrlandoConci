function agregaContenido(objeto) {
    let articulo = `<article class="flex flex-col items-center bg-slate-600 text-white gap-3 p-1 border rounded-2xl w-1/6 min-w-72 overflow-hidden text-center">
    <img class="w-72 h-52 object-contain" src="${objeto.image}" alt= "Una imágen ilustrativa de la película '${objeto.title}'" >
    <h2 class=font-bold>${objeto.title}</h2>
    <h3 class="italic">${objeto.tagline}</h3>
    <p>${objeto.overview}</p>
    </article>`
    return articulo
}

function crearArticulo(peliculas, elemento) {
    let fragment = ""
    peliculas.forEach(pelicula => {
        fragment += agregaContenido(pelicula)
    })
    elemento.innerHTML = fragment
}

const $divContenedor = document.getElementById("contenedor")
crearArticulo(peliculas, $divContenedor)

// fin
