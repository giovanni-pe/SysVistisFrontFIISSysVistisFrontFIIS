<template>
  <div 
    v-if="store.showCreate" 
    class="fixed inset-0 modal-overlay flex-center z-50"
    @click.self="store.showCreate = false"
  >
    <form 
      @submit.prevent="onSubmit" 
      class="glass-modal rounded-2xl w-full max-w-md mx-4 p-8 animate-fade-in-up"
    >
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 gradient-emerald rounded-full flex-center">
          <iconify-icon icon="mdi:account-plus" class="text-white text-xl"></iconify-icon>
        </div>
        <h2 class="heading-secondary">Nueva Persona</h2>
      </div>
      
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:clipboard-list" class="mr-2"></iconify-icon>
            Solicitud asociada (ID)
          </label>
          <input 
            v-model.number="form.requestId" 
            type="number" 
            class="input-unas" 
            required 
            min="1"
            placeholder="Ingrese el ID de la solicitud"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:account" class="mr-2"></iconify-icon>
            Nombre Completo
          </label>
          <input 
            v-model="form.fullName" 
            class="input-unas" 
            required 
            placeholder="Nombres y apellidos completos"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:card-account-details" class="mr-2"></iconify-icon>
            DNI
          </label>
          <input 
            v-model="form.dni" 
            class="input-unas" 
            required 
            maxlength="12"
            placeholder="Documento de identidad"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:email" class="mr-2"></iconify-icon>
            Email
          </label>
          <input 
            v-model="form.email" 
            type="email" 
            class="input-unas" 
            required
            placeholder="correo@ejemplo.com"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-institutional mb-2">
            <iconify-icon icon="mdi:phone" class="mr-2"></iconify-icon>
            Teléfono
          </label>
          <input 
            v-model="form.phone" 
            class="input-unas" 
            required 
            maxlength="15"
            placeholder="Número de contacto"
          />
        </div>
        
        <div class="flex items-center gap-3 p-4 glass-card rounded-xl">
          <input 
            type="checkbox" 
            v-model="form.isRepresentative" 
            id="representative-checkbox"
            class="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
          />
          <label for="representative-checkbox" class="flex items-center gap-2 cursor-pointer">
            <iconify-icon icon="mdi:account-star" class="text-blue-600"></iconify-icon>
            <span class="font-semibold text-slate-700">¿Es representante?</span>
          </label>
        </div>
      </div>
      
      <div class="flex gap-3 justify-end mt-8">
        <button 
          type="button" 
          class="btn-secondary-unas flex items-center gap-2" 
          @click="store.showCreate = false"
        >
          <iconify-icon icon="mdi:close"></iconify-icon>
          Cancelar
        </button>
        <button 
          type="submit" 
          class="btn-primary-unas hover-glow flex items-center gap-2"
        >
          <iconify-icon icon="mdi:content-save"></iconify-icon>
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useVisitPersonStore } from '../Store/visitPersonStore';

export default defineComponent({
  setup() {
    const store = useVisitPersonStore();
    const form = reactive({
      requestId: 0,
      fullName: '',
      dni: '',
      email: '',
      phone: '',
      isRepresentative: false,
    });
    
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { 
        requestId: 0, 
        fullName: '', 
        dni: '', 
        email: '', 
        phone: '', 
        isRepresentative: false 
      });
    }
    
    return { store, form, onSubmit };
  }
});
</script>