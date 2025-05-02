<template>
  <!-- Отображение товара -->
  <div v-if="product !== false" class="mb-4">
    <div class="flex justify-between items-start">
      <!-- Информация о товаре -->
      <div class="flex items-center gap-3">
        <img
            :src="product.image || '/assets/img/no-image.jpg'"
            alt="product image"
            class="w-10 h-10 rounded object-cover"
            @error="onImgError"
        />
        <b class="text-gray-800 text-sm leading-snug">
          {{ product.name_product || product.name }}
        </b>
      </div>

      <!-- Цена -->
      <span class="text-sm text-gray-700 whitespace-nowrap">
        <small v-if="product.amount > 1" class="text-xs mr-1 text-gray-500">
          {{ product.amount }}x
        </small>
        {{ product.price_product || product.price }} руб.
      </span>
    </div>

    <!-- Модификаторы -->
    <div
        v-if="product.modifiers && product.modifiers.length"
        class="mt-2 ml-12 text-sm text-gray-600 space-y-0.5"
    >
      <b class="block font-medium text-gray-700">Добавки:</b>
      <span
          v-for="modifier in product.modifiers"
          :key="modifier.id"
          class="block"
      >
        {{ modifier.name_options || modifier.name }}
      </span>
    </div>
  </div>

  <!-- Скелетон -->
  <div v-else class="mb-4 space-y-2">
    <div class="flex justify-between items-center">
      <ion-skeleton-text animated style="width:9em" />
      <ion-skeleton-text animated style="width:5em" />
    </div>
    <div class="ml-12 space-y-1">
      <ion-skeleton-text animated style="width:7em" />
      <ion-skeleton-text animated style="width:4em" />
      <ion-skeleton-text animated style="width:4em" />
    </div>
  </div>
</template>

<script>
import { IonSkeletonText } from '@ionic/vue';

export default {
  props: ['product'],
  components: {
    IonSkeletonText,
  },
  methods: {
    onImgError(event) {
      event.target.src = '/assets/img/no-image.jpg';
    },
  },
};
</script>
