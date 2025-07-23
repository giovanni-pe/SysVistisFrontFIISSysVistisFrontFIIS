<template>
  <div class="container-unas py-8">
    <div class="flex-between mb-6">
      <h1 class="heading-primary flex items-center gap-2">
        <Icon icon="mdi:map-marker-check-outline" width="32" class="text-institutional" aria-hidden="true" />
        Visitas Completadas
      </h1>
      <button
        class="btn-primary-unas flex items-center gap-2 hover-lift"
        type="button"
        @click="store.showCreate = true"
        aria-label="Nueva visita completada"
      >
        <Icon icon="mdi:plus" width="22" class="inline-block" aria-hidden="true" />
        Nueva Visita Completada
      </button>
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
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { CompletedVisitList, CompletedVisitForm, CompletedVisitCreateForm, Icon },
  setup() {
    const store = useCompletedVisitStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
