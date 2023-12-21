import jwtInterceptor from '@/axios/auth-axios.instance'
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  jwtInterceptor.get(url)
    .then((res) => { return res.data })
    .then((data) => { data.value = data })
    .catch((err) => { error.value = err })

  return { data, error }
}

export function useSend(url) {
  const data = ref(null)
  const error = ref(null)

  jwtInterceptor.post(url)
    .then((res) => { return res.data })
    .then((data) => { data.value = data })
    .catch((err) => { error.value = err })

  return { data, error }
}