const currencyElm_1 = document.getElementById('currency-one');
const currencyElm_2 = document.getElementById('currency-two');
const amountEl_1 = document.getElementById('amount-one');
const amountEl_2 = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch excahnge rates and update the DOM

function findRate() {
	const currency_one = currencyElm_1.value;
	const currency_two = currencyElm_2.value;

	fetch(`https://prime.exchangerate-api.com/v5/fb727a51d43d980961319d46/latest/${currency_one}`)
		.then((res) => res.json())
		.then(
			(data) => {
				const rate = data.conversion_rates[currency_two];
				rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
				amountEl_2.value = (amountEl_1.value * rate).toFixed(2);
			},
			function(error) {
				console.error(error);
			}
		);
	console.log('yeah');
}
// Event Listeners

currencyElm_1.addEventListener('change', findRate);
currencyElm_2.addEventListener('change', findRate);
amountEl_1.addEventListener('input', findRate);
amountEl_2.addEventListener('input', findRate);

swap.addEventListener('click', () => {
	const temp = currencyElm_1.value;
	currencyElm_1.value = currencyElm_2.value;
	currencyElm_2.value = temp;
	findRate();
});

findRate();
