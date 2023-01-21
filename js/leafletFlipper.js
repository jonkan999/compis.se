import { leafletFlipperPDF } from "/js/leafletFlipperPDF.js";
import { leafletFlipperPNG } from "/js/leafletFlipperPNG.js";

export function leafletFlipper(description) {
	console.log(description);
	//If hemköp do pdf flipper
	if (description.slice(0, 6) === "Hemköp") {
		leafletFlipperPDF(description);
	}

	if (description.slice(0, 5) === "kista") {
		leafletFlipperPNG(description);
	}
}
