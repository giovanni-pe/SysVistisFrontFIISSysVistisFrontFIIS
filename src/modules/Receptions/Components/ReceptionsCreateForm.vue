<template>
  <div v-if="store.showCreate" class="fixed inset-0 modal-overlay flex items-center justify-center z-50 animate-fade-in-up">
    <form @submit.prevent="onSubmit" class="glass-modal p-8 rounded-2xl shadow-strong w-full max-w-lg space-y-6">
      <h2 class="heading-secondary text-center text-unas-emerald-700">Nueva Recepción</h2>
      
      <div class="space-y-5">
        <div>
          <label class="block text-muted mb-2 font-medium">Solicitud asociada (ID)</label>
          <input 
            v-model.number="form.requestId" 
            type="number" 
            class="input-unas" 
            required 
            min="1" 
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-muted mb-2 font-medium">Hora inicio</label>
            <input 
              v-model="form.startTime" 
              type="datetime-local" 
              class="input-unas" 
              required 
            />
          </div>
          
          <div>
            <label class="block text-muted mb-2 font-medium">Hora fin</label>
            <input 
              v-model="form.endTime" 
              type="datetime-local" 
              class="input-unas" 
              required 
            />
          </div>
        </div>

        <div>
          <label class="block text-muted mb-2 font-medium">Estado</label>
          <select v-model="form.status" class="input-unas" required>
            <option value="">Seleccione estado</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        <div>
          <label class="block text-muted mb-2 font-medium">Notas</label>
          <textarea 
            v-model="form.notes" 
            class="textarea-unas" 
            rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-muted mb-2 font-medium">Responsable check-in</label>
          <input 
            v-model="form.checkinResponsible" 
            class="input-unas" 
            required 
          />
        </div>
      </div>

      <div class="flex-between pt-4">
        <button 
          type="button" 
          class="btn-secondary-unas hover-lift"
          @click="store.showCreate = false"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="btn-primary-unas hover-lift"
        >
          Guardar Recepción
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useReceptionsStore } from '../Store/receptionsStore';

export default defineComponent({
  setup() {
    const store = useReceptionsStore();
    const form = reactive({
      requestId: 0,
      startTime: '',
      endTime: '',
      status: '',
      notes: '',
      checkinResponsible: '',
    });

    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { 
        requestId: 0, 
        startTime: '', 
        endTime: '', 
        status: '', 
        notes: '', 
        checkinResponsible: '' 
      });
    }

    return { store, form, onSubmit };
  }
});
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
.modal-overlay {
  backdrop-filter: blur(4px);
}

.glass-modal {
  border: 1px solid rgba(226, 232, 240, 0.6);
}

/* Ajustes para inputs de tipo datetime-local */
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover {
  filter: invert(0.3);
}
</style>