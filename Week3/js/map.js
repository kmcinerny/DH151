var map = L.map('map').setView([37.52879,-43.45779], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
		

let data = [
		{
			'title':'Croom, County Limerick, Ireland',
			'description': 'This picture is of Joe Flinn Free Range Kids summer camp, where I went as a child and worked as a teen.',
			'lat': 52.50790,
			'lon': -8.71704,
			'image': '<img src= "images/IMG_1167.JPG" class = "image" width ="250px">',
		},
		{
			'title':'7ème Arrondissement, Paris, France',
			'description': 'I stayed chez Les Gabriels the summers after my freshman and sophomore years of high school.',
			'lat': 48.85842, 
			'lon': 2.32308,
			'image': '<img src= "images/IMG_0636.JPG" class = "image" width ="150px">'
		},
		{
			'title':'Marquise, Pas-de-Calais, France',
			'description': 'I taught at an elementary/middle school pictured here and stayed chez Les Lefebvres.',
			'lat': 50.81258, 
			'lon': 1.69955,
			'image': '<img src= "images/IMG_0242.JPG" class = "image" width ="250px">'
		},
		{
			'title':'Villa Díaz Ordaz, Oaxaca, México',
			'description': 'The yearly Guelaguetza festival took place the week I stayed here with family friends.',
			'lat': 17.05405,
			'lon': -96.38129,
			'image': '<img src= "images/IMG_3278.JPG" class = "image" width ="250px">'
		},
		{
			'title':'Viñales, Pinar del Rio, Cuba',
			'description':'I stayed overnight with a nice host family, who were patient with me as I attempted to understand and speak Spanish, despite mostly having studied French.',
			'lat': 22.61900, 
			'lon': -83.70700,
			'image': '<img src= "images/IMG_5538.JPG" class = "image" width ="250px">'
		}
]	

// create feature group
let myMarkers= L.featureGroup();


// loop through data
data.forEach(function(item, index){
	let marker = L.marker([item.lat, item.lon], {clickable:true, }).addTo(map)
		.bindPopup('<center><b>'+item.title+ '</b><br>'+item.description+ '<br>'+ item.image)
		.openPopup()
		.on('click',zoomIn);

	myMarkers.addLayer(marker)

	// append data item titles to the sidebar & zoom on click		
	$(".sidebar").append(`<div class="sidebar-item"
	onclick="flyToIndex(${index})">
	${item.title}</div>`);

});

myMarkers.addTo(map)

// define layers
let layers= {
	"Homestays": myMarkers
}

// add layer control box
L.control.layers(null, layers).addTo(map)

function flyToIndex(index) {
	map.flyTo([data[index].lat, data[index].lon], 10)
	myMarkers.getLayers()[index].openPopup();

}

map.fitBounds(myMarkers.getBounds())

// zoom in when clicking popup
function zoomIn() {
	this.bindPopup(this.title).openPopup();
	map.setView([this.getLatLng().lat, this.getLatLng().lng],5);
}
