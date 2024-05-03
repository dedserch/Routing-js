import Router from './Classes/Router.js'
import Api from './Classes/Api.js'
import { renderAlbumList, renderHomePage, renderPhotoList, renderUserList } from './render.js'
import { handleAlbumChange} from './helpers.js'

const router = new Router()

router.registerRoute('home', async () => {
    renderHomePage()
})

router.registerRoute('users', async () => {
    const users = await Api.fetchData('https://jsonplaceholder.typicode.com/users')
    renderUserList(users)
})

router.registerRoute('users/:userId', async () => {
    const userId = parseInt(window.location.hash.split('/')[1])
    const albums = await Api.fetchData(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    renderAlbumList(albums)
})


router.registerRoute('users/:userId/albums/:albumId', async () => {
    const [, userId, , albumId] = window.location.hash.split('/').map(str => parseInt(str))
    handleAlbumChange()
    const photos = await Api.fetchData(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_page=1&_limit=15`)
    renderPhotoList(photos)
})
