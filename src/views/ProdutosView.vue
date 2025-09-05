&lt;template>
  &lt;ion-page>
    &lt;ion-header>
      &lt;ion-toolbar>
        &lt;ion-buttons slot="start">
          &lt;ion-menu-button>&lt;/ion-menu-button>
        &lt;/ion-buttons>
        &lt;ion-title>Produtos&lt;/ion-title>
        &lt;ion-buttons slot="end">
          &lt;ion-button @click="showAddModal">
            &lt;ion-icon :icon="addOutline">&lt;/ion-icon>
          &lt;/ion-button>
        &lt;/ion-buttons>
      &lt;/ion-toolbar>
    &lt;/ion-header>

    &lt;ion-content :fullscreen="true">
      &lt;ion-searchbar
        v-model="searchTerm"
        :debounce="300"
        placeholder="Buscar produtos"
        @ionInput="handleSearch"
      >&lt;/ion-searchbar>

      &lt;ion-list>
        &lt;ion-item-sliding v-for="produto in produtosFiltrados" :key="produto.id">
          &lt;ion-item>
            &lt;ion-label>
              &lt;h2>{{ produto.nome }}&lt;/h2>
              &lt;p v-if="produto.descricao">{{ produto.descricao }}&lt;/p>
            &lt;/ion-label>
          &lt;/ion-item>

          &lt;ion-item-options side="end">
            &lt;ion-item-option color="primary" @click="editProduto(produto)">
              Editar
            &lt;/ion-item-option>
            &lt;ion-item-option color="danger" @click="deleteProduto(produto.id)">
              Excluir
            &lt;/ion-item-option>
          &lt;/ion-item-options>
        &lt;/ion-item-sliding>
      &lt;/ion-list>

      &lt;ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
        &lt;ion-header>
          &lt;ion-toolbar>
            &lt;ion-title>{{ editMode ? 'Editar' : 'Novo' }} Produto&lt;/ion-title>
            &lt;ion-buttons slot="end">
              &lt;ion-button @click="closeModal">Fechar&lt;/ion-button>
            &lt;/ion-buttons>
          &lt;/ion-toolbar>
        &lt;/ion-header>

        &lt;ion-content class="ion-padding">
          &lt;form @submit.prevent="saveProduto">
            &lt;ion-item>
              &lt;ion-label position="stacked">Nome&lt;/ion-label>
              &lt;ion-input
                v-model="currentProduto.nome"
                required
                type="text"
              >&lt;/ion-input>
            &lt;/ion-item>

            &lt;ion-item>
              &lt;ion-label position="stacked">Descrição&lt;/ion-label>
              &lt;ion-textarea
                v-model="currentProduto.descricao"
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
import { defineComponent, ref, computed } from 'vue';
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
  IonSearchbar,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonModal,
  IonInput,
  IonTextarea,
} from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import { Produto } from '@/types';
import { DatabaseService } from '@/services/DatabaseService';

export default defineComponent({
  name: 'ProdutosView',
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
    IonSearchbar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonModal,
    IonInput,
    IonTextarea,
  },
  setup() {
    const db = DatabaseService.getInstance();
    const produtos = ref<Produto[]>([]);
    const searchTerm = ref('');
    const isModalOpen = ref(false);
    const editMode = ref(false);
    const currentProduto = ref<Partial<Produto>>({
      nome: '',
      descricao: ''
    });

    const loadProdutos = async () => {
      await db.init();
      produtos.value = await db.getProdutos();
    };

    const produtosFiltrados = computed(() => {
      if (!searchTerm.value) return produtos.value;
      const term = searchTerm.value.toLowerCase();
      return produtos.value.filter(p => 
        p.nome.toLowerCase().includes(term) ||
        (p.descricao && p.descricao.toLowerCase().includes(term))
      );
    });

    const showAddModal = () => {
      editMode.value = false;
      currentProduto.value = {
        nome: '',
        descricao: ''
      };
      isModalOpen.value = true;
    };

    const editProduto = (produto: Produto) => {
      editMode.value = true;
      currentProduto.value = { ...produto };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveProduto = async () => {
      if (currentProduto.value.nome) {
        await db.init();
        if (editMode.value && currentProduto.value.id) {
          // Implementar atualização
        } else {
          await db.addProduto(currentProduto.value);
        }
        closeModal();
        loadProdutos();
      }
    };

    const deleteProduto = async (id?: number) => {
      if (id) {
        // Implementar exclusão
      }
    };

    const handleSearch = (event: CustomEvent) => {
      searchTerm.value = event.detail.value || '';
    };

    loadProdutos();

    return {
      produtos,
      searchTerm,
      isModalOpen,
      editMode,
      currentProduto,
      produtosFiltrados,
      showAddModal,
      editProduto,
      closeModal,
      saveProduto,
      deleteProduto,
      handleSearch,
      addOutline
    };
  }
});
&lt;/script>
