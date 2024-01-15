import {agregaContenido, crearArticulo, obtenerGeneros, crearSelect, crearOpciones, filtrarPeliculasPorNombre, filtrarPeliculasPorGenero, limpiarBusqueda} from './module/funciones.js'

// GET API
const url = "https://moviestack.onrender.com/api/movies"

fetch(url, {headers: {"x-api-key":"0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"}})
    .then(respuesta => respuesta.json())
    .then(peliculasApi => {
        let peliculas = peliculasApi.movies
        
        // Muestra Total
        crearArticulo(peliculas, $divContenedor)

        // Crear Opciones Select
        crearOpciones(peliculas, $filtroGenero)

        // Eventos Filtro
        $cajaIngreso.addEventListener("input", () => {
            const peliculasFiltradasPorNombre = filtrarPeliculasPorNombre(peliculas, $cajaIngreso.value)
            const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculasFiltradasPorNombre, $filtroGenero)
            if (peliculasFiltradasPorGenero.length != 0) {
                crearArticulo(peliculasFiltradasPorGenero, $divContenedor)
            } else {
                $divContenedor.innerHTML = `<p class=" font-[raleway] text-[#FFFFFF]">>> no matching results <<</p>`
            }
        })
        
        
        $filtroGenero.addEventListener('change', () => {
            const peliculasFiltradasPorNombre = filtrarPeliculasPorNombre(peliculas, $cajaIngreso.value)
            const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculasFiltradasPorNombre, $filtroGenero)
            if (peliculasFiltradasPorGenero.length != 0) {
                crearArticulo(peliculasFiltradasPorGenero, $divContenedor)
            } else {
                $divContenedor.innerHTML = `<p class="font-[raleway] text-[#FFFFFF]">>> no matching results <<</p>`
            }
        })

        $botonClear.addEventListener("click", (e) => {
            e.preventDefault()
            limpiarBusqueda($formularioBusqueda, peliculas, $divContenedor)
        })
    })
    .catch( error => console.log( error ))

// Muestra total
const $divContenedor = document.getElementById("contenedor")

// Filtro de búsqueda

const $filtroGenero = document.getElementById("filtroGenero")
const $cajaIngreso = document.getElementById("cajaIngreso")

// Limpiar búsqueda

const $botonClear = document.getElementById("botonClear")
const $formularioBusqueda = document.getElementById("formularioBusqueda")

// Fin
