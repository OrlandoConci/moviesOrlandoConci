import {crearArticulo} from './module/funciones.js'
const $contenedorFavoritos = document.getElementById("contenedorFavoritos")

let favoritasLocal = JSON.parse (localStorage.getItem("favoritas")) || []
crearArticulo(favoritasLocal, $contenedorFavoritos, favoritasLocal)

$contenedorFavoritos.addEventListener("click", (e) => {
    if (e.target.id != "") {
        favoritasLocal = favoritasLocal.filter(pelicula => pelicula.id != e.target.id)
        localStorage.setItem("favoritas", JSON.stringify(favoritasLocal))
        crearArticulo(favoritasLocal, $contenedorFavoritos, favoritasLocal)
    }
})