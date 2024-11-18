<template>
    <ion-page class="mb-12">
        <ion-content >
            
            <template v-for="(soal, s) in props.materi?.soals" :key="`soal-${s}`">
                <IonCard color="secondary" style="width: 90%" class="mx-auto">
                        <IonCardHeader>
                            <IonCardTitle class="flex justify-center" >
                                <IonChip color="light"  style="margin:auto;">
                                    <h3 class="font-bold text-center" style="">{{ s+1 }}</h3>
                                </IonChip>
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div class="mb-4 text-left" v-html="soal.pertanyaan"></div>
                            <IonList class="rounded shadow">
                                <IonItem v-for="pil in ['a','b','c','d']" button @click="jawab(soal,pil)" :color="!showResults && jawabans[s].jawaban == pil ? 'primary' : ''">
                                    <span slot="start">{{ pil }}.</span>
                                    <p v-html="soal[pil]" :class="(showResults && !jawabans[s].isBenar && jawabans[s].jawaban == pil) ? 'bg-red-200' : ((showResults && jawabans[s].isBenar && jawabans[s].jawaban == pil) ? 'bg-green-200' : '')">
                                            
                                    </p>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </IonCard>
            </template>
            <div class="end mt-2 mb-14 flex justify-center" >
                <IonButton color="secondary" id="btn-cek" @click="cekJawaban" :disabled="!showCheckButton">Cek Jawaban</IonButton>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonButton, IonPage, IonContent, IonList, IonItem, IonChip, IonLabel, IonCard, alertController, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { computed, onBeforeMount, ref } from 'vue';
import { Keyboard, Pagination, Scrollbar, Zoom, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'
import '@ionic/vue/css/ionic-swiper.css'
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

const modules = ref([
    Keyboard, Pagination, Scrollbar, Zoom, Navigation
])
const emit = defineEmits(['close'])
const props = defineProps({materi: Object})

const jawabans = ref([])
const showResults = ref(false)
const showCheckButton = computed(() => {
    let show = 0
    jawabans.value.forEach((jawaban) => {
        show += jawaban.jawaban !== null
    })

    return jawabans.value.length == show
})
// const isEnd = (swiper) => {
//     showCheckButton.value = swiper.isEnd
// }

const jawab = (soal, pilihan) => {
    let answer = jawabans.value.find(j => j.soalId === soal.id)
    answer.jawaban = pilihan
    answer.isBenar = pilihan === soal.kunci
    
}
const activeIndex =ref('2')
const cekJawaban = async () => {
    showResults.value = true
    let skor = Math.round((jawabans.value.reduce((a,c) => a + c.isBenar, 0)) / props.materi.soals.length * 100)
    const alert = await alertController.create({
        header: 'Hasil Latihan',
        message: `Kamu mendapatkan Skor: ${skor}`,
        buttons: [
            {
                text: 'Ulangi?',
                handler: async() => {
                    jawabans.value = []
                    showResults.value = false
                    initJawabanItems()
                }
            },
            {
                text: 'Ok',
            },
        ]
    })

    await alert.present()
}

const initJawabanItems = async() => {
    props.materi.soals.forEach(soal => {
        jawabans.value.push({
            soalId: soal.id,
            jawaban: null,
            isBenar: false
        })
    })
}
onBeforeMount(async() => {
    await initJawabanItems()
})
</script>

<style scoped>
.bg-sky-50 {
    background-color: aqua!important;
}
</style>