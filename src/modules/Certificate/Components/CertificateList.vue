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
        :aria-label="`Editar certificado #${item.id}`"
      >
        <div class="font-semibold text-institutional mb-1 flex items-center gap-2">
          <Icon icon="mdi:certificate-outline" width="18" aria-hidden="true" />
          #{{ item.id }} - Cert. {{ item.certificateCode }}
        </div>
        <div class="text-muted text-xs flex items-center gap-1">
          <Icon icon="mdi:account-outline" width="15" aria-hidden="true" />
          Persona: <span class="font-medium">{{ item.personId }}</span>
        </div>
        <div class="text-muted text-xs flex items-center gap-1">
          <Icon icon="mdi:map-marker-check-outline" width="15" aria-hidden="true" />
          Visita: <span class="font-medium">{{ item.visitId }}</span>
        </div>
        <div class="text-xs text-muted truncate mt-2 flex items-center gap-1">
          <Icon icon="mdi:note-outline" width="14" aria-hidden="true" />
          Desc: {{ item.description }}
        </div>
        <div
          class="text-xs font-semibold flex items-center gap-1 mt-1"
          :class="item.delivered ? 'text-green-700' : 'text-red-700'"
        >
          <Icon :icon="item.delivered ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'" width="15" aria-hidden="true" />
          {{ item.delivered ? 'Entregado' : 'No entregado' }}
        </div>
        <div class="text-muted text-xs flex items-center gap-1 mt-1">
          <Icon icon="mdi:calendar-outline" width="14" aria-hidden="true" />
          Fecha: <span class="font-mono">{{ item.issueDate?.replace('T', ' ').slice(0, 16) }}</span>
        </div>
        <div class="flex gap-2 mt-3">
          <button
            class="btn-primary-unas flex items-center gap-1 btn-xs"
            @click.stop="store.select(item.id); store.showEdit = true"
            type="button"
            aria-label="Editar"
          >
            <Icon icon="mdi:pencil" width="15" aria-hidden="true" />
            Editar
          </button>
          <button
            class="btn-danger-unas flex items-center gap-1 btn-xs"
            @click.stop="store.remove(item.id)"
            type="button"
            aria-label="Eliminar"
          >
            <Icon icon="mdi:delete-outline" width="15" aria-hidden="true" />
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
import { useCertificateStore } from '../Store/certificateStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useCertificateStore();
    return { store };
  }
});
</script>
