<template>
  <IonHeader fixed>
    <IonToolbar>
      <IonTitle>Index Kelas</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <div class="flex justify-center">
      <img src="/bismillah.png" alt="Bismilah" class="h-32" />
    </div>
    <IonList>
      <IonListHeader>
        <h4>Pilih Kelas:</h4>
      </IonListHeader>
      <IonItem v-for="k in 6" @click="goto(k)" button>
        <h5 class="py-2">Kelas {{ k }}</h5>
      </IonItem>
    </IonList>
    <img src="/home/bocil.png" alt="" />
    <IonToast
      :isOpen="toastOpen"
      :message="toastMessage"
      :duration="2000"
      @didDismiss="toastOpen = false"
    ></IonToast>
  </IonContent>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonListHeader,
  IonFooter,
  IonBackButton,
  IonToast,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
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

const router = useRouter();
const route = useRoute();
const toastOpen = ref(false);
const toastMessage = ref("");
const goto = (k) => {
  toastMessage.value = "Kamu memilih Kelas " + k;
  toastOpen.value = true;
  router.push("/kelas/" + k);
};

onMounted(() => {
  // initAdMob();
  // showBanner();
});
</script>

<style scoped></style>
