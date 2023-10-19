import { createApp } from 'vue'
import "@/scss/style.scss"
import '@/scss/popup.scss'
import App from './App.vue'
import router from '@/router/router'
import { createPinia } from 'pinia'
import ATSSelectElement from '@/assets/elem/atsselect'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileCode, faImage, faFileExcel, faList, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

library.add(faFileCode, faImage, faFileExcel, faList, faPuzzlePiece)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')

customElements.define('ats-select', ATSSelectElement)