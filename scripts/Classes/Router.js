export default class Router {
    constructor() {
        this.routes = {}
        this.currentRoute = ''
        this.container = document.getElementById('app')
        window.addEventListener('hashchange', this.handleRouteChange.bind(this))
        window.addEventListener('load', this.handleRouteChange.bind(this))
    }

    handleRouteChange = async () => {
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

    navigateTo = (path) => {
        window.location.hash = path
    }

    displayErrorPage = () => {
        const errorPage = document.createElement('div')
        errorPage.textContent = 'Страница не найдена'
        this.container.appendChild(errorPage)
    }

    registerRoute = (path, handler) => {
        this.routes[path] = handler
    }
}
