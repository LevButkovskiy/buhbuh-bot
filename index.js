import fetch from "node-fetch";
import Telegraf from 'telegraf'

const API_TOKEN = process.env.API_TOKEN
const URL_STATICS = 'http://api.bluebeakstd.ru:3080/v1/buhbuh'

const bot = new Telegraf.Telegraf(API_TOKEN)

const generateStartText = () => {
    const startText = 'Привет! Ты попал в бота BuhBuh.';
    const whatWeCan = 'Что умеет бот:';
    const actionDrink = '/drink и получишь список маршрутов 🍻';
    const actionSales = '/sales для получения скидки в бар💰';

    return `${startText}\n${whatWeCan}\n${actionDrink}\n${actionSales}`
}

const bars1 = [
    {
        title: 'Oversize pizza club',
        address: 'Гражданская улица 13-15'
    },
    {
        title: 'El Copitas Bar',
        address: 'Колокольная 2/18'
    },
    {
        title: 'Paloma Cantina',
        address: 'Садовая ул. 8/7'
    },
    {
        title: 'Krang pizza',
        address: 'Гороховая 28',
    },
    {
        title: 'Chuck',
        address: 'Гороховая 41',
    },
    {
        title: 'Bar 812',
        address: 'Жуковского 11'
    },
    {
        title: 'Barquinta',
        address: 'Жуковского 7-9'
    }
];


const bars2 = [
    {
        title: 'Commod',
        address: 'Рубинштейна 1'
    },
    {
        title: 'УЕБар',
        address: 'ул Восстания 12'
    },
    {
        title: 'Пробирка',
        address: 'ул Ломоносова 2'
    },
    {
        title: '«Хроники»',
        address: 'пл. Восстания, 24'
    },
    {
        title: 'Бар Dead Poets',
        address: 'ул. Жуковского, 12'
    },
    {
        title: 'Union',
        address: 'Литейный пр., 55'
    },
    {
        title: '«Терминал»',
        address: 'ул. Белинского, 11'
    },
];

const bars3 = [
    {
        title: 'Cocos Lounge Bar',
        address: 'Лиговский Проспект 10'
    },
    {
        title: 'Black Heart Bar',
        address: 'на Гороховой'

    },
    {
        title: '4 Head’s Bar',
        address: 'на Ропшинской улице'
    },
    {
        title: 'Mr. Toad',
        address: 'на Коломенской улице'
    },
    {
        title: 'Xander Bar',
        address: 'отель Four Seasons, Адмиралтейская'
    },
]

const bars4 = [
    {
        title: 'The Hat',
        address: 'ул. Белинского, 9'
    },
    {
        title: '«Продукты»',
        address: 'наб. Фонтанки, 17'

    },
    {
        title: 'Mishka Bar',
        address: 'наб. Фонтанки, 40'
    },
    {
        title: '«Цветочки»',
        address: 'ул. Рубинштейна, 23'
    },
    {
        title: 'Mitte',
        address: 'ул. Рубинштейна, 27'
    },
    {
        title: 'Wood Bar',
        address: 'ул. Марата, 34'
    },
    {
        title: 'Zing',
        address: 'ул. Ломоносова, 14'
    },
    {
        title: 'Poison',
        address: 'ул. Думская, 9'
    },
    {
        title: 'Kopen',
        address: 'Конюшенная пл., 2'
    },
]

const routes = [
    {
        name: 'Персональный 1',
        bars: bars1,
        tags: ['персональный', 'личный', 'второй', '2', '2.', '2.персональный', '2. персональный']
    },
    {
        name: 'Персональный 2',
        bars: bars2,
        tags: ['персональный', 'личный', 'второй', '2', '2.', '2.персональный', '2. персональный']
    },
    {
        name: 'Персональный 3',
        bars: bars3,
        tags: ['персональный', 'личный', 'второй', '2', '2.', '2.персональный', '2. персональный']
    },
    {
        name: 'Маршрут "Поперечного"',
        bars: bars4,
        tags: ['поперечный', 'поперечного', 'дани поперечного', 'первый', '1', '1.', '1.маршрут "поперечного"', '1. поперечного', 'маршрут поперечного']
    }
]

const renderBars = (bar, index) => {
    if (bar.address) {
        return `${index + 1}. ${bar.title} - ${bar.address} \n`;
    }
    return `${index + 1}. ${bar.title}\n`;
}

const barsText = (title, arr) => {
    let finalString = '';
    arr.forEach(element => {
        finalString += element;
    });

    return title + finalString;
}

const sendStatics = (username, name, country_code, date, action) => {
    let data = {
        username,
        name,
        country_code,
        date,
        action
    }

    let strData = JSON.stringify(data);
    console.log(strData)

    fetch(URL_STATICS, {
        method: 'POST',
        body: strData,
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(result => result.json())
        .then(data => console.log(data))
        .catch(err => console.error(`Не удалось получить статистику с ${URL_STATICS}`, err.message))
}

const randomNumber = (min, max) => {
    return Math.floor(Math.abs(min - 0.5 + Math.random() * (max - min + 1)))
}

bot.start((ctx) => {
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text)
    ctx.reply(generateStartText())
})

bot.help((ctx) => ctx.reply(generateStartText()))

bot.command('/drink', (ctx) => {
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text)
    ctx.reply('У нас есть несколько маршрутов:\n1.Маршрут "Поперечного"\n2.Персональный\n\nТебе какой?')
});

bot.command('/sales', (ctx) => {
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text)
    ctx.reply('10% на все, везде. Промокод: BUHBUH10')
})

bot.on('text', (ctx) => {
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text)

    // добавил вывод рандомного маршрута. До этого если выбирать персональный маршрут выводится только третий
    const filteredRoutes = routes.filter((route) => route.tags.includes(ctx.message.text.toLowerCase()))

    if (filteredRoutes.length) {
        const route = filteredRoutes[randomNumber(0, filteredRoutes.length - 1)]
        ctx.reply(barsText(`${route.name}\n`, route.bars.map(renderBars)))
    } else {
        ctx.reply('Такого у нас нет. Попробуй другой')
    }

})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
