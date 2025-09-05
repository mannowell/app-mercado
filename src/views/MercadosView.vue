&lt;template>
  &lt;ion-page>
    &lt;ion-header>
      &lt;ion-toolbar>
        &lt;ion-buttons slot="start">
          &lt;ion-menu-button>&lt;/ion-menu-button>
        &lt;/ion-buttons>
        &lt;ion-title>Mercados&lt;/ion-title>
        &lt;ion-buttons slot="end">
          &lt;ion-button @click="showAddModal">
            &lt;ion-icon :icon="addOutline">&lt;/ion-icon>
          &lt;/ion-button>
        &lt;/ion-buttons>
      &lt;/ion-toolbar>
    &lt;/ion-header>

    &lt;ion-content :fullscreen="true">
      &lt;ion-list>
        &lt;ion-item-sliding v-for="mercado in mercados" :key="mercado.id">
          &lt;ion-item>
            &lt;ion-label>
              &lt;h2>{{ mercado.nome }}&lt;/h2>
              &lt;p v-if="mercado.endereco">{{ mercado.endereco }}&lt;/p>
            &lt;/ion-label>
          &lt;/ion-item>

          &lt;ion-item-options side="end">
            &lt;ion-item-option color="primary" @click="editMercado(mercado)">
              Editar
            &lt;/ion-item-option>
            &lt;ion-item-option color="danger" @click="deleteMercado(mercado.id)">
              Excluir
            &lt;/ion-item-option>
          &lt;/ion-item-options>
        &lt;/ion-item-sliding>
      &lt;/ion-list>

      &lt;ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
        &lt;ion-header>
          &lt;ion-toolbar>
            &lt;ion-title>{{ editMode ? 'Editar' : 'Novo' }} Mercado&lt;/ion-title>
            &lt;ion-buttons slot="end">
              &lt;ion-button @click="closeModal">Fechar&lt;/ion-button>
            &lt;/ion-buttons>
          &lt;/ion-toolbar>
        &lt;/ion-header>

        &lt;ion-content class="ion-padding">
          &lt;form @submit.prevent="saveMercado">
            &lt;ion-item>
              &lt;ion-label position="stacked">Nome&lt;/ion-label>
              &lt;ion-input
                v-model="currentMercado.nome"
                required
                type="text"
              >&lt;/ion-input>
            &lt;/ion-item>

            &lt;ion-item>
              &lt;ion-label position="stacked">Endereço&lt;/ion-label>
              &lt;ion-textarea
                v-model="currentMercado.endereco"
                rows="3"
              >&lt;/ion-textarea>
            &lt;/ion-item>

            &lt;div class="ion-padding">
              &lt;ion-button expand="block" type="submit">
                {{ editMode ? 'Atualizar' : 'Adicionar' }}
              &lt;/ion-button>
            &lt;/div>
          &lt;/form>
        &lt;/ion-content>
      &lt;/ion-modal>
    &lt;/ion-content>
  &lt;/ion-page>
&lt;/template>

&lt;script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonModal,
  IonInput,
  IonTextarea,
} from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import { Mercado } from '@/types';
import { DatabaseService } from '@/services/DatabaseService';

export default defineComponent({
  name: 'MercadosView',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonModal,
    IonInput,
    IonTextarea,
  },
  setup() {
    const db = DatabaseService.getInstance();
    const mercados = ref<Mercado[]>([]);
    const isModalOpen = ref(false);
    const editMode = ref(false);
    const currentMercado = ref<Partial<Mercado>>({
      nome: '',
      endereco: ''
    });

    const loadMercados = async () => {
      await db.init();
      mercados.value = await db.getMercados();
    };

    const showAddModal = () => {
      editMode.value = false;
      currentMercado.value = {
        nome: '',
        endereco: ''
      };
      isModalOpen.value = true;
    };

    const editMercado = (mercado: Mercado) => {
      editMode.value = true;
      currentMercado.value = { ...mercado };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveMercado = async () => {
      if (currentMercado.value.nome) {
        await db.init();
        await db.addMercado(currentMercado.value);
        closeModal();
        loadMercados();
      }
    };

    const deleteMercado = async (id?: number) => {
      if (id) {
        // Implementar exclusão do mercado
        await loadMercados();
      }
    };

    onMounted(() => {
      loadMercados();
    });

    return {
      mercados,
      isModalOpen,
      editMode,
      currentMercado,
      showAddModal,
      editMercado,
      closeModal,
      saveMercado,
      deleteMercado,
      addOutline
    };
  }
});
&lt;/script>
