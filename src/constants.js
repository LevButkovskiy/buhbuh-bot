const ROUTES = {
    START: {
        WELCOME: "Привет! Ты попал в бота BuhBuh.",
        WHAT_CAN: "Что умеет бот:",
        ACTIONS: [
            {
                action: "drink",
                text: "/drink и получишь список маршрутов 🍻"
            },
            {
                action: "sales",
                text: "/sales для получения скидки в бар💰"
            },
            {
                action: "instagram",
                text: "/instagram - наш инстаграм"
            },
        ]
    },
    INSTAGRAM : "Наш инстаграм: \nhttps://instagram.com/buhbuhdrink",
    SALES: "10% на все, везде. Промокод: BUHBUH10",
    NOT_FOUND: "Такого у нас нет. Попробуй другой",
    DRINK: "У нас есть несколько маршрутов:\n%routes%\nТебе какой?"
}

export default {
    ROUTES
}
