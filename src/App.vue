<template>
	<body class="bg-[#080808] w-screen h-screen overflow-y-auto pt-28 pb-12">
		<header
			class="fixed inset-0 h-16 mb-12 px-20 bg-[#121318] flex items-center"
		>
			<img
				src="https://dacxi.com/assets/icons/logo.png"
				alt=""
				class="h-[60%]"
			/>
		</header>
		<main
			class="w-[90%] h-full mx-auto rounded-xl bg-[#121318] flex justify-center"
			:class="!firstFetchingResources ? 'items-center' : 'items-start'"
		>
			<svg
				v-if="!firstFetchingResources"
				aria-hidden="true"
				class="mr-2 w-8 h-8 text-white animate-spin dark:text-gray-600 fill-[#0070E4]"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<section v-else class="w-full px-10 py-5">
				<filters-bar v-model="date" class="h-20 w-full" />
				<coin-table
					@sort-by="setSortBy"
					:is-geting-price-in-selected-date="isGetingPriceInSelectedDate"
					class="w-full h-auto text-white"
				/>
			</section>
		</main>
	</body>
</template>

<script setup>
	import axios from 'axios';

	const baseURL = `${import.meta.env.VITE_BASE_API_URL}/coins/`;

	const firstFetchingResources = ref(false);

	const sortBy = ref('id');

	const date = ref('');

	const coinsToGetById = [
		'bitcoin',
		'ethereum',
		'dacxi',
		'cosmos',
		'terra-luna-2'
	];

	const setSortBy = newValue => (sortBy.value = newValue);

	const {
		isLoading,
		state: coins,
		execute
	} = useAsyncState(
		async () => {
			let coinsResponse = [];

			for (let i = 0; i < coinsToGetById.length; i++) {
				const coinId = coinsToGetById[i];

				const currentBaseURL = `${
					import.meta.env.VITE_BASE_API_URL
				}/coins/${coinId}`;

				const { data } = await axios.get(currentBaseURL);

				coinsResponse = [data, ...coinsResponse];
			}

			return coinsResponse;
		},
		{},
		{ immediate: true, resetOnExecute: false }
	);

	const filteredCoins = computed(() => {
		const orderFilter = {
			name: (a, b) => a.name.localeCompare(b.name),
			id: (a, b) => a.coingecko_rank - b.coingecko_rank,
			currentPrice: (a, b) =>
				b.market_data.current_price.brl - a.market_data.current_price.brl,
			highestPrice: (a, b) =>
				b.market_data.high_24h.brl - a.market_data.high_24h.brl,
			lowestPrice: (a, b) =>
				a.market_data.low_24h.brl - b.market_data.low_24h.brl
		};

		if (!filteredCoins.value) {
			return Object.values(coins.value).sort(orderFilter[sortBy.value]);
		}

		filteredCoins.value.forEach(coin => {
			const indexOfCurrentCoinInDiffObject = coins.value
				.map(e => e.id)
				.indexOf(coin.id);

			const diffedCoinsArray = Object.values(coins.value);

			coin.market_data =
				diffedCoinsArray[indexOfCurrentCoinInDiffObject].market_data;
		});

		return filteredCoins.value.sort(orderFilter[sortBy.value]);
	});

	const { execute: getPriceInHours } = useAsyncState(
		async () => {
			filteredCoins.value.forEach(async coin => {
				const queryString = new URLSearchParams({ date: date.value });

				const currentBaseURL = `${import.meta.env.VITE_BASE_API_URL}/coins/${
					coin.id
				}/history?${queryString}`;

				const { data } = await axios.get(currentBaseURL);

				coin.market_data_in_selected_date = data.market_data;
			});
		},
		{},
		{
			immediate: false
		}
	);

	watch([isLoading, coins], ([loadingChange], [coinsChange]) => {
		if (loadingChange) firstFetchingResources.value = true;

		if (coinsChange) {
			setTimeout(() => execute(), 5000);
		}
	});

	watch(date, () => getPriceInHours());

	provide('coins', filteredCoins);
</script>
