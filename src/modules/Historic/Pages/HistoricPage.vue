<template>
  <div class="container-unas py-8">
    <div class="border-b border-slate-200 mb-6">
      <nav class="flex gap-4" aria-label="Historial Navegación">
        <button
          class="py-2 px-4 -mb-px border-b-2 transition font-semibold flex items-center gap-2 focus-visible:outline-none"
          :class="currentTab === 'completed'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-muted hover:text-blue-600 hover:border-blue-200'"
          @click="currentTab = 'completed'"
          :aria-current="currentTab === 'completed' ? 'page' : false"
        >
          <Icon icon="mdi:check-decagram-outline" width="22" aria-hidden="true" />
          Visitas Completadas
        </button>
        <button
          class="py-2 px-4 -mb-px border-b-2 transition font-semibold flex items-center gap-2 focus-visible:outline-none"
          :class="currentTab === 'attendance'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-muted hover:text-blue-600 hover:border-blue-200'"
          @click="currentTab = 'attendance'"
          :aria-current="currentTab === 'attendance' ? 'page' : false"
        >
          <Icon icon="mdi:account-check-outline" width="22" aria-hidden="true" />
          Asistencias
        </button>
      </nav>
    </div>
    <div>
      <CompletedVisitPage v-if="currentTab === 'completed'" />
      <AttendancePage v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CompletedVisitPage from '../../CompletedVisit/pages/CompletedVisitPage.vue';
import AttendancePage from '../../Attendances/Pages/AttendancePage.vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { CompletedVisitPage, AttendancePage, Icon },
  setup() {
    const currentTab = ref<'completed' | 'attendance'>('completed');
    return { currentTab };
  }
});
</script>
