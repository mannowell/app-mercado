&lt;template>
  &lt;ion-menu content-id="main-content">
    &lt;ion-header>
      &lt;ion-toolbar>
        &lt;ion-title>Menu&lt;/ion-title>
      &lt;/ion-toolbar>
    &lt;/ion-header>

    &lt;ion-content>
      &lt;ion-list>
        &lt;ion-item router-link="/listas" @click="closeMenu">
          &lt;ion-icon :icon="listOutline" slot="start">&lt;/ion-icon>
          &lt;ion-label>Listas de Compras&lt;/ion-label>
        &lt;/ion-item>

        &lt;ion-item router-link="/produtos" @click="closeMenu">
          &lt;ion-icon :icon="cubeOutline" slot="start">&lt;/ion-icon>
          &lt;ion-label>Produtos&lt;/ion-label>
        &lt;/ion-item>

        &lt;ion-item router-link="/mercados" @click="closeMenu">
          &lt;ion-icon :icon="storefront" slot="start">&lt;/ion-icon>
          &lt;ion-label>Mercados&lt;/ion-label>
        &lt;/ion-item>
      &lt;/ion-list>
    &lt;/ion-content>
  &lt;/ion-menu>
&lt;/template>

&lt;script lang="ts">
import { defineComponent } from 'vue';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  menuController
} from '@ionic/vue';
import { listOutline, cubeOutline, storefront } from 'ionicons/icons';

export default defineComponent({
  name: 'MenuLateral',
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  },
  setup() {
    const closeMenu = async () => {
      await menuController.close();
    };

    return {
      closeMenu,
      listOutline,
      cubeOutline,
      storefront
    };
  }
});
&lt;/script>
