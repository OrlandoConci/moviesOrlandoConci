const $contenedorDetalles = document.getElementById("contenedorDetalles")

const queryParams = new URLSearchParams(location.search)
const id = queryParams.get("id")

console.log(id)

const pelicula = peliculas.find( pelicula => pelicula.id == id ) 

$contenedorDetalles.innerHTML = `
<article class="flex flex-col items-center justify-center bg-slate-600 text-white gap-3 p-2 border rounded-2xl w-full xl:w-2/3 mx-20 min-w-72 text-center" >
    <div class="flex flex-col gap-3 lg:flex-row">
        <div class="lg:w-2/4">
            <img class="w-full object-cover " src="${pelicula.image}" alt= "Una imágen ilustrativa de la película '${pelicula.title}'" >
        </div>
        <div class="flex flex-col gap-3 lg:w-2/4">
            <h2 class="font-bold text-2xl">${pelicula.title}</h2>
            <h3 class="italic">${pelicula.tagline}</h3>
            <p class="">${pelicula.overview}</p>
        </div>
    </div>

    <div class="flex flex-col gap-3 w-full md:flex-row ">
        <div class=" w-full">
            <table class="border-2 border-collapse w-full">
                <tbody>
                    <tr>
                        <td class="border-2 p-5">original language</td>
                        <td class="border-2">${pelicula.original_language}</td>
                    </tr>
                    <tr>
                        <td class="border-2 p-5">release date</td>
                        <td class="border-2">${pelicula.release_date}</td>
                    </tr>
                    <tr>
                        <td class="border-2 p-5">runtime</td>
                        <td class="border-2">${pelicula.runtime}</td>
                    </tr>
                    <tr>
                        <td class="border-2 p-5">status</td>
                        <td class="border-2">${pelicula.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="w-full">
            <table class="w-full">
                <tbody>
                    <tr>
                        <td class="border-2 p-5">vote average</td>
                        <td class="border-2">${pelicula.vote_average}</td>
                    </tr>
                    <tr>
                        <td class="border-2 p-5">budget</td>
                        <td class="border-2">${pelicula.budget}</td>
                    </tr>
                    <tr>
                        <td class="border-2 p-5">revenue</td>
                        <td class="border-2">${pelicula.revenue}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</article>
`