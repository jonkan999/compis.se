import { leafletFlipper } from "/js/leafletFlipper.js";

mapboxgl.accessToken =
	"pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg";
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	center: [17.964878374999998, 59.285973625],
	zoom: 12,
});

fetch("python/hk_pdf_URL_list.json")
	.then((response) => response.json())
	.then((pdf_list) => {
		console.log(pdf_list);
		for (var i = 0; i < pdf_list.length; i++) {
			const el = document.createElement("div");
			el.className = "HK-marker";
			el.id = pdf_list[i].description;
			var marker = new mapboxgl.Marker(el) /* 
				.setHTML("<img src='img/HKicon.png'/>") */
				.setLngLat(pdf_list[i].lnglat_cord)
				.setPopup(
					new mapboxgl.Popup({ offset: [200, 0] }) // add popups
						.setHTML(
							`
              <div id="pdf-viewer">""</div>
      
              <button id="prev-page">Previous</button>
              <button id="next-page">Next</button>`
						)
				)
				.addTo(map);

			marker.getPopup().on("open", function () {
				leafletFlipper(el.id);
			});
		}
	})
	.catch((error) => console.log(error));

// Load the pdf_list from the pickle file
/* var pdf_list;
var xhr = new XMLHttpRequest();
xhr.open("GET", "python/hk_pdf_URL_list.pkl", true);
xhr.responseType = "arraybuffer";
xhr.onload = function (e) {
	var uInt8Array = new Uint8Array(this.response);
	var db = new Papa.parse(uInt8Array);
	pdf_list = JSON.parse(db.exec("SELECT * from json")[0].values[0][0]);
	// Add the custom icon to the map at the geolocation specified by the geo_cord
	for (var i = 0; i < pdf_list.length; i++) {
		var marker = new mapboxgl.Marker({
			color: "#ff0000",
		})
			.setLngLat(pdf_list[i].geo_cord)
			.setPopup(
				new mapboxgl.Popup({ offset: 25 }) // add popups
					.setHTML(
						"<h3>" +
							pdf_list[i].description +
							"</h3><p>" +
							pdf_list[i].url +
							"</p>"
					)
			)
			.addTo(map);
	}
};
xhr.send(); */
pdfjsLib.GlobalWorkerOptions.workerSrc =
	"https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/build/pdf.worker.min.js";
