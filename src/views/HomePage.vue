<template>
  <ion-content style="--background: #e7f3f4">
    <div class="wrapper min-h-screen relative">
      <img
        src="/home/mentari.png"
        alt="Mentari"
        class="mentari absolute w-[100px] animate-pulse"
      />
      <Transition name="right">
        <img
          v-if="showAwan1"
          src="/home/awan.png"
          alt="Mentari"
          class="awan-1 absolute -left-[15%] top-[35%] w-[180px]"
        />
      </Transition>
      <Transition name="left">
        <img
          v-if="showAwan2"
          src="/home/awan.png"
          alt="Mentari"
          class="awan-2 absolute right-[1%] top-[20%] w-[160px]"
        />
      </Transition>
      <img
        src="/home/burung.png"
        alt="Mentari"
        class="burung absolute right-[20%] top-[19%] w-[80px]"
      />
      <img
        src="/home/masjid.png"
        alt="Mentari"
        class="masjid absolute bottom-0 w-full"
      />
      <img
        src="/home/bocil.png"
        alt="Mentari"
        class="bocil absolute bottom-0 w-[25%] right-4"
      />
      <div
        class="content w-full py-24 transition-opacity linear duration-300 z-40"
        v-if="showTitle"
      >
        <h3 class="text-center leading-4 font-black text-4xl">ABID</h3>
        <h5 class="text-center leading-4">
          Aplikasi Belajar Interaktif Digital
        </h5>
      </div>
      <div
        class="flex justify-center transition-all duration-300"
        v-if="showStart"
      >
        <IonButton size="large" class="mt-24 mx-auto" @click="goToIndex"
          >Pilih Kelas</IonButton
        >
      </div>
    </div>
    <IonFab slot="fixed" vertical="top" horizontal="end">
      <IonFabButton @click="showSetting">
        <IonIcon :icon="settings" />
      </IonFabButton>
    </IonFab>
    <IonToast
      :isOpen="toast.open"
      :duration="1000"
      :message="toast.message"
      @didDismiss="toast.open = false"
    />
    <ApiSetting v-if="settingForm" :show="settingForm" @close="closeSetting" />
  </ion-content>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonListHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToast,
} from "@ionic/vue";
import { computed, onMounted, reactive, ref } from "vue";
import { settings } from "ionicons/icons";
import ApiSetting from "../components/ApiSetting.vue";

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
const showAwan1 = ref(false);
const showAwan2 = ref(false);
const showStart = ref(false);
const showBocil = ref(false);
const showTitle = ref(false);
const toast = reactive({
  open: false,
  message: "",
});
const goToIndex = () => {
  router.push("/kelas");
};

const settingForm = ref(false);
const showSetting = () => {
  settingForm.value = true;
};

// const apiUri = computed(() => import.meta.env.VITE_API_URI)

const closeSetting = (e = null) => {
  toast.open = true;
  toast.message =
    e == null ? "Alamat API Server belum disimpan" : `Alamat Server: ${e}`;
  settingForm.value = false;
};

onMounted(async () => {
  setTimeout(() => {
    showStart.value = true;
  }, 800);
  setTimeout(() => {
    showAwan1.value = true;
  }, 1000);
  setTimeout(() => {
    showAwan2.value = true;
  }, 1500);
  setTimeout(() => {
    showTitle.value = true;
  }, 1000);
});

// await initAdMob();
// await showBanner();
</script>

<style scoped>
.right-enter-active,
.right-leave-active {
  /* transform: translateX(-10%); */
  left: -30%;
  opacity: 1;
  transition: all 0.9s ease-in-out;
}

.right-enter-from,
.right-leave-to {
  /* transform: translateX(-100%); */
  left: -100%;
  opacity: 0;
  transition: all 0.9s ease-in-out;
}
.left-enter-active,
.left-leave-active {
  /* transform: translateX(-10%); */
  right: -10%;
  opacity: 1;
  transition: all 0.9s ease-in-out;
}

.left-enter-from,
.left-leave-to {
  /* transform: translateX(-100%); */
  right: -100%;
  opacity: 0;
  transition: all 0.9s ease-in-out;
}
</style>
