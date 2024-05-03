import { renderNewPhotos } from "./render.js"
import Api from "./Classes/Api.js"

let page = 1
const perPage = 15
let loading = false

export const handleScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        try {
            loading = true
            const albumId = parseInt(window.location.hash.split('/')[3])
            const newPhotos = await Api.fetchData(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_page=${page}&_limit=${perPage}`)
            if (newPhotos.length === 0) {
                window.removeEventListener('scroll', handleScroll)
                return
            }
            page++
            renderNewPhotos(newPhotos)
        } catch (error) {
            console.error('Ошибка при загрузке фотографий:', error)
        } finally {
            loading = false
        }
    }
}

export const handleAlbumChange = () => {
    window.removeEventListener('scroll', handleScroll)
    page = 1
    loading = false
    window.addEventListener('scroll', handleScroll)
}