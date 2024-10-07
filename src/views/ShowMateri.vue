<template>
<div v-if="mode == 'list'" style="height:100vh;">
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
                <ion-label>Pilih Materi:</ion-label>
            </ion-list-header>
            <ion-item
                v-for="(materi,m) in materis.data"
                button
                @click="openMateri(materi)"
            >
                <span slot="start">{{ m+1 }}</span>
                <ion-label>{{ materi.title }}</ion-label>
            </ion-item>
        </ion-list>
    </ion-content>
</div>
<Materi v-else :materi="selectedMateri" @close="closeMateri" />
</template>

<script setup>
import { IonButtons, IonBackButton, IonHeader, IonAlert, IonTitle, IonToolbar, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonToast, IonSpinner } from '@ionic/vue';
import { ref, reactive, defineAsyncComponent, computed, onBeforeMount } from 'vue';
import { Http } from '@capacitor-community/http';
import NotFound from '../components/NotFound.vue';

import { useRouter, useRoute } from 'vue-router';
import { Storage } from '@capacitor/storage';

const Materi = defineAsyncComponent(() => import('../components/Materi.vue'))
const mode = ref('list')
const selectedMateri = ref(null)
const router = useRouter()
const route = useRoute()
const materis = ref([])
const apiServer = ref(null)
const loading = ref(false)
const params = computed(() => {
    return route.params
})

const openMateri = (materi) => {
    mode.value = 'baca'
    selectedMateri.value = materi
}

const closeMateri = () => {
    selectedMateri.value = null
    mode.value = 'list'
}
const error = reactive({
    isError: false,
    message: 'Maaf, ada error'
})

const Bab = defineAsyncComponent({
    loader: () => import(`./Kelas${params.value.kelas}/Bab.vue`),
    loadingComponent: NotFound,
    errorComponent: NotFound,
    delay: 200,
    timeout: 3000,
    onError(error, retry, fail, attempts) {
        return false
    },
})



const open = (num) => {
    router.push(`/kelas/${params.value.kelas}/bab/${num}`)
}

// const apiServer = computed(async() => {
//     const server = await Storage.get({key: 'apiServer'})
//     return server.value
// })

const HttpOptions = {
    url: '',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

onBeforeMount(async() => {
    const server = await Storage.get({key: 'apiServer'})
    apiServer.value = server
    loading.value = true
    HttpOptions.url = server.value+'/api/abid/materi?bab='+params.value.bab
    materis.value = await Http.request(HttpOptions)
            .catch(err => {
                if (err.message.includes('Failed to fetch')) {
                    error.isError = true
                    error.message = 'Tidak terhubung dengan server. Cek pengaturan atau koneksi internet'
                }
            })
            .finally(() => loading.value = false)

})

</script>