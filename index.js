const API_TOKEN = 'PAST TOKEN HERE';
const footer1 = 'Маршрут 1.\n\n';
const footer2 = 'Маршрут 2.\n\n'

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

const { Telegraf } = require('telegraf')
const bot = new Telegraf(API_TOKEN)
bot.start((ctx) => ctx.reply(generateStartText()))
bot.help((ctx) => ctx.reply('Help'))
bot.command('/drink', (ctx) => ctx.reply('У нас есть несколько маршрутов:\n1.Маршрут "Поперечного"\n2.Персональный\n\nТебе какой?'));
bot.on('text', (ctx) => {
    let route = null;

    routes.forEach((routeEl) => {
        if (routeEl.tags.includes(ctx.message.text.toLowerCase())) {
            route = routeEl;
        }
    })

    if (route) {
        ctx.reply(barsText(`${route.name}\n`, route.bars.map(renderBars)))
    } else {
        ctx.reply('Такого у нас нет. Попробуй другой')
    }
})

bot.command('sales', (ctx) => ctx.reply('10% на все, везде. Промокод: BUHBUH10'))

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
