<template>
    <IonContent>
    <IonTabs>
        <IonTab tab="baca">
            <IonContent id="baca-page">
                <ion-header>
                    <ion-toolbar>
                        <IonButtons slot="start">
                            <IonBackButton :default-href="'/kelas'"></IonBackButton>
                        </IonButtons>
                        <ion-title>Baca Materi</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
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
    import { IonButton, IonBackButton, IonHeader, IonTitle, IonToolbar, IonFabButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonText, IonImg, IonFab, IonCardContent, IonCardSubtitle, IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonButtons } from '@ionic/vue';
    import { ref, onBeforeMount, computed, defineAsyncComponent } from 'vue';
    import { Http } from '@capacitor-community/http';
    import { Storage } from '@capacitor/storage';
    import { useRouter, useRoute } from 'vue-router';
    import { create, book} from 'ionicons/icons';
    import { Icon } from '@iconify/vue'
    const BacaMateri = defineAsyncComponent(() => import('./BacaMateri.vue'))
    const Latihan = defineAsyncComponent(() => import('./Latihan.vue'))
    const mode = ref('list')
    const router = useRouter()
    const route = useRoute()
    const props = defineProps({materi: Object})
    </script>