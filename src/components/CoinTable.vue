<template>
	<table>
		<thead
			class="text-xs text-gray-400 font-light border-y-[0.5px] border-white border-opacity-10"
		>
			<tr>
				<td class="px-5 text-center" @click="filterBy('id')"># &#9650</td>
				<td @click="filterBy('name')" class="pl-10 text-start">Nome &#9650</td>
				<td @click="filterBy('currentPrice')">Preço atual &#9650</td>
				<td @click="filterBy('highestPrice')">24h Maior &#9650</td>
				<td @click="filterBy('lowestPrice')">24h Menor &#9650</td>
				<td @click="filterBy('lowestPrice')">Preço em horário selecionado &#9650</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			<coin-row 
                v-for="coin in coins" 
                :key="`: ${coin.id}`" 
                :name="coin.name"
                :gecko-ranking="coin.coingecko_rank" 
                :image-url="coin.image.large" 
                :symbol="coin.symbol" 
                :current-price="coin.market_data.current_price.brl" 
                :highest-price="coin.market_data.high_24h.brl" 
                :lowest-price="coin.market_data.low_24h.brl"
				:price-in-selected-date="coin.market_data_in_selected_date?.current_price.brl"
                class="bg-white bg-opacity-0 hover:bg-opacity-10 font-light"
            />
		</tbody>
	</table>
</template>

<script setup>
    const emit = defineEmits(['sortBy'])

	const coins = inject('coins');

    const filterBy = value => emit('sortBy', value)
</script>

<style lang="postcss">
td {
    @apply h-11
}
	thead > tr > td {
		@apply  leading-none text-center cursor-pointer;
	}

	tbody > tr > td {
		@apply  leading-3 text-sm text-center cursor-default;
	}
</style>
