# SPA Routing

Реализация "многостраничного" приложения в стиле SPA, где изменение DOM происходит за счет JavaScript.

## Описание

Приложение отображает список пользователей с использованием данных с [jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users).

## Маршруты

### Список пользователей

- **URL**: `/users` или `#users`
- **Данные**: [jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

### Список альбомов пользователя

- **URL**: `/users/{userId}/albums` или `#users/{userId}` (например, `#users/1/albums`)
- **Данные**: [jsonplaceholder.typicode.com/albums](https://jsonplaceholder.typicode.com/albums)

### Фотографии альбома

- **URL**: `/users/{userId}/albums/{albumId}` или `#users/{userId}/{albumId}` (например, `#users/1/albums/12`)
- **Данные**: [jsonplaceholder.typicode.com/photos](https://jsonplaceholder.typicode.com/photos)

## Особенности

- Поддержка бесконечной загрузки фотографий альбома (по 15 на страницу) с использованием технологии infinite scroll.
- Обработка ситуации при попытке перехода на несуществующую страницу, например, `#users/no-user`.

## Архитектура

Архитектура приложения должна быть реализована понятно и структурированно, разделив код на модули или компоненты для удобного управления маршрутизацией и отображением данных.

## Примеры решений

- [Примеры реализации подгрузки новой страницы во время скролла](https://habr.com/ru/sandbox/189534/)

