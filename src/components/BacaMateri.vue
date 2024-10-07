<template>
    <h3 class="text-sky-700 font-bold mb-4">{{ props.materi.title }}</h3>
    <IonImg :src="props.materi.cover"></IonImg>
    <IonText >
        <div class="text-justify mt-4" v-html="materi.content"></div>
    </IonText>
    <div class="end my-4">tes</div>
</template>
    
<script setup>
    import { IonButton, IonBackButton, IonToolbar, IonButtons, IonHeader, IonTitle, IonFabButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonText, IonImg, IonFab, IonCardContent, IonCardSubtitle } from '@ionic/vue';
    import { ref, onBeforeMount, computed, defineAsyncComponent } from 'vue';

    const props = defineProps(({materi: Object}))
</script>