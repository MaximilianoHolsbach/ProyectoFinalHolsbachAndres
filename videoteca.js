// SCRIPT PARA PANTALLA DE PELICULAS GUARDADAS //

// BLOQUE DE CONSTANTES //
const aInicio = document.getElementById("aInicio")
const videoteca = JSON.parse(localStorage.getItem('miLista'))
const misPelis = document.getElementById("misPelis")

//Iteración para mostrar Mis Peliculas guardadas//

misPelis.innerHTML=''
videoteca.forEach((contenido,index) => {
    misPelis.innerHTML+=`
        <div class="card border-success mb-3" id="contenido${index}" style="max-width: 20rem;margin:5px;"><!--El elemento padre-->
            <div class="card-header"><p><b>${contenido.title}</b></p></div><!--Primer hijo-->
            <div class="card-body"><!--Segundo hijo-->
                <p><img src="https://image.tmdb.org/t/p/w500/${contenido.poster_path}"></p>
                <button class="btn btn-success">ELIMINAR</button>
        </div>
    `
})

//Iteración para ELIMINAR Peliculas guardadas//
videoteca.forEach((contenido,index)=>{
    const MiContenido = document.getElementById(`contenido${index}`)
    MiContenido.children[1].addEventListener('click',()=>{
        Swal.fire({//Libreria para consultar si realmente va a eliminar el contenido. 
            icon: 'warning',
            title: 'ATENCION!!!',
            showDenyButton: true,
            showCancelButton: true,
            html:`Vas a eliminar ${contenido.title} definitivamente`,
            confirmButtonText: 'Estas seguro?',
            denyButtonText: `No estoy seguro`,
          }).then((result) => {
            if (result.isConfirmed) {
                MiContenido.remove()
                videoteca.splice(index,1)
                localStorage.setItem('miLista',JSON.stringify(videoteca)) 
                Swal.fire('Contenido eliminado!')
            } else if (result.isDenied) {
                Swal.fire('Eso estuvo cerca!')
            }
          })
    })
})

//EVENTO PARA VOLVER A LA PANTALLA DE INICIO//

aInicio.addEventListener('click',()=>{
	window.location.href = 'index.html'
})
