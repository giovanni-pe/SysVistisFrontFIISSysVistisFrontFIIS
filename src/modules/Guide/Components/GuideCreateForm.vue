<template>
  <div
    v-if="store.showCreate"
    class="fixed inset-0 modal-overlay flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="newGuideTitle"
  >
    <form
      @submit.prevent="onSubmit"
      class="glass-modal p-6 rounded shadow-strong w-full max-w-md space-y-4 animate-fade-in-up"
    >
      <div class="flex-between mb-2">
        <h2 id="newGuideTitle" class="heading-secondary flex items-center gap-2">
          <Icon icon="mdi:account-plus-outline" width="26" class="text-institutional" aria-hidden="true" />
          Nueva Guía
        </h2>
        <button
          type="button"
          class="btn-secondary-unas flex items-center gap-1"
          @click="store.showCreate = false"
          aria-label="Cancelar"
        >
          <Icon icon="mdi:close" width="18" aria-hidden="true" />
        </button>
      </div>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:account-outline" width="18" aria-hidden="true" />
          Nombre Completo
        </span>
        <input v-model="form.fullName" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:email-outline" width="18" aria-hidden="true" />
          Email
        </span>
        <input v-model="form.email" type="email" class="input-unas mt-1" required />
      </label>
      <label class="block">
        <span class="font-medium text-institutional flex items-center gap-2">
          <Icon icon="mdi:phone-outline" width="18" aria-hidden="true" />
          Teléfono
        </span>
        <input v-model="form.phone" class="input-unas mt-1" required maxlength="15" />
      </label>
      <div class="flex gap-2 justify-end mt-4">
        <button
          type="button"
          class="btn-secondary-unas flex items-center gap-2"
          @click="store.showCreate = false"
        >
          <Icon icon="mdi:close" width="18" aria-hidden="true" />
          Cancelar
        </button>
        <button
          type="submit"
          class="btn-primary-unas flex items-center gap-2 hover-lift"
        >
          <Icon icon="mdi:content-save-outline" width="18" aria-hidden="true" />
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useGuideStore } from '../Store/guideStore';
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Icon },
  setup() {
    const store = useGuideStore();
    const form = reactive({
      fullName: '',
      email: '',
      phone: '',
    });
    async function onSubmit() {
      await store.create(form);
      store.showCreate = false;
      Object.assign(form, { fullName: '', email: '', phone: '' });
    }
    return { store, form, onSubmit };
  }
});
</script>
