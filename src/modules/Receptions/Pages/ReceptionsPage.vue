<template>
  <div class="container-unas py-8">
    <div class="flex-between mb-6">
      <h1 class="heading-primary flex items-center gap-2">
        <!-- Icono institucional -->
        <Icon icon="material-symbols:inventory-2-outline" width="32" class="text-institutional" aria-hidden="true" />
        Recepciones
      </h1>
      <button
        class="btn-primary-unas flex items-center gap-2 hover-lift"
        type="button"
        @click="store.showCreate = true"
        aria-label="Crear nueva recepción"
      >
        <Icon icon="mdi:plus" width="22" class="inline-block" aria-hidden="true" />
        Nueva Recepción
      </button>
    </div>
    <ReceptionsList />
    <ReceptionsForm />
    <ReceptionsCreateForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useReceptionsStore } from '../Store/receptionsStore';
import ReceptionsList from '../Components/ReceptionsList.vue';
import ReceptionsForm from '../Components/ReceptionsForm.vue';
import ReceptionsCreateForm from '../Components/ReceptionsCreateForm.vue';
// Importa Iconify (puedes ajustar según tu setup)
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { ReceptionsList, ReceptionsForm, ReceptionsCreateForm, Icon },
  setup() {
    const store = useReceptionsStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
