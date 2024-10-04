<template>
      <IonHeader fixed>
          <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton default-href="/"></IonBackButton>
            </IonButtons>
              <IonTitle>Index Kelas</IonTitle>
          </IonToolbar>
      </IonHeader>
    <IonContent class="ion-padding">
        <IonList>
            <IonListHeader>Pilih Kelas:</IonListHeader>
            <IonItem v-for="k in 6" @click="goto(k)">
                Kelas {{ k }}
            </IonItem>
        </IonList>

        <img src="/home/bocil.png" alt="">
    </IonContent>
    
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, IonList, IonItem, IonLabel, IonButton, IonListHeader, IonFooter, IonBackButton } from '@ionic/vue';
import { onMounted, ref } from 'vue';

const router = useRouter()
const route = useRoute()

const goto = (k) => {
    alert(k)
}

onMounted(() => {
})
</script>

<style scoped>

</style>
