// Instancia de inicio de VUE
var myVueApp = new Vue({
	el: "#salesPage",
	data: {
		exchangeRate: 0,
		years: [],
		selectedYear: "",
		brands: [],
		selectedBrand: "",
		models: [],
		selectedModel: "",
		cars: [],
		selectedCurrency: "USD",
		selectedStatus: null,
	},
	methods: {
		getModel: function () {
			var url =
				"https://ha-front-api-proyecto-final.vercel.app/models?brand=" +
				myVueApp.selectedBrand;
			fetch(url)
				.then(function (data) {
					return data.json();
				})
				.then(function (getModel) {
					myVueApp.models = getModel;
				});
		},
		filterCars: getFilterCars,
	},
	filters: {
		formatPrice: function (value) {
			return value.toLocaleString("es-UY");
		},
	},
});
//
// Funcion para obtener tipo de cambio
function searchExchangeRate() {
	fetch("https://ha-front-api-proyecto-final.vercel.app/rates")
		.then(function (data) {
			return data.json();
		})
		.then(function (getRate) {
			myVueApp.exchangeRate = getRate.uyu;
		});
}
// Loop para obtener años del <option = year>
function yearsLoop() {
	var currentYear = new Date().getFullYear();
	for (var i = currentYear; i >= 1900; i--) {
		myVueApp.years.push(i);
	}
}
// Buscar marcas
function brandsSearch() {
	fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
		.then(function (data) {
			return data.json();
		})
		.then(function (getBrands) {
			myVueApp.brands = getBrands;
		});
}
// Busca los autos
function getCars() {
	fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
		.then(function (data) {
			return data.json();
		})
		.then(function (getCars) {
			myVueApp.cars = getCars;
		});
}
function getRatings() {
	fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
		.then(function (data) {
			return data.json();
		})
		.then(function (ratings) {
			myVueApp.rating = ratings;
		});
}

function getFilterCars() {
	var url =
		"https://ha-front-api-proyecto-final.vercel.app/cars?year=" +
		myVueApp.selectedYear +
		"&brand=" +
		myVueApp.selectedBrand +
		"&model=" +
		myVueApp.selectedModel +
		"&status=" +
		myVueApp.selectedStatus;

	console.log(url);
	fetch(url)
		.then(function (data) {
			return data.json();
		})
		.then(function (filteredCars) {
			myVueApp.cars = filteredCars;
		});
}

document.querySelector("#change").addEventListener("click", function () {
	if (myVueApp.selectedCurrency === "UYU") {
		myVueApp.selectedCurrency = "USD";
	} else {
		myVueApp.selectedCurrency = "UYU";
	}
});

// function getModel() {
//   var url =
//     "https://ha-front-api-proyecto-final.vercel.app/models?brand=" +
//     myVueApp.selectedBrand;
//   fetch(url)
//     .then(function (data) {
//       return data.json();
//     })
//     .then(function (getModel) {
//       myVueApp.models = getModel;
//     });
// }
// utilizando el atributo v-on:change podemos evitar el addEventListener
// document.querySelector("#marcaSelect").addEventListener("change", getModel);

///ejecucion
yearsLoop();
searchExchangeRate();
brandsSearch();
getCars();
