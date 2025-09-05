&lt;template>
  &lt;ion-page>
    &lt;ion-header>
      &lt;ion-toolbar>
        &lt;ion-buttons slot="start">
          &lt;ion-back-button default-href="/listas">&lt;/ion-back-button>
        &lt;/ion-buttons>
        &lt;ion-title>Nova Lista&lt;/ion-title>
      &lt;/ion-toolbar>
    &lt;/ion-header>

    &lt;ion-content :fullscreen="true">
      &lt;form @submit.prevent="salvarLista">
        &lt;ion-list>
          &lt;ion-item>
            &lt;ion-label position="stacked">Data&lt;/ion-label>
            &lt;ion-datetime
              presentation="date"
              v-model="lista.data"
              locale="pt-BR"
            >&lt;/ion-datetime>
          &lt;/ion-item>

          &lt;ion-item>
            &lt;ion-label position="stacked">Mercado&lt;/ion-label>
            &lt;ion-select v-model="lista.mercadoId">
              &lt;ion-select-option
                v-for="mercado in mercados"
                :key="mercado.id"
                :value="mercado.id"
              >
                {{ mercado.nome }}
              &lt;/ion-select-option>
            &lt;/ion-select>
          &lt;/ion-item>
        &lt;/ion-list>

        &lt;div class="ion-padding">
          &lt;ion-button expand="block" type="submit">
            Criar Lista
          &lt;/ion-button>
        &lt;/div>
      &lt;/form>
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
  IonButton,
  IonBackButton,
  IonButtons,
  IonDatetime,
  IonSelect,
  IonSelectOption
} from '@ionic/vue';
import { Mercado } from '@/types';
import { DatabaseService } from '@/services/DatabaseService';

export default defineComponent({
  name: 'NovaListaView',
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
    IonBackButton,
    IonButtons,
    IonDatetime,
    IonSelect,
    IonSelectOption
  },
  setup() {
    const router = useRouter();
    const db = DatabaseService.getInstance();
    const mercados = ref<Mercado[]>([]);
    const lista = ref({
      data: new Date().toISOString(),
      mercadoId: 0,
      status: 'pendente' as const
    });

    const loadMercados = async () => {
      await db.init();
      mercados.value = await db.getMercados();
    };

    const salvarLista = async () => {
      await db.init();
      const id = await db.addListaCompra(lista.value);
      router.push(`/lista/${id}`);
    };

    onMounted(() => {
      loadMercados();
    });

    return {
      mercados,
      lista,
      salvarLista
    };
  }
});
&lt;/script>
