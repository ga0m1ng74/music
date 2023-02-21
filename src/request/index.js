import axios from 'axios'

let reqService = axios.create({
    baseURL: "https://netease-cloud-music-6cqjiup3o-ga0m1ng74.vercel.app",
    timeout: 5000,
})

export default reqService