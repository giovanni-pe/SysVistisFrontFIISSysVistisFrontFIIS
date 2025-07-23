<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Guías</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nueva Guía</button>
    </div>
    <GuideList />
    <GuideForm />
    <GuideCreateForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useGuideStore } from '../Store/guideStore';
import GuideList from '../Components/GuideList.vue';
import GuideForm from '../Components/GuideForm.vue';
import GuideCreateForm from '../Components/GuideCreateForm.vue';

export default defineComponent({
  components: { GuideList, GuideForm, GuideCreateForm },
  setup() {
    const store = useGuideStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
