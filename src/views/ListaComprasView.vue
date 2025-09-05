<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Lista de Compras</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="novaLista">
            <ion-icon :icon="addOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item-sliding v-for="lista in listas" :key="lista.id">
          <ion-item :router-link="'/lista/' + lista.id">
            <ion-label>
              <h2>{{ formatDate(lista.data) }}</h2>
              <p>{{ lista.status }}</p>
            </ion-label>
            <ion-note slot="end" v-if="lista.total">
              R$ {{ lista.total.toFixed(2) }}
            </ion-note>
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option color="danger" @click="deleteLista(lista.id)">
              Excluir
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
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
  IonItemOption,
  IonMenuButton
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
    IonItemOption,
    IonMenuButton
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
</script>
