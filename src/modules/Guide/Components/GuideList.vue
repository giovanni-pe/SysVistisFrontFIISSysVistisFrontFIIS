<template>
  <div>
    <div class="grid-cards">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="card-unas cursor-pointer hover-lift transition"
        @click="store.select(item.id); store.showEdit = true"
        tabindex="0"
        role="button"
        :aria-label="`Editar guía de ${item.fullName}`"
      >
        <div class="font-semibold text-institutional mb-1 truncate flex items-center gap-2">
          <Icon icon="mdi:account-box-outline" width="20" class="text-institutional" aria-hidden="true" />
          {{ item.fullName }}
        </div>
        <div class="text-muted text-xs flex items-center gap-1">
          <Icon icon="mdi:email-outline" width="16" aria-hidden="true" />
          {{ item.email }}
        </div>
        <div class="text-muted text-xs flex items-center gap-1">
          <Icon icon="mdi:phone-outline" width="16" aria-hidden="true" />
          {{ item.phone }}
        </div>
        <div class="flex gap-2 mt-3">
          <button
            class="btn-primary-unas flex items-center gap-1 btn-xs"
            @click.stop="store.select(item.id); store.showEdit = true"
            type="button"
            aria-label="Editar"
          >
            <Icon icon="mdi:pencil" width="16" aria-hidden="true" />
            Editar
          </button>
          <button
            class="btn-danger-unas flex items-center gap-1 btn-xs"
            @click.stop="store.remove(item.id)"
            type="button"
            aria-label="Eliminar"
          >
            <Icon icon="mdi:delete-outline" width="16" aria-hidden="true" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
    <!-- Paginación -->
    <div class="mt-6 flex-center gap-4">
      <button
        :disabled="store.page === 1"
        @click="store.page--; store.fetchAll()"
        class="btn-secondary-unas btn-sm"
        type="button"
        aria-label="Anterior"
      >
        <Icon icon="mdi:chevron-left" width="18" aria-hidden="true" /> Anterior
      </button>
      <span class="text-muted text-sm">Página {{ store.page }}</span>
      <button
        :disabled="store.items.length < store.pageSize"
        @click="store.page++; store.fetchAll()"
        class="btn-secondary-unas btn-sm"
        type="button"
        aria-label="Siguiente"
      >
        Siguiente <Icon icon="mdi:chevron-right" width="18" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGuideStore } from '../Store/guideStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useGuideStore();
    return { store };
  }
});
</script>
