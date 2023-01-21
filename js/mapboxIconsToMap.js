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
					new mapboxgl.Popup() // add popups
						.setHTML(
							`
              <div id="pdf-viewer">""</div>
							<div class="button-container">
								<button id="prev-page" class="prev-page">Previous</button>
								<button id="next-page" class="next-page">Next</button>
								</div>
							`
						)
				)
				.addTo(map);

			marker.getPopup().on("open", function () {
				leafletFlipper(el.id);
			});
		}
	})
	.catch((error) => console.log(error));

/* pdfjsLib.GlobalWorkerOptions.workerSrc =
	"https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/build/pdf.worker.min.js";
 */
