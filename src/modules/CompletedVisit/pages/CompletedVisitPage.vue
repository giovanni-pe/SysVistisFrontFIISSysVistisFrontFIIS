<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Visitas Completadas</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nueva Visita Completada</button>
    </div>
    <CompletedVisitList />
    <CompletedVisitForm />
    <CompletedVisitCreateForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useCompletedVisitStore } from '../Store/completedVisitStore';
import CompletedVisitList from '../Components/CompletedVisitList.vue';
import CompletedVisitForm from '../Components/CompletedVisitForm.vue';
import CompletedVisitCreateForm from '../Components/CompletedVisitCreateForm.vue';

export default defineComponent({
  components: { CompletedVisitList, CompletedVisitForm, CompletedVisitCreateForm },
  setup() {
    const store = useCompletedVisitStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
