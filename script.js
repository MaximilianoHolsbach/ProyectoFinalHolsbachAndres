// SCRIPT LLAMAR A LA API, Y CARGAR PAGINA PRINCIPAL //

// BLOQUE DE VARIABLES Y CONSTANTES //

let pagina = 1
const btnAnterior = document.getElementById("btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")
const contenedor = document.getElementById("contenedor")
const aLista = document.getElementById("aLista")
const botones = document.getElementsByClassName("btn btn-success")
const header = document.getElementById("header")
const arraycontenidos = JSON.parse(localStorage.getItem('miLista'))??[]

// BLOQUE DE PAGINACION, Y EVENTOS PARA BOTONES //

btnAnterior.addEventListener('click',() =>{
	if(pagina > 1){
		pagina -= 1
		cargarContenidos()
	}
})

btnSiguiente.addEventListener('click',() =>{
	if(pagina < 1000){
		pagina += 1
		cargarContenidos()
	}
})

// BLOQUE DE LLAMADA A LA API //

const cargarContenidos = async() =>{
	try{
		const resultados = await fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=466c8b36609873d1f5365d3d45cca1bd&language=es-mx&page=${pagina}`)
		const datos = await resultados.json()
		contenedor.innerHTML = ""
		datos.results.forEach((contenido,id) => {
			contenedor.innerHTML +=`
				<div class="card border-success mb-3" id="contenido${id}" style="max-width: 20rem;margin:5px;"><!--El elemento padre-->
            		<div class="card-header"><p><b>${contenido.title}</b></p></div><!--Primer hijo-->
            		<div class="card-body"><!--Segundo hijo-->
                		<p><img src="https://image.tmdb.org/t/p/w500/${contenido.poster_path}"></p>
                		<button class="btn btn-success">AGREGAR</button>
        		</div>
    		`
		})
		datos.results.forEach((contenido,id)=>{
			const tarjetaContenido = document.getElementById(`contenido${id}`)
			tarjetaContenido.children[1].addEventListener('click',()=>{
				arraycontenidos.push(contenido)
				localStorage.setItem('miLista',JSON.stringify(arraycontenidos))// Actualizacion del localStorage con los contenidos agregados
			})

		})
		for(let i=0; i <botones.length; i++){ //Libreria para avisar al usuario que el contenido fue guardado en su lista
			botones[i].addEventListener('click',()=>{
				Toastify({
					text: "Te espera en tu videoteca",
					duration: 2000,
					destination: "https://github.com/apvarun/toastify-js",
					newWindow: true,
					close: true,
					gravity: "top", 
					position: "left", 
					stopOnFocus: true, 
					style: {
					  background: "linear-gradient(to right, #00b09b, #96c93d)",
					},
					onClick: function(){} 
				  }).showToast();
			})
		}
	}catch(error){	 
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Algo sucedio!',
			footer: '<a href="">Comunicate con el admin!</a>'
  		})
	}

}

//EVENTO PARA IR A LA PANTALLA DE LA LISTA//

aLista.addEventListener('click',()=>{
	window.location.href = 'videoteca.html'
})

// LLAMADA A LA FUNCION //

cargarContenidos()


