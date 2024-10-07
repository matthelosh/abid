<template>
    <IonContent>
        <div class="list" v-if="mode == 'list'">
            <IonList>
                <IonListHeader>
                    <IonLabel>Pilih Materi:</IonLabel>
                </IonListHeader>
                <IonItem
                    v-for="(materi, m) in materis"
                    @click="open(materi)"
                >
                    <IonText>
                        {{m+1}}. {{ materi.title }}
                    </IonText>
                </IonItem>
            </IonList>
        </div>
        <div v-else class="baca">
            <article class="font-serif">
                <h1 class="text-justify text-sky-700 font-bold">{{ selectedMateri.title }}</h1>
                <IonImg :src="selectedMateri.cover"></IonImg>
                <div class="text-justify mt-6" v-html="selectedMateri.content"></div>
            </article>
        </div>
    </IonContent>
    </template>
    
    <script setup>
    import { IonButtons, IonBackButton, IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonText, IonImg } from '@ionic/vue';
    import { ref, onBeforeMount, computed } from 'vue';
    import { Http } from '@capacitor-community/http';
    import { Storage } from '@capacitor/storage';
    import { useRouter, useRoute } from 'vue-router';
    const mode = ref('list')
    const router = useRouter()
    const route = useRoute()
    const materis = ref([])
    const selectedMateri = ref(null)
    const params = computed(() => {
        return route.params
    })
    const open = (materi) => {
        mode.value = 'baca'
        selectedMateri.value = materi
    }
    const HttpOptions = {
        url: '',
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const getMateris = async() => {
        const {data} = await Http.request(HttpOptions)
        materis.value = data
    }

onBeforeMount(async() => {
    const server = await Storage.get({key: 'apiServer'})
    HttpOptions.url = server.value+'/abid/materi?bab='+params.value.bab
    getMateris()
})
    </script>