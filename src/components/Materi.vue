<template>
  <IonContent
    style="background: pink"
    :style="`max-height: ${showAdBanner ? '90vh' : '100vh'}`"
  >
    <IonTabs>
      <IonTab tab="baca">
        <IonContent id="baca-page">
          <ion-header>
            <ion-toolbar>
              <IonButtons slot="start">
                <IonBackButton :default-href="'/kelas'"></IonBackButton>
              </IonButtons>
              <ion-title>Baca Materi</ion-title>
              <IonButton
                slot="end"
                size="small"
                fill="clear"
                color="danger"
                @click="hideBanner"
                v-if="showAdBanner"
              >
                Tutup Iklan
              </IonButton>
              <!-- <IonButton
                slot="end"
                size="small"
                fill="clear"
                color="primary"
                @click="showBanner"
                v-else
              >
                Buka Iklan
              </IonButton> -->
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <BacaMateri :materi="props.materi" />
          </ion-content>
        </IonContent>
      </IonTab>
      <IonTab tab="latihan">
        <IonContent id="latihan-page">
          <ion-header>
            <ion-toolbar>
              <IonButtons slot="start">
                <IonBackButton :default-href="'/kelas'"></IonBackButton>
              </IonButtons>
              <ion-title>Latihan Materi</ion-title>
              <IonButton
                slot="end"
                size="small"
                fill="clear"
                color="danger"
                @click="hideBanner"
                v-if="showAdBanner"
              >
                Tutup Iklan
              </IonButton>
              <!-- <IonButton
                slot="end"
                size="small"
                fill="clear"
                color="primary"
                @click="showBanner"
                v-else
              >
                Buka Iklan
              </IonButton> -->
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <Latihan :materi="props.materi" />
          </ion-content>
        </IonContent>
      </IonTab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="baca">
          <ion-icon :icon="book" />
          Baca Materi
        </ion-tab-button>
        <ion-tab-button tab="latihan">
          <ion-icon :icon="create"></ion-icon>
          Latihan
        </ion-tab-button>
      </ion-tab-bar>
    </IonTabs>
  </IonContent>
</template>

<script setup>
import {
  IonButton,
  IonBackButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFabButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonText,
  IonImg,
  IonFab,
  IonCardContent,
  IonCardSubtitle,
  IonTabs,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonButtons,
} from "@ionic/vue";
import {
  ref,
  onBeforeMount,
  computed,
  defineAsyncComponent,
  onMounted,
} from "vue";
import { Http } from "@capacitor-community/http";
import { Storage } from "@capacitor/storage";
import { useRouter, useRoute } from "vue-router";
import { create, book, stop } from "ionicons/icons";
import { Icon } from "@iconify/vue";
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

const BacaMateri = defineAsyncComponent(() => import("./BacaMateri.vue"));
const Latihan = defineAsyncComponent(() => import("./Latihan.vue"));
const mode = ref("list");
const router = useRouter();
const route = useRoute();
const props = defineProps({ materi: Object });
const showAdBanner = ref(false);

const hideBanner = async () => {
  showAdBanner.value = false;
  AdMob.hideBanner();
};

onMounted(async () => {
  // await initAdMob();
  // await showBanner();
});
// const showBanner = async () => {
//   showAdBanner.value = true;
//   const options = {
//     adId: "ca-app-pub-4782635054811917/8184544175",
//     adSize: BannerAdSize.ADAPTIVE_BANNER,
//     position: BannerAdPosition.BOTTOM_CENTER,
//     margin: 0,
//     isTesting: true,
//   };
//   AdMob.showBanner(options);
// };
</script>
