<template>
  <div class="max-w-7xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Solicitudes de Visita</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nueva Solicitud</button>
    </div>
    <VisitRequestList />
    <VisitRequestForm />
    <VisitRequestCreateForm />
    <VisitRequestReceptionModal />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useVisitRequestStore } from '../Store/visitRequestStore';
import VisitRequestList from '../Components/VisitRequestList.vue';
import VisitRequestForm from '../Components/VisitRequestForm.vue';
import VisitRequestCreateForm from '../Components/VisitRequestCreateForm.vue';
import VisitRequestReceptionModal from '../Components/VisitRequestReceptionModal.vue';

export default defineComponent({
  components: {
    VisitRequestList,
    VisitRequestForm,
    VisitRequestCreateForm,
    VisitRequestReceptionModal
  },
  setup() {
    const store = useVisitRequestStore();
    onMounted(() => {
      store.fetchAll();
    });
    return { store };
  }
});
</script>
