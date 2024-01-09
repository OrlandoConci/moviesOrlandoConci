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

// Muestra total
const $divContenedor = document.getElementById("contenedor")
crearArticulo(peliculas, $divContenedor)

// Filtro de búsqueda

$filtroGenero = document.getElementById("filtroGenero")
$cajaIngreso = document.getElementById("cajaIngreso")

function obtenerGeneros(Peliculas) {
    let generos = Peliculas
        .map(pelicula => pelicula.genres)
        .flat()
        .filter((genres, indice, array) => array.indexOf(genres) == indice)
    return generos
}

function crearSelect(genres) {
    return ` <option value="${genres}">${genres}</option>`
} 

function crearOpciones(peliculas) {
    const generos = obtenerGeneros(peliculas)
    $filtroGenero.innerHTML += generos.reduce((templateAcumulado, generos) => templateAcumulado += crearSelect(generos), "")
}

crearOpciones(peliculas)

$cajaIngreso.addEventListener("input", () => {
    const peliculasFiltradasPorNombre = filtrarPeliculasPorNombre(peliculas, $cajaIngreso.value)
    const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculasFiltradasPorNombre)
    if (peliculasFiltradasPorGenero.length != 0) {
        crearArticulo(peliculasFiltradasPorGenero, $divContenedor)
    } else {
        $divContenedor.innerHTML = `<p class="font-[raleway] text-[#FFFFFF]">>> no hay resultados coincidentes <<</p>`
    }
})


$filtroGenero.addEventListener('change', () => {
    const peliculasFiltradasPorNombre = filtrarPeliculasPorNombre(peliculas, $cajaIngreso.value)
    const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculasFiltradasPorNombre)
    if (peliculasFiltradasPorGenero.length != 0) {
        crearArticulo(peliculasFiltradasPorGenero, $divContenedor)
    } else {
        $divContenedor.innerHTML = `<p class="font-[raleway] text-[#FFFFFF]">>> no hay resultados coincidentes <<</p>`
    }
})


function filtrarPeliculasPorNombre(peliculas, nombreIngresado) {
    return peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(nombreIngresado.toLowerCase()))
}

function filtrarPeliculasPorGenero(peliculasFiltradasPorNombre) {
    const seleccionado = $filtroGenero.options[$filtroGenero.selectedIndex].value
    if (seleccionado == "Genre") {
        return peliculasFiltradasPorNombre
    }
    return peliculasFiltradasPorNombre.filter(pelicula => pelicula.genres.includes(seleccionado))
}

// mejorar call to action
// main x index.html
// textos a inglés
//agregar boton clean al filtro
//RESPONSIVE