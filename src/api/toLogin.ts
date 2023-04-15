import axios from 'axios'

export const toLogin = (user: any) => {
    axios.post('/api/toLogin', user)
}