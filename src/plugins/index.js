// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import VueCookies from 'vue3-cookies'
import moment from 'moment'
import i18n from '@/i18n'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(VueCookies,{ expireTimes: '1d' })
    .config.globalProperties.$filters = {
      fromNow(value){
          return moment(value, "YYYYMMDD").fromNow();
      },
      userName(email,first,last){
        return (!! first && !! last) ? `${first} ${last}` : email.split('@')[0]
      }
  }
}