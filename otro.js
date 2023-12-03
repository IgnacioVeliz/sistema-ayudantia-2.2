const cosa = () => {
    ocultarTodos();
    document.getElementById('formularioRegistro').style.display = 'block';
    const table = document.getElementById('tabla-viajes');
    
    const newTbody = document.createElement('TBODY');

    const oldTbody = table.getElementsByTagName('tbody')[0];
    if (oldTbody) {
        table.replaceChild(newTbody, oldTbody);
    } else {
        table.appendChild(newTbody);
    }

    fetch(`http://localhost:5500/vuelo`)
        .then(response => response.json())
        .then(datosJs => {
            console.log('hola mundo', datosJs);

            datosJs.forEach(viaje => {
                const tr = document.createElement('TR');
                
                // Crear celdas para cada propiedad del viaje
                const tdIdVuelo = document.createElement('TD');
                tdIdVuelo.appendChild(document.createTextNode(viaje.id_vuelo));
                tr.appendChild(tdIdVuelo);

                const tdFechaHoraPartida = document.createElement('TD');
                tdFechaHoraPartida.appendChild(document.createTextNode(new Date(viaje.fecha_hora_partida).toLocaleString()));
                tr.appendChild(tdFechaHoraPartida);

                const tdFechaHoraLlegada = document.createElement('TD');
                tdFechaHoraLlegada.appendChild(document.createTextNode(new Date(viaje.fecha_hora_llegada).toLocaleString()));
                tr.appendChild(tdFechaHoraLlegada);

                const tdCiudadOrigen = document.createElement('TD');
                tdCiudadOrigen.appendChild(document.createTextNode(viaje.ciudad_origen));
                tr.appendChild(tdCiudadOrigen);

                const tdCiudadDestino = document.createElement('TD');
                tdCiudadDestino.appendChild(document.createTextNode(viaje.ciudad_destino));
                tr.appendChild(tdCiudadDestino);
                
                const tdAeropuertoOrigen = document.createElement('TD');
                tdAeropuertoOrigen.appendChild(document.createTextNode(viaje.aeropuerto_origen));
                tr.appendChild(tdAeropuertoOrigen);

                const tdAeropuertoDestino = document.createElement('TD');
                tdAeropuertoDestino.appendChild(document.createTextNode(viaje.aeropuerto_destino));
                tr.appendChild(tdAeropuertoDestino);

                const tdPaisOrigen = document.createElement('TD');
                tdPaisOrigen.appendChild(document.createTextNode(viaje.pais_origen));
                tr.appendChild(tdPaisOrigen);

                const tdPaisDestino = document.createElement('TD');
                tdPaisDestino.appendChild(document.createTextNode(viaje.pais_destino));
                tr.appendChild(tdPaisDestino);

                // Agregar la fila al nuevo tbody
                newTbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
};

function Formulario() {
    ocultarTodos();
    document.getElementById('Formulario').style.display = 'block';
}

function mostrarModificacion() {
    ocultarTodos();
    document.getElementById('modificacionDatos').style.display = 'block';
}

function mostrarEliminacion() {
    ocultarTodos();
    document.getElementById('eliminacionRegistros').style.display = 'block';
}

function ocultarTodos() {
    document.getElementById('formularioRegistro').style.display = 'none';
    document.getElementById('Formulario').style.display = 'none';
    document.getElementById('modificacionDatos').style.display = 'none';
    document.getElementById('eliminacionRegistros').style.display = 'none';
}
//########################### INTENTO MODIFICAR DATOS ##########################################
