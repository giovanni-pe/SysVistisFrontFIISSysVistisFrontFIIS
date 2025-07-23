<template>
  <div 
    v-if="store.showEdit && store.selected" 
    class="fixed right-0 top-0 w-full max-w-md h-full glass-sidebar z-50 overflow-auto animate-slide-in-right"
  >
    <div class="p-6">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 gradient-blue rounded-full flex-center">
          <iconify-icon icon="mdi:account-edit" class="text-white text-xl"></iconify-icon>
        </div>
        <h2 class="heading-secondary">Editar Persona</h2>
      </div>
      
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:account" class="mr-2"></iconify-icon>
            Nombre Completo
          </label>
          <input 
            v-model="store.selected.fullName" 
            class="input-unas" 
            required 
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:card-account-details" class="mr-2"></iconify-icon>
            DNI
          </label>
          <input 
            v-model="store.selected.dni" 
            class="input-unas" 
            required 
            maxlength="12" 
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:email" class="mr-2"></iconify-icon>
            Email
          </label>
          <input 
            v-model="store.selected.email" 
            type="email" 
            class="input-unas" 
            required 
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:phone" class="mr-2"></iconify-icon>
            Teléfono
          </label>
          <input 
            v-model="store.selected.phone" 
            class="input-unas" 
            required 
            maxlength="15" 
          />
        </div>
        
        <div class="flex items-center gap-3 p-4 glass-card rounded-xl">
          <input 
            type="checkbox" 
            v-model="store.selected.isRepresentative" 
            id="edit-representative-checkbox"
            class="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
          />
          <label for="edit-representative-checkbox" class="flex items-center gap-2 cursor-pointer">
            <iconify-icon icon="mdi:account-star" class="text-blue-600"></iconify-icon>
            <span class="font-semibold text-slate-700">¿Es representante?</span>
          </label>
        </div>
        
        <div class="flex gap-3 pt-6">
          <button 
            type="submit" 
            class="btn-primary-unas hover-glow flex items-center gap-2 flex-1"
          >
            <iconify-icon icon="mdi:content-save"></iconify-icon>
            Actualizar
          </button>
          <button 
            type="button" 
            class="btn-secondary-unas flex items-center gap-2" 
            @click="store.showEdit = false; store.clearSelected()"
          >
            <iconify-icon icon="mdi:close"></iconify-icon>
            Cerrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVisitPersonStore } from '../Store/visitPersonStore';

export default defineComponent({
  setup() {
    const store = useVisitPersonStore();
    
    async function onSubmit() {
      if (store.selected?.id) {
        await store.update(store.selected.id, store.selected);
        store.showEdit = false;
        store.clearSelected();
      }
    }
    
    return { store, onSubmit };
  }
});
</script>