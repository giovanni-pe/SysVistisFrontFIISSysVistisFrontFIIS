<template>
  <div class="container-unas py-8">
    <div class="flex-between mb-6">
      <h1 class="heading-primary flex items-center gap-2">
        <Icon icon="mdi:book-open-variant" width="32" class="text-institutional" aria-hidden="true" />
        Guías
      </h1>
      <button
        class="btn-primary-unas flex items-center gap-2 hover-lift"
        type="button"
        @click="store.showCreate = true"
        aria-label="Crear nueva guía"
      >
        <Icon icon="mdi:plus" width="22" class="inline-block" aria-hidden="true" />
        Nueva Guía
      </button>
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
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { GuideList, GuideForm, GuideCreateForm, Icon },
  setup() {
    const store = useGuideStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
