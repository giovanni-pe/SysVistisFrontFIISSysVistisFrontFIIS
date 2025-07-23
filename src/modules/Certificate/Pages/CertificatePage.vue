<template>
  <div class="max-w-4xl mx-auto py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Certificados</h1>
      <button class="btn btn-success" @click="store.showCreate = true">Nuevo Certificado</button>
    </div>
    <CertificateList />
    <CertificateForm />
    <CertificateCreateForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useCertificateStore } from '../Store/certificateStore';
import CertificateList from '../Components/CertificateList.vue';
import CertificateForm from '../Components/CertificateForm.vue';
import CertificateCreateForm from '../Components/CertificateCreateForm.vue';

export default defineComponent({
  components: { CertificateList, CertificateForm, CertificateCreateForm },
  setup() {
    const store = useCertificateStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
