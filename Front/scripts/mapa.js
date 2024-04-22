var locationMap = L.map('locations-map').setView([43.316893, -1.980888], 10);//Mapa para escoger localizacion
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(locationMap);
 
var routesMap = L.map('rutas-bloqueadas').setView([43.316893, -1.980888], 7);//Mapa para mostrar ruta de manifestacion
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(routesMap);
