<template>
	<table class="h-full flex md:inline-table overflow-y-scroll md:overflow-auto">
		<thead
			class="text-xs text-gray-400 font-light md:border-y-[0.5px] border-white border-opacity-10"
		>
			<tr class="flex flex-col justify-between md:table-row w-full">
				<td class="px-2 md:px-5" @click="filterBy('id')">#<span>&#9650</span></td>
				<td
					@click="filterBy('name')"
					class="pl-2 md:pl-10 text-center md:text-start"
				>
					Nome <span>&#9650</span>
				</td>
				<td @click="filterBy('currentPrice')">Preço atual<span>&#9650</span></td>
				<td @click="filterBy('highestPrice')">24h Maior<span>&#9650</span></td>
				<td @click="filterBy('lowestPrice')">24h Menor<span>&#9650</span></td>
				<td @click="filterBy('lowestPrice')" class="flex">
					Preço em horário selecionado
					<span>&#9650</span>
				</td>
			</tr>
		</thead>
		<tbody class="flex md:table-row-group">
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
				:price-in-selected-date="
					coin.market_data_in_selected_date?.current_price.brl
				"
				class="flex flex-col md:table-row bg-white bg-opacity-0 hover:bg-opacity-10 font-light"
			/>
		</tbody>
	</table>
</template>

<script setup>
	const emit = defineEmits(['sortBy']);

	const coins = inject('coins');

	const filterBy = value => emit('sortBy', value);
</script>

<style lang="postcss">
	td {
		@apply h-11;
	}
	thead > tr > td {
		@apply min-w-[90px] px-2 py-8 md:p-0 border-l-[0.5px] border-y-[0.5px] border-white border-opacity-10 md:border-none flex items-center justify-start md:table-cell leading-none text-start md:text-center cursor-pointer;
	}

	tbody > tr > td {
		@apply min-w-[170px] py-8 md:p-0 border-[0.5px] border-white border-opacity-10 md:border-none leading-3 flex items-center justify-center md:table-cell text-sm text-center cursor-default;
	}
</style>
