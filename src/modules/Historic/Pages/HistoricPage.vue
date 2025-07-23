<template>
  <div class="max-w-6xl mx-auto py-8">
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex gap-4" aria-label="Historial Navegación">
        <button
          class="py-2 px-4 -mb-px border-b-2 transition font-semibold"
          :class="currentTab === 'completed' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-500'"
          @click="currentTab = 'completed'"
        >Visitas Completadas</button>
        <button
          class="py-2 px-4 -mb-px border-b-2 transition font-semibold"
          :class="currentTab === 'attendance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-500'"
          @click="currentTab = 'attendance'"
        >Asistencias</button>
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

export default defineComponent({
  components: { CompletedVisitPage, AttendancePage },
  setup() {
    // Puedes cambiar a useState o reactive si prefieres evitar ref por completo, pero data() también es válido aquí
    const currentTab = ref<'completed' | 'attendance'>('completed');
    return { currentTab };
  }
});
</script>
