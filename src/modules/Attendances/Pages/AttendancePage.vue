<template>
  <div class="container-unas py-8">
    <div class="flex-between mb-6">
      <h1 class="heading-primary flex items-center gap-2">
        <Icon icon="mdi:account-check-outline" width="32" class="text-institutional" aria-hidden="true" />
        Asistencias
      </h1>
      <button
        class="btn-primary-unas flex items-center gap-2 hover-lift"
        type="button"
        @click="store.showCreate = true"
        aria-label="Nueva asistencia"
      >
        <Icon icon="mdi:plus" width="22" class="inline-block" aria-hidden="true" />
        Nueva Asistencia
      </button>
    </div>
    <AttendanceList />
    <AttendanceForm />
    <AttendanceCreateForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useAttendanceStore } from '../Store/attendanceStore';
import AttendanceList from '../Components/AttendanceList.vue';
import AttendanceForm from '../Components/AttendanceForm.vue';
import AttendanceCreateForm from '../Components/AttendanceCreateForm.vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { AttendanceList, AttendanceForm, AttendanceCreateForm, Icon },
  setup() {
    const store = useAttendanceStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
