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
        :aria-label="`Editar asistencia #${item.id}`"
      >
        <div class="font-semibold text-institutional mb-1 flex items-center gap-2">
          <Icon icon="mdi:account-check-outline" width="18" aria-hidden="true" />
          Asistencia #{{ item.id }}
        </div>
        <div class="text-muted text-xs flex items-center gap-1">
          <Icon icon="mdi:domain" width="15" aria-hidden="true" />
          Recepción: <span class="font-medium">{{ item.receptionId }}</span>
        </div>
        <div class="text-muted text-xs flex items-center gap-1">
          <Icon icon="mdi:account-outline" width="15" aria-hidden="true" />
          Persona: <span class="font-medium">{{ item.personId }}</span>
        </div>
        <div
          class="text-xs flex items-center gap-1 font-semibold mt-1"
          :class="item.attended ? 'text-green-700' : 'text-red-700'"
        >
          <Icon :icon="item.attended ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'" width="15" aria-hidden="true" />
          {{ item.attended ? 'Asistió' : 'No asistió' }}
        </div>
        <div
          class="text-xs flex items-center gap-1"
          :class="item.viaQR ? 'text-blue-700' : 'text-muted'"
        >
          <Icon :icon="item.viaQR ? 'mdi:qrcode-scan' : 'mdi:pencil-outline'" width="15" aria-hidden="true" />
          {{ item.viaQR ? 'Vía QR' : 'Manual' }}
        </div>
        <div class="text-muted text-xs flex items-center gap-1 mt-1">
          <Icon icon="mdi:clock-outline" width="15" aria-hidden="true" />
          Check-in: <span class="font-mono">{{ item.checkinTime?.replace('T', ' ').slice(0, 16) }}</span>
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
import { useAttendanceStore } from '../Store/attendanceStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useAttendanceStore();
    return { store };
  }
});
</script>
