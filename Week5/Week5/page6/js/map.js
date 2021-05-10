// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
// path to csv data
let path = "data/Mental_Health_Counseling.csv";
// global variables
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
	console.log('testing')
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lng,zl){
	map = L.map('map').setView([lat,lng], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){
    let circleOptions={
        radius: 5,
        weight: 1,
        color: 'white',
        fillColor: 'dark gray',
        fillOpacity: 1,
    }


    data.data.forEach(function(item, index){
        let marker= L.circleMarker([item.latitude, item.longitude],circleOptions)
        .on('mouseover', function(){
            this.bindPopup(`<b>${item.Name}</b><br>`).openPopup()
            .on('click',zoomIn);
        })

        markers.addLayer(marker)

        // append data item titles to the sidebar & zoom on click		
	    $(".sidebar").append(`<div class="sidebar-item"
	    onclick="flyToIndex(${index})">
	    ${item.Name}</div>`);
    })

    markers.addTo(map);

    map.fitBounds(markers.getBounds());
}