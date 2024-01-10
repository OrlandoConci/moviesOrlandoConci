import {crearArticulo} from './module/funciones.js'

// Muestra total
const $divContenedor = document.getElementById("contenedor")
crearArticulo(peliculas, $divContenedor)

// Filtro de búsqueda

const $filtroGenero = document.getElementById("filtroGenero")
const $cajaIngreso = document.getElementById("cajaIngreso")

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
        $divContenedor.innerHTML = `<p class=" font-[raleway] text-[#FFFFFF]">>> no matching results <<</p>`
    }
})


$filtroGenero.addEventListener('change', () => {
    const peliculasFiltradasPorNombre = filtrarPeliculasPorNombre(peliculas, $cajaIngreso.value)
    const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculasFiltradasPorNombre)
    if (peliculasFiltradasPorGenero.length != 0) {
        crearArticulo(peliculasFiltradasPorGenero, $divContenedor)
    } else {
        $divContenedor.innerHTML = `<p class="font-[raleway] text-[#FFFFFF]">>> no matching results <<</p>`
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

// Limpiar búsqueda

const $botonClear = document.getElementById("botonClear")
$botonClear.addEventListener("click", limpiarBusqueda)
const $formularioBusqueda = document.getElementById("formularioBusqueda")

function limpiarBusqueda(e) {
    e.preventDefault()
    $formularioBusqueda.reset()
    crearArticulo(peliculas, $divContenedor)
}

// Fin
