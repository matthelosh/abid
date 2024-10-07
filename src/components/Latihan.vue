<template>
    <IonCard class="soal mb-6" v-for="soal,s in props.materi.soals">
        <IonList>
            <IonItem>
                <span slot="start">
                    {{ s+1 }}. 
                </span>
                <IonLabel><span class="font-bold" v-html="soal.pertanyaan"></span>
                </IonLabel>

            </IonItem>
        </IonList>
        <IonList>
            <IonItem v-for="pil in ['a','b','c','d']" button @click="jawab(soal,pil)">
                <span slot="start">{{ pil }}.</span>
                <p v-html="soal[pil]" :class="(showResults && !jawabans[s].isBenar && jawabans[s].jawaban == pil) ? 'text-red-500' : ((showResults && jawabans[s].isBenar && jawabans[s].jawaban == pil) ? 'text-green-500' : '')">
                        
                </p>
            </IonItem>
        </IonList>
    </IonCard>
    <div class="end mt-2 mb-14 flex justify-center">
        <IonButton color="primary" id="btn-cek" @click="cekJawaban">Cek Jawaban</IonButton>
    </div>
</template>

<script setup>
import { IonButtons,IonButton, IonContent,IonFab, IonFabButton, IonTitle, IonToolbar, IonList, IonItem, IonText, IonLabel, IonCard, IonAlert, alertController } from '@ionic/vue';
import { Icon } from '@iconify/vue'
import { onBeforeMount, ref } from 'vue';
const emit = defineEmits(['close'])
const props = defineProps({materi: Object})

const jawabans = ref([])
const showResults = ref(false)

const jawab = (soal, pilihan) => {
    let answer = jawabans.value.find(j => j.soalId === soal.id)
    answer.jawaban = pilihan
    answer.isBenar = pilihan === soal.kunci
    
    // alert(pilihan === soal.kunci)
}

const cekJawaban = async () => {
    // console.log(jawabans.value)
    showResults.value = true
    const alert = await alertController.create({
        header: 'Hasil Latihan',
        message: `Kamu mendapatkan Skor: ${jawabans.value.reduce((a,c) => a + c.isBenar, 0)}`,
        buttons: ['Ok']
    })

    await alert.present()
}
onBeforeMount(() => {
    props.materi.soals.forEach(soal => {
        jawabans.value.push({
            soalId: soal.id,
            jawaban: '',
            isBenar: false
        })
    })
})
</script>