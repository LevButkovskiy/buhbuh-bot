import fetch from "node-fetch";
import Telegraf from 'telegraf'

import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./src/data.json'));

const API_TOKEN = process.env.API_TOKEN
const URL_STATICS = 'http://api.bluebeakstd.ru:3080/v1/buhbuh'

const bot = new Telegraf.Telegraf(API_TOKEN);

const generateStartText = () => {
    const startText = 'Привет! Ты попал в бота BuhBuh.';
    const whatWeCan = 'Что умеет бот:';
    const actionDrink = '/drink и получишь список маршрутов 🍻';
    const actionSales = '/sales для получения скидки в бар💰';

    return `${startText}\n${whatWeCan}\n${actionDrink}\n${actionSales}`
}

const renderBars = (bar, index) => {
    if (bar.address) {
        return `${index + 1}. ${bar.title} - ${bar.address} \n`;
    }
    return `${index + 1}. ${bar.title}\n`;
}

const barsText = (title, arr) => {
    const footerMap = '\nВысылаем координаты первого бара:\n';
    const byeText = "🌘 Хорошего вечера!"
    let finalString = '';
    arr.forEach(element => {
        finalString += element;
    });

    return title + finalString + footerMap + byeText;
}

const sendStatics = (username, name, country_code, date, action) => {
    if(process.env.SEND_STATICS) {
        let data = {
            username,
            name,
            country_code,
            date,
            action
        }

        let strData = JSON.stringify(data);

        fetch(URL_STATICS, {
            method: 'POST',
            body: strData,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(result => result.json())
            .then(data => {
            })
            .catch(err => console.error(`Не удалось получить статистику с ${URL_STATICS}`, err.message))
    }
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
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text);
    const uniqueRoutes = [...new Set(data.routes.map((route, index) => `${route.key}. ${route.name}`))];
    const routesArr = uniqueRoutes.map((route) => `${route}\n`)
    let routesText = ''
    routesArr.forEach((route) => routesText += route);
    ctx.reply(`У нас есть несколько маршрутов:\n${routesText}\nТебе какой?`)
});

bot.command('/sales', (ctx) => {
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text)
    ctx.reply('10% на все, везде. Промокод: BUHBUH10')
})

bot.command('/test', (ctx) => {

})

bot.command('/instagram', async (ctx) => {
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text);
    ctx.reply(ctx.message.chat_id, "<a href='https://instagram.com/buhbuhdrink'>instagram.com/buhbuhdrink</a>")
})

bot.command('/version', (ctx) => {
    ctx.reply('1.0.3')
})


bot.on('text', (ctx) => {
    sendStatics(ctx.message.from.username, ctx.message.from.first_name, ctx.message.from.language_code, ctx.message.date, ctx.message.text)

    // добавил вывод рандомного маршрута. До этого если выбирать персональный маршрут выводится только третий
    const filteredRoutes = data.routes.filter((route) => route.tags.includes(ctx.message.text.toLowerCase()))

    if (filteredRoutes.length) {
        const route = filteredRoutes[randomNumber(0, filteredRoutes.length - 1)]
        const text = barsText(`${route.name}\n`, route.bars.map(renderBars))
        ctx.reply(text);
        ctx.telegram.sendLocation(ctx.message.chat.id, route.bars[0].latitude, route.bars[0].longitude);

        let url = `https://static-maps.yandex.ru/1.x/?l=map&ll=${route.bars[0].longitude},${route.bars[0].latitude}&size=450,450&pt=`;
        route.bars.forEach((bar, index) => {
            url += `${bar.longitude},${bar.latitude},pmwtm${index + 1}`
            if (index != route.bars.length - 1) {
                url += '~'
            }
        });
        ctx.replyWithPhoto('https://picsum.photos/200/300/')
    } else {
        ctx.reply('Такого у нас нет. Попробуй другой')
    }

})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
