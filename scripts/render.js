import { handleScroll } from "./helpers.js"
export const renderHomePage = () => {
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

export const renderUserList = (users) => {
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

export const renderAlbumList = (albums) => {
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

export const renderPhotoList = (photos) => {
    const photoListContainer = document.createElement('div')
    photoListContainer.classList.add('photo-list')

    photos.forEach(photo => {
        const photoItem = document.createElement('div')
        photoItem.classList.add('photo-item')

        const img = document.createElement('img')
        img.src = photo.thumbnailUrl

        const title = document.createElement('div')
        title.classList.add('photo-title')
        title.textContent = photo.title

        photoItem.appendChild(img)
        photoItem.appendChild(title)
        photoListContainer.appendChild(photoItem)
    })

    window.addEventListener('scroll', handleScroll)
    document.getElementById('app').appendChild(photoListContainer)
}

export const renderNewPhotos = (photos) => {
    const photoListContainer = document.querySelector('.photo-list')
    photos.forEach(photo => {
        const photoItem = document.createElement('div')
        photoItem.classList.add('photo-item')

        const img = document.createElement('img')
        img.src = photo.thumbnailUrl

        const title = document.createElement('div')
        title.classList.add('photo-title')
        title.textContent = photo.title

        photoItem.appendChild(img)
        photoItem.appendChild(title)
        photoListContainer.appendChild(photoItem)
    })
}