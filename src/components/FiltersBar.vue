<template>
	<div>
		<div class="flex items-center justify-between">
			<span class="text-white text-2xl font-semibold">Mercado de cryptos</span>

			<Datepicker
				v-model="date"
				placeholder="Selecione a data e horário em que deseja ver o preço das moedas"
				class="w-[60%]"
			/>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		modelValue: {
			type: String,
			default: '',
			required: true
		}
	});

	const emit = defineEmits(['update:modelValue']);

	const date = ref(null);

	function formatDate(date) {
		const newDate = new Date(date);

		const day = (newDate.getDate() + 1).toString().padStart(2, '0');
		const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
		const year = newDate.getFullYear();

		const hours = newDate.getHours();
		const minutes = newDate.getMinutes().toString().padStart(2, '0');

		return `${day}-${month}-${year} ${hours}:${minutes}`;
	}

	watch(date, newValue => emit('update:modelValue', formatDate(newValue)));
</script>
