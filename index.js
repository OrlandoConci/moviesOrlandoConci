import {agregaContenido, crearArticulo, obtenerGeneros, crearSelect, crearOpciones, filtrarPeliculasPorNombre, filtrarPeliculasPorGenero, limpiarBusqueda} from './module/funciones.js'

// GET API
const url = "https://moviestack.onrender.com/api/movies"

fetch(url, {headers: {"x-api-key":"0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"}})
    .then(respuesta => respuesta.json())
    .then(peliculasApi => {
        let peliculas = peliculasApi.movies
        let favoritasLocal = JSON.parse (localStorage.getItem("favoritas")) || []

        
        // Muestra Total
        crearArticulo(peliculas, $divContenedor, favoritasLocal)

        // Crear Opciones Select
        crearOpciones(peliculas, $filtroGenero)

        // Eventos Filtro
        $cajaIngreso.addEventListener("input", () => {
            const peliculasFiltradasPorNombre = filtrarPeliculasPorNombre(peliculas, $cajaIngreso.value)
            const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculasFiltradasPorNombre, $filtroGenero)
            if (peliculasFiltradasPorGenero.length != 0) {
                crearArticulo(peliculasFiltradasPorGenero, $divContenedor, favoritasLocal)
            } else {
                $divContenedor.innerHTML = `<p class=" font-[raleway] text-[#FFFFFF]">>> no matching results <<</p>`
            }
        })
        
        
        $filtroGenero.addEventListener('change', () => {
            const peliculasFiltradasPorNombre = filtrarPeliculasPorNombre(peliculas, $cajaIngreso.value)
            const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculasFiltradasPorNombre, $filtroGenero)
            if (peliculasFiltradasPorGenero.length != 0) {
                crearArticulo(peliculasFiltradasPorGenero, $divContenedor, favoritasLocal)
            } else {
                $divContenedor.innerHTML = `<p class="font-[raleway] text-[#FFFFFF]">>> no matching results <<</p>`
            }
        })

        $botonClear.addEventListener("click", (e) => {
            e.preventDefault()
            limpiarBusqueda($formularioBusqueda, peliculas, $divContenedor, favoritasLocal)
        })

        $divContenedor.addEventListener("click", (e) => {
            if (e.target.id != "") {
                let bandera = false
                favoritasLocal.forEach((pelicula) => {
                    if (favoritasLocal.length != 0 && pelicula.id == e.target.id){
                        favoritasLocal = favoritasLocal.filter(pelicula => pelicula.id != e.target.id)
                        e.target.attributes.src.nodeValue = "./resources/favFalse.png"
                        bandera = true
                    }})
                if (bandera == false) {
                    const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id == e.target.id)
                    peliculaSeleccionada.favorito = true
                    e.target.attributes.src.nodeValue = "./resources/favTrue.png"
                    favoritasLocal.push(peliculaSeleccionada)
                }

                localStorage.setItem("favoritas", JSON.stringify(favoritasLocal))
            }
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
