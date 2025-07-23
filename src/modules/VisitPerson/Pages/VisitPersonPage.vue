<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Personas de la Visita</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nueva Persona</button>
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
