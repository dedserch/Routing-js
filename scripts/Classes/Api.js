export default class Api {
    static async fetchData(url) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Не удалось получить данные')
        }
        return response.json()
    }
}
