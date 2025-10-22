<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-5">
    <div
      class="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-200 transition-all duration-500 ease-in-out"
      :class="invoiceData ? 'w-96' : 'w-80'">
      <div v-if="!invoiceData" class="animate-fade-in">
        <div class="flex flex-col items-center space-y-2 mb-6">
          <figure class="w-24 bg-green-main/20 p-3 rounded-full">
            <img src="/first-place.webp" alt="">
          </figure>
          <p class="text-lg font-semibold text-gray-700">{{ winner?.seller?.name }} - {{ winner?.points }}pts</p>
          <p class="text-sm text-green-dark/70 font-semibold">
            Fue el vendedor que más te gustó y obtuvo el mejor resultado.
          </p>
        </div>
        <button @click="onFacturar" :disabled="loading"
          class="w-full bg-green-focus hover:scale-105 cursor-pointer text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Facturando...' : 'Facturar' }}
        </button>
      </div>
      <div v-else class="animate-fade-in">
        <div class="flex flex-col items-center space-y-3 mb-6">
          <figure class="size-16 bg-green-100 p-3 rounded-full grid place-content-center">
            <ion-icon name="checkmark-circle" class="text-4xl text-green-600"></ion-icon>
          </figure>
          <h2 class="sm:text-xl text-lg font-bold text-gray-800">¡Factura Generada!</h2>
          <div class="w-full space-y-3 text-left">
            <div class="grid grid-cols-2 gap-2 text-sm px-3">
              <div>
                <p class="text-gray-500 font-medium">N° Factura:</p>
                <p class="text-gray-800 font-semibold">{{ invoiceData.numberTemplate?.formattedNumber }}</p>
              </div>
              <div>
                <p class="text-gray-500 font-medium">Estado:</p>
                <p class="text-gray-800 font-semibold capitalize">{{ invoiceData.status }}</p>
              </div>
            </div>
            <div class="flex justify-center my-3">
              <hr class="w-12/13 text-green-dark/50">
            </div>
            <div class="text-sm px-3">
              <p class="text-gray-500 mb-1">Cliente:</p>
              <p class="text-gray-800 font-semibold">{{ invoiceData.client?.name }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm px-3">
              <div>
                <p class="text-gray-500">Fecha:</p>
                <p class="text-gray-800">{{ formatDate(invoiceData.date) }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500">Vence:</p>
                <p class="text-gray-800">{{ formatDate(invoiceData.dueDate) }}</p>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2 text-sm">
                <p class="text-gray-500">Producto:</p>
                <p class="text-gray-800 font-semibold">{{ invoiceData.items[0]?.name }}</p>
              </div>
              <div class="flex justify-between items-center text-sm">
                <p class="text-gray-500">Cantidad:</p>
                <p class="text-gray-800">{{ invoiceData.items[0]?.quantity }} unidades</p>
              </div>
            </div>
            <div class="bg-green-50 rounded-lg p-3 border border-green-200">
              <div class="flex justify-between items-center">
                <p class="text-green-800 font-bold">Total:</p>
                <p class="text-green-800 font-bold text-lg">${{ invoiceData.total }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="reset"
            class="flex-1 bg-green-main hover:scale-105 cursor-pointer text-white font-medium py-2.5 rounded-lg transition">
            Cerrar y reiniciar juego
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createInvoice } from '@/services/alegra/alegra.service';
import { InvoiceError } from '@/services/alegra/handle-errors';
import { useCounterStore } from '@/stores/counter';
import { InvoiceResponse } from '@/types/invoice';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const store = useCounterStore();
const showModal = ref(false);
const loading = ref(false);
const invoiceData = ref<InvoiceResponse | null>(null);
const { winner, totalPoints } = storeToRefs(store);

const reset = () => {
  store.reset();
  showModal.value = false;
  invoiceData.value = null;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES');
};

async function onFacturar () {
  try {
    loading.value = true;
    const response: unknown = await createInvoice({
      quantity: totalPoints.value + 20,
      date: new Date().toISOString().split('T')[0]!.toString(),
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0]!.toString(),
    });

    invoiceData.value = response as InvoiceResponse;

  } catch (error) {
    if (error instanceof InvoiceError) {
      console.error('Error de facturación', error.message);
      alert('Error al generar factura: ' + error.message);
      return;
    }
    console.error('Error inesperado', error);
    alert('Error inesperado al generar factura');
  } finally {
    loading.value = false;
  }
}

watch(winner, async () => {
  if (!winner.value) return;
  const { default: JSConfetti } = await import('js-confetti');
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();

  setTimeout(() => {
    showModal.value = true;
  }, 1000);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
