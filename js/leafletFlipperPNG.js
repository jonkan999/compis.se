export function leafletFlipperPNG(description) {
	pdfjsLib.GlobalWorkerOptions.workerSrc =
		"https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/build/pdf.worker.min.js";

	// Get the container for the PDF viewer
	let pdfViewer = document.getElementById("pdf-viewer");

	// Get the buttons for navigating through the pages
	let prevPage = document.getElementById("prev-page");
	let nextPage = document.getElementById("next-page");

	let currentPage = 1;
	let maxPage = 1;

	// Asynchronously downloads PNG
	let img = new Image();
	img.src = `python/${description}.png`;
	img.className = "leaflet-image";
	img.onload = function () {
		maxPage = 1;
		//If previous not hidden, toggle previous
		if (!prevPage.classList[1]) {
			prevPage.classList.toggle("inactive");
		}
		//If next hidden, toggle next
		if (!nextPage.classList[1]) {
			nextPage.classList.toggle("inactive");
		}
		console.log("base" + currentPage);
		pdfViewer.firstChild.replaceWith(img);
	};
}
