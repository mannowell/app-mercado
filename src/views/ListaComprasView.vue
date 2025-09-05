&lt;template>
  &lt;ion-page>
    &lt;ion-header>
      &lt;ion-toolbar>
        &lt;ion-title>Lista de Compras&lt;/ion-title>
        &lt;ion-buttons slot="end">
          &lt;ion-button @click="novaLista">
            &lt;ion-icon :icon="addOutline">&lt;/ion-icon>
          &lt;/ion-button>
        &lt;/ion-buttons>
      &lt;/ion-toolbar>
    &lt;/ion-header>

    &lt;ion-content :fullscreen="true">
      &lt;ion-list>
        &lt;ion-item-sliding v-for="lista in listas" :key="lista.id">
          &lt;ion-item :router-link="'/lista/' + lista.id">
            &lt;ion-label>
              &lt;h2>{{ formatDate(lista.data) }}&lt;/h2>
              &lt;p>{{ lista.status }}&lt;/p>
            &lt;/ion-label>
            &lt;ion-note slot="end" v-if="lista.total">
              R$ {{ lista.total.toFixed(2) }}
            &lt;/ion-note>
          &lt;/ion-item>

          &lt;ion-item-options side="end">
            &lt;ion-item-option color="danger" @click="deleteLista(lista.id)">
              Excluir
            &lt;/ion-item-option>
          &lt;/ion-item-options>
        &lt;/ion-item-sliding>
      &lt;/ion-list>
    &lt;/ion-content>
  &lt;/ion-page>
&lt;/template>

&lt;script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButtons,
  IonButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import { ListaCompra } from '@/types';
import { DatabaseService } from '@/services/DatabaseService';

export default defineComponent({
  name: 'ListaComprasView',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonButtons,
    IonButton,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  },
  setup() {
    const router = useRouter();
    const db = DatabaseService.getInstance();
    const listas = ref<ListaCompra[]>([]);

    const loadListas = async () => {
      await db.init();
      listas.value = await db.getListasCompra();
    };

    const novaLista = () => {
      router.push('/nova-lista');
    };

    const deleteLista = async (id?: number) => {
      if (id) {
        // Implementar exclusão da lista
        await loadListas();
      }
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('pt-BR');
    };

    onMounted(() => {
      loadListas();
    });

    return {
      listas,
      novaLista,
      deleteLista,
      formatDate,
      addOutline
    };
  }
});
&lt;/script>
    };

    const deleteLista = async (id: number) => {
      // Implementar lógica de exclusão
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('pt-BR');
    };

    onMounted(() => {
      loadListas();
    });

    return {
      listas,
      novaLista,
      deleteLista,
      formatDate,
      addOutline
    };
  }
});
&lt;/script>
