<template>
  <div class="overflow-x-auto rounded-lg shadow mb-8">
    <table class="min-w-full bg-white border border-slate-200 text-sm">
      <thead class="bg-gradient-to-r from-[var(--unas-emerald-600)] to-[var(--unas-teal-700)] text-white">
        <tr>
          <th class="py-3 px-4 text-left font-bold">ID</th>
          <th class="py-3 px-4 text-left font-bold">Recepción</th>
          <th class="py-3 px-4 text-left font-bold">Resumen</th>
          <th class="py-3 px-4 text-left font-bold">Fecha</th>
          <th class="py-3 px-4 text-left font-bold">Observaciones</th>
          <th class="py-3 px-4 text-center font-bold">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in store.items"
          :key="item.id"
          class="border-b hover:bg-[var(--unas-slate-50)] transition"
        >
          <td class="py-2 px-4 font-semibold text-institutional">
            <Icon icon="mdi:check-decagram-outline" width="17" aria-hidden="true" class="mr-1" />
            #{{ item.id }}
          </td>
          <td class="py-2 px-4">
            <Icon icon="mdi:domain" width="16" aria-hidden="true" class="mr-1" />
            {{ item.receptionId }}
          </td>
          <td class="py-2 px-4 max-w-xs truncate">
            <Icon icon="mdi:note-outline" width="16" aria-hidden="true" class="mr-1" />
            {{ item.summary }}
          </td>
          <td class="py-2 px-4 whitespace-nowrap">
            <Icon icon="mdi:calendar-clock" width="16" aria-hidden="true" class="mr-1" />
            <span class="font-mono">
              {{ item.registrationDate?.replace('T', ' ').slice(0, 16) }}
            </span>
          </td>
          <td class="py-2 px-4 max-w-xs truncate">
            <Icon icon="mdi:comment-text-outline" width="15" aria-hidden="true" class="mr-1" />
            {{ item.observations }}
          </td>
          <td class="py-2 px-4 text-center">
            <button
              class="btn-primary-unas btn-xs flex items-center gap-1"
              @click.stop="store.select(item.id); store.showEdit = true"
              aria-label="Editar"
              type="button"
            >
              <Icon icon="mdi:pencil" width="15" aria-hidden="true" />
              Editar
            </button>
            <button
              class="btn-danger-unas btn-xs flex items-center gap-1 ml-2"
              @click.stop="store.remove(item.id)"
              aria-label="Eliminar"
              type="button"
            >
              <Icon icon="mdi:delete-outline" width="15" aria-hidden="true" />
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="!store.items.length">
          <td colspan="6" class="py-8 text-center text-muted">Sin registros para mostrar</td>
        </tr>
      </tbody>
    </table>
    <!-- Paginación institucional -->
    <div class="mt-4 flex-center gap-4 p-4">
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
import { useCompletedVisitStore } from '../Store/completedVisitStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useCompletedVisitStore();
    return { store };
  }
});
</script>
