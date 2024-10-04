<template>
  <ion-content style="--background: #E7F3F4;">
  <div class="wrapper min-h-screen relative">
    <img src="/home/mentari.png" alt="Mentari" class="mentari absolute w-[100px] animate-pulse">
    <Transition name="right">
    <img v-if="showAwan1"  src="/home/awan.png" alt="Mentari" class="awan-1 absolute -left-[15%] top-[35%] w-[180px]">
  </Transition>
    <Transition name="left">
      <img v-if="showAwan2" src="/home/awan.png" alt="Mentari" class="awan-2 absolute right-[1%] top-[20%] w-[160px]">
    </Transition>
    <img src="/home/burung.png" alt="Mentari" class="burung absolute right-[20%] top-[19%] w-[80px]">
    <img src="/home/masjid.png" alt="Mentari" class="masjid absolute bottom-0  w-full">
    <img src="/home/bocil.png" alt="Mentari" class="bocil absolute bottom-0  w-[25%] right-4">
    <div class="content w-full py-24 transition-opacity linear duration-300" v-if="showTitle">
      <h3 class="text-center leading-4 font-black text-4xl">ABID</h3>
      <h5 class="text-center leading-4">
        Aplikasi Belajar Interaktif Digital
      </h5>
      <div class="flex justify-center">
        <IonButton class="mt-40 mx-auto" @click="goToIndex">Pilih Kelas</IonButton>
      </div>
    </div>
  </div>
</ion-content>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { IonContent, IonList, IonItem, IonLabel, IonButton, IonListHeader } from '@ionic/vue';
import { onMounted, ref } from 'vue';

const router = useRouter()
const route = useRoute()
const showAwan1 = ref(false)
const showAwan2 = ref(false)
const showMasjid = ref(false)
const showBocil = ref(false)
const showTitle= ref(false)

const goToIndex = () => {
  router.push('/kelas')
}

onMounted(() => {
  setTimeout(() => {
    showAwan1.value = true
  }, 1000)
  setTimeout(() => {
    showAwan2.value = true
  }, 1500)
  setTimeout(() => {
    showTitle.value = true
  }, 3000)
})
</script>

<style scoped>
.right-enter-active,
.right-leave-active {
  /* transform: translateX(-10%); */
  left: -30%;
  opacity: 1;
  transition: all .9s ease-in-out;
}

.right-enter-from,
.right-leave-to {
  /* transform: translateX(-100%); */
  left: -100%;
  opacity: 0;
  transition: all .9s ease-in-out;
}
.left-enter-active,
.left-leave-active {
  /* transform: translateX(-10%); */
  right: -10%;
  opacity: 1;
  transition: all .9s ease-in-out;
}

.left-enter-from,
.left-leave-to {
  /* transform: translateX(-100%); */
  right: -100%;
  opacity: 0;
  transition: all .9s ease-in-out;
}

</style>
