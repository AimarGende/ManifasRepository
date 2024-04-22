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

var routesMap = L.map('rutas-bloqueadas').setView([43.316893, -1.980888], 7);//Mapa para mostrar ruta de manifestacion
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(routesMap);

function toggleInfo(info) {
    let infoContainer = document.getElementById('info-container');
    infoContainer.classList.toggle('hidden');
    let buscadorContainer = document.getElementById('buscador-container');
    buscadorContainer.classList.toggle('hidden');
    let map = document.getElementById('locations-map');
    map.classList.toggle('hidden');
    changeInfo(info);
}

function changeInfo(info) {
    console.log(info)
}