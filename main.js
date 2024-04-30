class Api {
    static async fetchData(url) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Не удалось получить данные')
        }
        return response.json()
    }
}

class Router {
    constructor() {
        this.routes = {}
        this.currentRoute = ''
        this.container = document.getElementById('app')
        window.addEventListener('hashchange', this.handleRouteChange.bind(this))
        window.addEventListener('load', this.handleRouteChange.bind(this))
    }

    async handleRouteChange() {
        const path = window.location.hash.slice(1)
        if (path === '') {
            this.navigateTo('home')
            return
        }
        this.currentRoute = path
        this.container.innerHTML = ''

        let matchedRoute = Object.keys(this.routes).find(route => {
            const routeParts = route.split('/')
            const pathParts = path.split('/')
            if (routeParts.length !== pathParts.length) return false
            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i] !== pathParts[i] && !routeParts[i].startsWith(':')) {
                    return false
                }
            }
            return true
        })

        if (!matchedRoute) {
            this.displayErrorPage()
            return
        }

        const routeHandler = this.routes[matchedRoute]
        if (routeHandler) {
            try {
                await routeHandler()
            } catch (error) {
                console.error(error)
                this.displayErrorPage()
            }
        } else {
            this.displayErrorPage()
        }
    }

    navigateTo(path) {
        window.location.hash = path
    }

    displayErrorPage() {
        const errorPage = document.createElement('div')
        errorPage.textContent = 'Страница не найдена'
        this.container.appendChild(errorPage)
    }

    registerRoute(path, handler) {
        this.routes[path] = handler
    }
}


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
    const photos = await Api.fetchData(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    renderPhotoList(photos)
})

function renderHomePage() {
    const homePage = document.createElement('div')
    homePage.classList.add('home-page')
    const title = document.createElement('h1')
    title.textContent = 'Это SPA'
    const instruction = document.createElement('p')
    instruction.textContent = 'Нажмите на кнопку "Пользователи" в навигации, чтобы убедиться, что маршрутизация работает.'
    homePage.appendChild(title)
    homePage.appendChild(instruction)
    document.getElementById('app').appendChild(homePage)
}

function renderUserList(users) {
    const userListContainer = document.createElement('div')
    userListContainer.classList.add('user-list')

    users.forEach(user => {
        const userCard = document.createElement('div')
        userCard.classList.add('user-card')

        const gridContainer = document.createElement('div')
        gridContainer.classList.add('grid-container')

        const labels = ['Настоящее имя:', 'Никнейм:', 'Email:']
        const values = [user.name, user.username, user.email]

        labels.forEach((label, index) => {
            const labelElement = document.createElement('div')
            labelElement.textContent = label
            labelElement.classList.add('label')
            gridContainer.appendChild(labelElement)

            const valueElement = document.createElement('div')
            valueElement.textContent = values[index]
            valueElement.classList.add('value')
            gridContainer.appendChild(valueElement)
        })

        userCard.appendChild(gridContainer)
        userListContainer.appendChild(userCard)

        userCard.addEventListener('click', () => {
            window.location.hash = `users/${user.id}`
        })
    })

    document.getElementById('app').appendChild(userListContainer)
}

function renderAlbumList(albums) {
    const albumListContainer = document.createElement('div')
    albumListContainer.classList.add('album-list')

    albums.forEach(album => {
        const albumCard = document.createElement('div')
        albumCard.classList.add('album-card')
        albumCard.textContent = album.title

        albumCard.addEventListener('click', () => {
            window.location.hash = `users/${album.userId}/albums/${album.id}`
        })

        albumListContainer.appendChild(albumCard)
    })

    document.getElementById('app').appendChild(albumListContainer)
}


function renderPhotoList(photos) {
    const photoList = document.createElement('ul')
    photos.forEach(photo => {
        const photoItem = document.createElement('li')
        const img = document.createElement('img')
        img.src = photo.thumbnailUrl
        photoItem.appendChild(img)
        photoList.appendChild(photoItem)
    })
    document.getElementById('app').appendChild(photoList)
}
