<template>
  <ion-app>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
    <!-- <ion-footer>
      <div class="px-4 py-2 flex items-center gap-1">
        <div
          class="w-4 h-4 rounded-full"
          :class="netStat?.connected ? 'bg-green-500' : 'bg-red-500'"
        ></div>
        <small>{{ netStat?.connected ? "Daring" : "Luring" }}</small>
      </div>
    </ion-footer> -->
  </ion-app>
</template>

<script setup>
import { IonApp, IonFooter } from "@ionic/vue";
import { Network } from "@capacitor/network";
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";

import { RouterView } from "vue-router";
// Admob

const netStat = ref({});
const getNetStat = async () => {
  netStat.value = await Network.getStatus();
};

onMounted(async () => {});

onBeforeMount(async () => {
  // Storage.set({key: 'apiServer', value: 'https://abid.kkgpaiwagir.or.id'})
  await getNetStat();
});
</script>
