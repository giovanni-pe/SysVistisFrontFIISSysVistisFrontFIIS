<template>
  <div class="container-unas py-8">
    <div class="flex-between mb-6">
      <h1 class="heading-primary flex items-center gap-2">
        <Icon icon="mdi:certificate-outline" width="32" class="text-institutional" aria-hidden="true" />
        Certificados
      </h1>
      <button
        class="btn-primary-unas flex items-center gap-2 hover-lift"
        type="button"
        @click="store.showCreate = true"
        aria-label="Nuevo certificado"
      >
        <Icon icon="mdi:plus" width="22" class="inline-block" aria-hidden="true" />
        Nuevo Certificado
      </button>
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
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { CertificateList, CertificateForm, CertificateCreateForm, Icon },
  setup() {
    const store = useCertificateStore();
    onMounted(() => { store.fetchAll(); });
    return { store };
  }
});
</script>
