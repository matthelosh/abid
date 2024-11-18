<template>
  <div v-if="mode == 'list'" style="min-height: 100vh">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="'/'"></ion-back-button>
        </ion-buttons>
        <ion-title>Materi Kelas {{ params.kelas }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-title>Pilih Materi:</ion-title>
        </ion-list-header>
        <ion-item
          v-for="(materi, m) in materis.data"
          button
          @click="openMateri(materi)"
        >
          <span slot="start">{{ m + 1 }}</span>
          <ion-label>{{ materi.title }}</ion-label>
        </ion-item>
      </ion-list>
      <IonList v-if="loading">
        <IonItem v-for="i in 10">
          <IonSkeletonText style="height: 20px"></IonSkeletonText>
        </IonItem>
      </IonList>
      <div
        class="flex items-center justify-center bg-red-50 py-6 mx-4 rounded border border-red-700"
        v-if="!loading && materis?.data?.length < 1"
      >
        <article>
          <h5 class="text-center text-red-700">Belum ada materi</h5>
          <p class="text-center">Pantau terus ya..</p>
        </article>
      </div>
      <div
        transition="slide-x-transition"
        class="no-materi"
        v-if="!loading && materis?.data?.length < 1"
        :class="!loading && materis?.data?.length < 1 ? 'show-image' : ''"
      >
        <img src="/404.svg" alt="Not Found" />
      </div>
    </ion-content>
  </div>
  <Materi v-else :materi="selectedMateri" @close="closeMateri" />
</template>

<script setup>
import {
  IonButtons,
  IonBackButton,
  IonHeader,
  IonAlert,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonToast,
  IonSpinner,
  IonSkeletonText,
} from "@ionic/vue";
import {
  ref,
  reactive,
  defineAsyncComponent,
  computed,
  onBeforeMount,
  onMounted,
} from "vue";
import { CapacitorHttp } from "@capacitor/core";
import NotFound from "../components/NotFound.vue";

import { useRouter, useRoute } from "vue-router";
import { Storage } from "@capacitor/storage";

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

const Materi = defineAsyncComponent(() => import("../components/Materi.vue"));
const mode = ref("list");
const selectedMateri = ref(null);
const router = useRouter();
const route = useRoute();
const materis = ref([]);
const loading = ref(false);
const params = computed(() => {
  return route.params;
});

const openMateri = (materi) => {
  mode.value = "baca";
  selectedMateri.value = materi;
};

const closeMateri = () => {
  selectedMateri.value = null;
  mode.value = "list";
};
const error = reactive({
  isError: false,
  message: "Maaf, ada error",
});

const Bab = defineAsyncComponent({
  loader: () => import(`./Kelas${params.value.kelas}/Bab.vue`),
  loadingComponent: NotFound,
  errorComponent: NotFound,
  delay: 200,
  timeout: 3000,
  onError(error, retry, fail, attempts) {
    return false;
  },
});

const open = (num) => {
  router.push(`/kelas/${params.value.kelas}/bab/${num}`);
};

const HttpOptions = {
  url: "",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

onMounted(async () => {
  // initAdMob();
  // showBanner();
});

onBeforeMount(async () => {
  loading.value = true;
  HttpOptions.url =
    import.meta.env.VITE_API_URI + "/api/abid/materi?bab=" + params.value.bab;
  materis.value = await CapacitorHttp.get(HttpOptions)
    .catch((err) => {
      if (err.message.includes("Failed to fetch")) {
        error.isError = true;
        error.message =
          "Tidak terhubung dengan server. Cek pengaturan atau koneksi internet";
      }
    })
    .finally(() => (loading.value = false));
});
</script>

<style>
.no-image img {
  transform: translate(-100px) rotate(34);
}
</style>
