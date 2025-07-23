<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Asistencias</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nueva Asistencia</button>
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

export default defineComponent({
  components: { AttendanceList, AttendanceForm, AttendanceCreateForm },
  setup() {
    const store = useAttendanceStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
