<template>
  <div class="container-unas animate-fade-in-up">
    <div class="flex-between mb-8">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 gradient-emerald rounded-full flex-center">
          <iconify-icon icon="mdi:account-group" class="text-white text-2xl"></iconify-icon>
        </div>
        <div>
          <h1 class="heading-primary">Personas de la Visita</h1>
          <p class="text-muted">Gestión de visitantes y representantes</p>
        </div>
      </div>
      <button 
        class="btn-primary-unas hover-glow flex items-center gap-2"
        @click="store.showCreate = true"
      >
        <iconify-icon icon="mdi:plus" class="text-xl"></iconify-icon>
        Nueva Persona
      </button>
    </div>
    
    <VisitPersonList />
    <VisitPersonForm />
    <VisitPersonCreateForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useVisitPersonStore } from '../Store/visitPersonStore';
import VisitPersonList from '../Components/VisitPersonList.vue';
import VisitPersonForm from '../Components/VisitPersonForm.vue';
import VisitPersonCreateForm from '../Components/VisitPersonCreateForm.vue';

export default defineComponent({
  components: { VisitPersonList, VisitPersonForm, VisitPersonCreateForm },
  setup() {
    const store = useVisitPersonStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>