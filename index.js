const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const commands = require('./resources/commands')
const text = require('./resources/text')
const bot = new Telegraf(process.env.BOT_TOKEN);

// requiring axios module
const axios = require("axios").default

function addActionBot(name, src, text) {            // action bot func
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()               // disable clocs on buttons
            if (src != false) {
                await ctx.replyWithPhoto({          // check source photo
                    source: src
                })
            }
            if (name == 'btnpivo') {
                await ctx.replyWithHTML(text[Math.floor(Math.random() * (text.length))] + '\n\nПриколы', Markup.inlineKeyboard(              // buttons turn back
                    [
                        [Markup.button.callback('Еще пива', 'btnpivo'), Markup.button.callback('другие ржаки', 'btn3')],
                    ]
                ))
            }

            if (name == 'btnnegr') {
                await ctx.replyWithHTML(text[Math.floor(Math.random() * (text.length))] + '\n\nПриколы', Markup.inlineKeyboard(              // buttons turn back
                    [
                        [Markup.button.callback('Еще негра', 'btnnegr'), Markup.button.callback('другие ржаки', 'btn3')],
                    ]
                ))
            }
        }
        catch (e) {
            console.error(e);
        }
    })
}

bot.start((ctx) => ctx.reply('Ку ' + (ctx.message.from.first_name ? ctx.message.from.first_name : ctx.message.from.username) + '. Выбери приколы по душе: /npNkoJI'));
bot.help((ctx) => ctx.reply(commands.commands));
bot.command('npNkoJI', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Приколы: </b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Ржака про негров', 'btnnegr'), Markup.button.callback('Ржака про пиво', 'btnpivo')]
            ]
        ))
    }
    catch (e) {
        console.error(e);
    }
})

addActionBot('btnpivo', './resources/img/pivo1.jpg', text.pivo);
addActionBot('btnnegr', './resources/img/negr.png', text.negr);
bot.action('btn3', async (ctx) => {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Приколы: </b>', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Ржака про негров', 'btnnegr'), Markup.button.callback('Ржака про пиво', 'btnpivo')]
        ]
    ))

})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));