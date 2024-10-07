<template>
<ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button :default-href="'/'"></ion-back-button>
      </ion-buttons>
      <ion-title>Materi Kelas {{ params.kelas }}</ion-title>
    </ion-toolbar>
</ion-header>
  <IonContent>
    <IonList>
        <IonListHeader>
            <IonLabel>Pilih Bab:</IonLabel>
        </IonListHeader>
        <IonItem v-for="(bab, b) in babs.data" button @click="lihatMateri(bab)">
            <IonLabel>{{ bab.label }}</IonLabel>
        </IonItem>
    </IonList>

    <IonList v-if="loading">
      <IonItem v-for="i in 10">
        <IonSkeletonText :animated="true" style="height: 20px;"></IonSkeletonText>
      </IonItem>
    </IonList>
  </IonContent>
  
</template>

<script setup>
import { computed, onBeforeMount , reactive, ref} from 'vue';
import { Storage } from '@capacitor/storage';
import { Http } from '@capacitor-community/http';
import { useRoute, useRouter } from 'vue-router';
import { IonBackButton, IonItem, IonTitle, IonButtons, IonHeader, IonToolbar, IonContent, IonList, IonListHeader, IonLabel, IonLoading, IonSkeletonText } from '@ionic/vue';

const loading = ref(false)
const apiServer = ref('')
const route = useRoute()
const router = useRouter()
const params = computed(() => route.params)
const error = reactive({
  isError: false,
  message: 'Pesan'
})

const babs = ref([])
const HttpOptions = {
    url: '',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

const lihatMateri = (bab) => {
    router.push(`/kelas/${bab.tingkat}/bab/${bab.id}`)
}

onBeforeMount(async() => {
    const server = await Storage.get({key: 'apiServer'})
    apiServer.value = server
    loading.value = true
    HttpOptions.url = server.value+'/api/abid/bab?kelas='+params.value.kelas
    babs.value = await Http.request(HttpOptions)
            .catch(err => {
                if (err.message.includes('Failed to fetch')) {
                    error.isError = true
                    error.message = 'Tidak terhubung dengan server. Cek pengaturan atau koneksi internet'
                }
            })
            .finally(() => loading.value = false)

})

</script>