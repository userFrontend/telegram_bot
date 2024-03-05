const TelegramApi =  require('node-telegram-bot-api')
const token = '7022406574:AAFcS6sXs8aJYaDQ8PnJvJMmWGTIGD39xMM'
const {gameOption, againOption} = require('./options')
const bot = new TelegramApi(token, {polling: true});

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Men hozir 0 dan 9 gacha raqam o\'ladim siz uni topishingiz kerak')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Toping', gameOption)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Boshlash'},
        {command: '/setting', description: 'Sozlamalar'},
        {command: '/game', description: 'O\'yin'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start'){
           await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/175/10e/17510e63-2d89-41ec-a18c-1e3351dd42b1/4.webp')
           return bot.sendMessage(chatId, `Assalomu alekum`)
        }
        if(text === '/setting'){
           return bot.sendMessage(chatId, `Sozlamalar mavjud emas !`)
        }
        if(text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Texnik sabablarga ko\'ra bot vaqtincha ishlamaydi')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id
        if(data === '/again') {
            return startGame(chatId)
        }
        if(data === chats[chatId]){
            return await bot.sendMessage(chatId, `Tabriklayman siz men o'ylagan ${chats[chatId]} sonini topdingiz 🎉`, againOption)
            // return await bot.deleteMessage(chatId, {messageId: msg.message.message_id})
        } else {
            return await bot.sendMessage(chatId, `Afsuskiy siz men o'ylagan ${chats[chatId]} sonini topa olmadingiz`, againOption)
            // return await bot.deleteMessage(chatId, {messageId: msg.message.message_id})
        }
    })
}

start()