import fetch from "node-fetch";
import Telegraf from 'telegraf'

import constants from './src/constants.js';
import data from './src/data.js';

import logger from "./utils/logger.js";

const API_TOKEN = process.env.API_TOKEN;
const URL_STATICS = 'http://api.bluebeakstd.ru:3080/v1/buhbuh';

const bot = new Telegraf.Telegraf(API_TOKEN);

const C_SEND_STATICS = process.env.SEND_STATICS;

const generateStartText = () => {
    const text = `${constants.ROUTES.START.WELCOME}\n${constants.ROUTES.START.WHAT_CAN}\n`;
    const actions = `${(constants.ROUTES.START.ACTIONS.map(action => `${action.text}\n`)).join("")}`
    return `${text}\n${actions}`;
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

const sendStatics = (ctx) => {
    const username = ctx.message.from.username;
    const name = ctx.message.from.first_name;
    const country_code = ctx.message.from.language_code;
    const date = ctx.message.from.date;
    const action = ctx.message.from.text;

    logger.debug(`${username} - ${action}`)
    
    if(C_SEND_STATICS) {
        fetch(URL_STATICS, {
            method: 'POST',
            body: JSON.stringify({
                username,
                name,
                country_code,
                date,
                action
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(result => result.json())
            .then(data => {})
            .catch(err => console.error(`Не удалось отправить статистику на ${URL_STATICS}`, err.message))
    }
}

const randomNumber = (min, max) => {
    return Math.floor(Math.abs(min - 0.5 + Math.random() * (max - min + 1)))
}

const getRoutes = () => {
    let routes = ''

    const uniqueRoutes = [...new Set(data.routes.map((route, index) => `${route.key}. ${route.name}`))];
    uniqueRoutes.forEach((route) => routes += `${route}\n`)

    return routes
}

bot.start((ctx) => {
    sendStatics(ctx)
    ctx.reply(generateStartText())
})

bot.help((ctx) => {
    sendStatics(ctx)
    ctx.reply(generateStartText())
})

bot.command('/drink', (ctx) => {
    sendStatics(ctx);
    ctx.reply(constants.ROUTES.DRINK.replace('%routes%', getRoutes()))
});

bot.command('/sales', (ctx) => {
    sendStatics(ctx);
    ctx.reply(constants.ROUTES.SALES)
})

bot.command('/instagram', async (ctx) => {
    sendStatics(ctx);
    ctx.reply(constants.ROUTES.INSTAGRAM)
})

bot.command('/version', (ctx) => {
    ctx.reply(data.version)
})

bot.command('/debug', (ctx) => {
    ctx.reply('debug')
})


bot.on('text', (ctx) => {
    sendStatics(ctx);
    const filteredRoutes = data.routes.filter((route) => route.tags.includes(ctx.message.text.toLowerCase()))

    if (filteredRoutes.length) {
        try {
            const route = filteredRoutes[randomNumber(0, filteredRoutes.length - 1)]
            const text = barsText(`${route.name}\n`, route.bars.map(renderBars))
            ctx.reply(text);

            let url = `https://static-maps.yandex.ru/1.x/?l=map&ll=${route.bars[0].longitude},${route.bars[0].latitude}&size=450,450&pt=`;
            route.bars.forEach((bar, index) => {
                url += `${bar.longitude},${bar.latitude},pmwtm${index + 1}`
                if (index != route.bars.length - 1) {
                    url += '~'
                }
            });
            ctx.replyWithPhoto(url).then(r => {
                ctx.telegram.sendLocation(ctx.message.chat.id, route.bars[0].latitude, route.bars[0].longitude).then(r => {
                });
            })
        }
        catch (e) {
            logger.error(e)
        }

    } else {
        ctx.reply(constants.ROUTES.NOT_FOUND)
    }

})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
