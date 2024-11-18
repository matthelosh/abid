<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button :default-href="'/'"></ion-back-button>
      </ion-buttons>
      <ion-title>Materi</ion-title>
    </ion-toolbar>
  </ion-header>
  <IonContent>
    <IonList v-if="loading">
      <IonListHeader>
        <IonSkeletonText :animated="true" class="h-4 w-28" />
      </IonListHeader>
      <IonItem v-for="i in 10">
        <IonSkeletonText :animated="true" class="h-2 w-[90%]" />
      </IonItem>
    </IonList>

    <IonList v-else>
      <IonListHeader>
        <IonTitle>
          <h4>Pilih Bab:</h4>
        </IonTitle>
      </IonListHeader>
      <IonItem v-for="(bab, b) in babs" button @click="lihatMateri(bab)">
        <IonTitle>{{ bab.label }}</IonTitle>
      </IonItem>
    </IonList>
  </IonContent>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { CapacitorHttp } from "@capacitor/core";
import { useRoute, useRouter } from "vue-router";
import {
  IonBackButton,
  IonItem,
  IonTitle,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonLoading,
  IonSkeletonText,
} from "@ionic/vue";
import {
  AdMob,
  // AdOptions,
  // BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from "@capacitor-community/admob";

const initAdMob = async () => {
  const { status } = await AdMob.trackingAuthorizationStatus();
  console.log(status);
  if (status === "notDetermined") {
    console.log("Display informarion before ads load first time");
  }

  AdMob.initialize({
    requestTrackingAuthorization: true,
    initializeForTesting: true,
    testingDevices: ["YOURTESTINGDEVICE"],
  });
};

const showBanner = async () => {
  const options = {
    adId: import.meta.env.VITE_BANNER_AD_TEST_ID,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true,
  };

  await AdMob.showBanner(options);
};

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const params = computed(() => route.params);
const error = reactive({
  isError: false,
  message: "Pesan",
});

const babs = ref([]);
const HttpOptions = {
  url: "",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const lihatMateri = (bab) => {
  router.push(`/kelas/${bab.tingkat}/bab/${bab.id}`);
};

onMounted(async () => {
  loading.value = true;
  HttpOptions.url =
    import.meta.env.VITE_API_URI + "/api/abid/bab?kelas=" + params.value.kelas;
  await CapacitorHttp.get(HttpOptions)
    .then((res) => {
      babs.value = res.data;
    })
    .catch((err) => {
      if (err.message.includes("Failed to fetch")) {
        error.isError = true;
        error.message =
          "Tidak terhubung dengan server. Cek pengaturan atau koneksi internet";
      }
      console.log(err);
    })
    .finally(() => (loading.value = false));

  // await initAdMob();
  // await showBanner();
});
</script>
