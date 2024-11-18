<template>
    <div class="px-4 pb-8 mb-10">
        <h3 class="text-sky-700 font-bold mb-4">{{ props.materi.title }}</h3>
        <IonImg :src="materi.cover" @ionError="imgError"></IonImg>
        <IonText >
            <div class="text-justify mt-4" v-html="materi.content"></div>
        </IonText>
    </div>
</template>
    
<script setup>
    import { IonButton, IonBackButton, IonToolbar, IonButtons, IonHeader, IonTitle, IonFabButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonText, IonImg, IonFab, IonCardContent, IonCardSubtitle } from '@ionic/vue';
    import { ref, onBeforeMount, computed, defineAsyncComponent } from 'vue';

    const props = defineProps(({materi: Object}))

    const apiUri = computed(() => import.meta.env.VITE_API_URI)
    const imgError = (e) => {
        return e.target.src = '/public/ABID.png'
    }
</script>