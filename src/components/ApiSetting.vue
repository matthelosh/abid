<template>
    <ion-modal ref="modal" :is-open="show" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()" color="danger">Batal</ion-button>
          </ion-buttons>
          <ion-title>Welcome</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()" color="primary">Simpan</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-input
            label="Alamat Server API"
            label-placement="stacked"
            ref="input"
            type="text"
            placeholder="Masukkan alamat server"
            :value="apiServer"
          ></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { Storage } from '@capacitor/storage';

import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
  } from '@ionic/vue';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { onBeforeMount, ref } from 'vue';

  const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');
  const props = defineProps({show: Boolean})
  const emit = defineEmits(['close'])
  const modal = ref();
  const input = ref();

  const cancel = () => emit('close');
  const apiServer = ref('halo')
  const confirm = async() => {
    // alert(tes.value)
    const apiServer = input.value.$el.value;
    // alert(apiServer)
    await Storage.set({
        key: 'apiServer',
        value: apiServer
    })
    emit('close', apiServer)
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      message.value = `Hello, ${ev.detail.data}!`;
    }
  };

  onBeforeMount(async() => {
    let storedApiServer = await Storage.get({key: 'apiServer'})
    // Storage.remove({key: 'apiServer'})
    apiServer.value = storedApiServer.value ?? 'Masukkan Alamat Server'
    
  })
</script>