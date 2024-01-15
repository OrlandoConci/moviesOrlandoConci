export function agregaContenido(objeto) {
    let articulo = `<article class="flex flex-col items-center justify-between bg-slate-600 text-white gap-3 p-1 border rounded-2xl w-1/6 min-w-72 text-center max-h-[500px]">
    <img class="w-72 h-52 object-contain" src="https://moviestack.onrender.com/static/${objeto.image}" alt= "Una imágen ilustrativa de la película '${objeto.title}'" >
    <h2 class="font-bold">${objeto.title}</h2>
    <h3 class="underline italic">${objeto.tagline}</h3>
    <p class="h-[200px] overflow-y-auto">${objeto.overview}</p>
    <a class="underline text-red-200" href="./detallePelicula.html?id=${objeto.id}"> More details </a>
    </article>`
    return articulo
}

export function crearArticulo(peliculas, elemento) {
    let fragment = ""
    peliculas.forEach(pelicula => {
        fragment += agregaContenido(pelicula)
    })
    elemento.innerHTML = fragment
}

// Crear opciones Select

export function obtenerGeneros(Peliculas) {
    let generos = Peliculas
        .map(pelicula => pelicula.genres)
        .flat()
        .filter((genres, indice, array) => array.indexOf(genres) == indice)
    return generos
}

export function crearSelect(genres) {
    return ` <option value="${genres}">${genres}</option>`
} 

export function crearOpciones(peliculas, filtroGenero) {
    const generos = obtenerGeneros(peliculas)
    filtroGenero.innerHTML += generos.reduce((templateAcumulado, generos) => templateAcumulado += crearSelect(generos), "")
}

// Filtros

export function filtrarPeliculasPorNombre(peliculas, nombreIngresado) {
    return peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(nombreIngresado.toLowerCase()))
}

export function filtrarPeliculasPorGenero(peliculasFiltradasPorNombre, filtroGenero) {
    const seleccionado = filtroGenero.options[filtroGenero.selectedIndex].value
    if (seleccionado == "Genre") {
        return peliculasFiltradasPorNombre
    }
    return peliculasFiltradasPorNombre.filter(pelicula => pelicula.genres.includes(seleccionado))
}

// Limpiar búsqueda

export function limpiarBusqueda(formularioBusqueda, peliculas, divContenedor) {
    formularioBusqueda.reset()
    crearArticulo(peliculas, divContenedor)
}

// Fin
