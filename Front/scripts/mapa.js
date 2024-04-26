var locationMap = L.map('locations-map', {
    center: [43.316893, -1.980888],
    zoom: 10,
});//Mapa para escoger localizacion
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(locationMap);

let marker = L.marker([43.316893, -1.980888]).addTo(locationMap);
marker._icon.classList.add('marcador')
marker.on('click', () => {
    toggleInfo('info');
});

let routesMap;

function toggleInfo(info) {
    let infoContainer = document.getElementById('info-container');
    infoContainer.classList.toggle('hidden');
    let buscadorContainer = document.getElementById('buscador-container');
    buscadorContainer.classList.toggle('hidden');
    let map = document.getElementById('locations-map');
    map.classList.toggle('hidden');
    changeInfo(info);
    /*Unica manera de cargar mapa*/
    if (routesMap) {
        console.log('existe')
    }
    
    else {
        routesMap = L.map('rutas-bloqueadas').setView([43.316893, -1.980888], 15);//Mapa para mostrar ruta de manifestacion
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(routesMap);
        L.Routing.control({
            waypoints: [
                L.latLng(43.318251, -1.979724),
                L.latLng(43.311747, -2.008162),
            ]
        }).addTo(routesMap);
        document.getElementsByClassName('leaflet-routing-container')[0].style.display = 'none'
    }
}

function changeInfo(info) {
    console.log(info)
}

//Coordenadas irun 43.337593, -1.792663