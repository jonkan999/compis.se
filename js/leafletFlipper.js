export function leafletFlipper(description) {
	pdfjsLib.GlobalWorkerOptions.workerSrc =
		"https://cdn.jsdelivr.net/npm/pdfjs-dist@2.4.456/build/pdf.worker.min.js";

	// Get the container for the PDF viewer
	let pdfViewer = document.getElementById("pdf-viewer");

	// Get the buttons for navigating through the pages
	let prevPage = document.getElementById("prev-page");
	let nextPage = document.getElementById("next-page");

	let currentPage = 1;

	// Asynchronously downloads PDF
	pdfjsLib.getDocument(`python/${description}.pdf`).promise.then((pdf) => {
		pdf.getPage(currentPage).then(function (page) {
			let scale = 1.5;
			let viewport = page.getViewport({ scale });

			let canvas = document.createElement("canvas");
			let context = canvas.getContext("2d");
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			pdfViewer.firstChild.replaceWith(canvas);

			let renderContext = {
				canvasContext: context,
				viewport: viewport,
			};
			page.render(renderContext);
		});
	});

	// Add event listeners for the "prev" and "next" buttons
	prevPage.addEventListener("click", function () {
		if (currentPage > 1) {
			currentPage--;
			pdfjsLib.getDocument(`python/${description}.pdf`).promise.then((pdf) => {
				pdf.getPage(currentPage).then(function (page) {
					let viewport = page.getViewport({ scale: 1.5 });

					let canvas = document.createElement("canvas");
					let context = canvas.getContext("2d");
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					// Replaces current page with the previous
					pdfViewer.firstChild.replaceWith(canvas);

					let renderContext = {
						canvasContext: context,
						viewport: viewport,
					};
					page.render(renderContext);
				});
			});
		}
	});

	nextPage.addEventListener("click", function () {
		currentPage++;

		pdfjsLib.getDocument(`python/${description}.pdf`).promise.then((pdf) => {
			pdf.getPage(currentPage).then(function (page) {
				let viewport = page.getViewport({ scale: 1.5 });

				let canvas = document.createElement("canvas");
				let context = canvas.getContext("2d");
				canvas.height = viewport.height;
				canvas.width = viewport.width;

				// Replaces current page with the previous
				pdfViewer.firstChild.replaceWith(canvas);

				let renderContext = {
					canvasContext: context,
					viewport: viewport,
				};
				page.render(renderContext);
			});
		});
	});
}
