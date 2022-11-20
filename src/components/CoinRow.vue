<template>
	<tr>
		<td class="px-5 text-center">
			{{ geckoRanking }}
		</td>
		<td class="flex items-center gap-1.5 md:gap-4">
			<img :src="imageUrl" class="w-6" :alt="`Logo ${name}`" />
			{{ name }}
			<span
				class="bg-[#080808] px-2 py-1 rounded-md text-[9px] text-blue-600 font-semibold leading-none"
				>{{ symbol.toUpperCase() }}</span
			>
		</td>
		<td class="font-medium">R$ {{ getFormattedPrice(currentPrice) }}</td>
		<td class="font-normal text-green-500">
			RS {{ getFormattedPrice(highestPrice) }}
		</td>
		<td class="font-normal text-red-500">
			RS {{ getFormattedPrice(lowestPrice) }}
		</td>
		<td class="text-center">
			<span v-if="!priceInSelectedDate"> - </span>
			<span v-else> R$ {{ getFormattedPrice(priceInSelectedDate) }} </span>
		</td>
	</tr>
</template>

<script setup>
	defineProps({
		geckoRanking: {
			type: Number,
			default: 0
		},
		name: {
			type: String,
			default: ''
		},
		imageUrl: {
			type: String,
			default: ''
		},
		symbol: {
			type: String,
			default: ''
		},
		currentPrice: {
			type: Number,
			default: 0
		},
		highestPrice: {
			type: Number,
			default: 0
		},
		lowestPrice: {
			type: Number,
			default: 0
		},
		priceInSelectedDate: {
			type: Number,
			default: 0
		}
	});

	const getFormattedPrice = price =>
		new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(price);
</script>
