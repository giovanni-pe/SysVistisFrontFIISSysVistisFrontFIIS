<template>
  <div class="container-unas py-8">
    <div class="flex-between mb-6">
      <h1 class="heading-primary flex items-center gap-2">
        <Icon icon="mdi:account-multiple-plus-outline" width="32" class="text-institutional" aria-hidden="true" />
        Asignaciones de Guía
      </h1>
      <button
        class="btn-primary-unas flex items-center gap-2 hover-lift"
        type="button"
        @click="store.showCreate = true"
        aria-label="Crear nueva asignación"
      >
        <Icon icon="mdi:plus" width="22" class="inline-block" aria-hidden="true" />
        Nueva Asignación
      </button>
    </div>
    <GuideAssignmentList />
    <GuideAssignmentForm />
    <GuideAssignmentCreateForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useGuideAssignmentStore } from '../Store/guideAssignmentStore';
import GuideAssignmentList from '../Components/GuideAssignmentList.vue';
import GuideAssignmentForm from '../Components/GuideAssignmentForm.vue';
import GuideAssignmentCreateForm from '../Components/GuideAssignmentCreateForm.vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { GuideAssignmentList, GuideAssignmentForm, GuideAssignmentCreateForm, Icon },
  setup() {
    const store = useGuideAssignmentStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
