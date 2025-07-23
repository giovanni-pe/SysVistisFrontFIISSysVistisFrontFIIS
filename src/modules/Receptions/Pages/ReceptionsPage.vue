<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Recepciones</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nueva Recepción</button>
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

export default defineComponent({
  components: { ReceptionsList, ReceptionsForm, ReceptionsCreateForm },
  setup() {
    const store = useReceptionsStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
