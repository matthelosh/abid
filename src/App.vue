<template>
  <ion-app>
    <RouterView></RouterView>
  </ion-app>
</template>

<script lang="ts">
  import { IonApp, IonRouterOutlet, IonPage,  IonContent, IonButton } from '@ionic/vue';

  import { defineComponent } from 'vue';

  import Tes from './components/Tes.vue';
import { RouterView } from 'vue-router';

  export default defineComponent({
    name: 'App',
    components: { IonApp, IonRouterOutlet, IonPage, IonContent, IonButton },
  });
</script>