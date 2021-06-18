const listaloggedout = document.querySelectorAll('.logged-out');
 const listaloggedin = document.querySelectorAll('.logged-in');
 const cuentaData = document.querySelector('.cuentaData');
 
 const configuraMenu = (user) => {
     if(user){
        db.collection('usuarios').doc(user.uid).get().then( doc =>{
            const html = `
                <p>Nombre: ${ doc.data().nombre }</p>
                <p>Correo: ${ user.email}</p>
                <p>Teléfono: ${ doc.data().telefono }</p>
                <p>Dirección: ${ doc.data().direccion }</p>
            `;
            cuentaData.innerHTML = html;
        });

        listaloggedin.forEach( item => item.style.display = 'block');
        listaloggedout.forEach( item => item.style.display = 'none');
     } else {
        cuentaData.innerHTML = '';
        listaloggedin.forEach( item => item.style.display = 'none');
        listaloggedout.forEach( item => item.style.display = 'block');
     }
 }

var initCoords = {
    lat: 21.0043296,
    lng: -98.6755844
};

var properties = {
    center: initCoords,
    zoom: 5
};


function iniciaMapa(){

    fetch('api.json')
    .then( function(response){
        response.json().then(function(data){
            const map = new google.maps.Map(document.getElementById('mapa'), properties);

            data.forEach(marcador => {
                var informacion = "<strong>NOMBRE: </strong>" + marcador.Nombre;

                var infoWindow = new google.maps.InfoWindow({
                    content: informacion
                });

                if(marcador.Nombre == marcador.PlaceName){
                    let marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(marcador.Latitude, marcador.Longitude),
                        title: marcador.PlaceName
                    })

                    marker.addListener('click', function(){
                        infoWindow.open(map, marker);
                    })
                }
        });
    })
    .catch( function(error){
        console.log('Ocurrió un error', error);
    })
    }
)}