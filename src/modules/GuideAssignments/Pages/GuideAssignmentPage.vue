<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Asignaciones de Guía</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nueva Asignación</button>
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

export default defineComponent({
  components: { GuideAssignmentList, GuideAssignmentForm, GuideAssignmentCreateForm },
  setup() {
    const store = useGuideAssignmentStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
