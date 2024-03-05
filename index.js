const TelegramApi =  require('node-telegram-bot-api')
const token = '7022406574:AAFcS6sXs8aJYaDQ8PnJvJMmWGTIGD39xMM'
const {gameOption, againOption, startOption} = require('./options')
const bot = new TelegramApi(token, {polling: true});
const User = require('./models')
const db = require('./db')

const chats = {}

const lang = {}

const language = {
    uz:{
        start: 'Assalomu alekem'
    },
    ru:{
        start: 'Assalomu alekem'
    },
    eng:{
        start: 'Assalomu alekem'
    },
}

const startGame = async (chatId) => {
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Men hozir 0 dan 9 gacha raqam o\'yladim siz uni topishingiz kerak', gameOption)
}

const start = async () => {
    bot.setMyCommands([
        {command: '/start', description: 'Boshlash'},
        {command: '/setting', description: 'Sozlamalar'},
        {command: '/game', description: 'O\'yinni boshlash'},
        {command: '/info', description: 'O\'yin natijalari'},
    ])

    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        try {
            if(text === '/start'){
                const user = await User.findOne({chatId})
                if(!user){
                    (await User.create({chatId})).save()
                }
                // return bot.sendMessage(chatId, "Tilni tanlang", startOption)

                // const photo = './img/photo.jpg'
                // await bot.sendPhoto(chatId, photo, {caption: "I'm a bot!"});
                // await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/175/10e/17510e63-2d89-41ec-a18c-1e3351dd42b1/4.webp')
                await bot.sendSticker(chatId, './img/start.png')
                await bot.sendMessage(chatId, `Assalomu alekum ${msg.from.first_name}`)
                return bot.sendAudio(chatId, './audio/music.mp3');
            }
            if(text === '/info'){
                const user = await User.findOne({chatId})
                await bot.sendSticker(chatId, './img/image.png')
                return bot.sendMessage(chatId, `Sizda ${user.right} ta to'g'ri javob va ${user.wrong} ta noto'g'ri javob mavjud !`)
            }
            if(text === '/setting'){
                return bot.sendMessage(chatId, `Sozlamalar mavjud emas !`)
            }
            if(text === '/game') {
                return startGame(chatId)
            }
            return bot.sendMessage(chatId, 'Texnik sabablarga ko\'ra bot vaqtincha ishlamaydi')
        } catch (error) {
            console.log(error.message);
            return bot.sendMessage(chatId, 'Nomalum xatolik yuz berdi' )
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id
        try {
            if(data === '/again') {
                await bot.deleteMessage(chatId, msg.message.message_id)
                return startGame(chatId)
            }
            if(data === '/stop') {
                return bot.deleteMessage(chatId, msg.message.message_id)
            }
            const user = await User.findOne({chatId})
            if(data == chats[chatId]){
                user.right += 1 
                await bot.sendSticker(chatId, './img/right.png')
                await bot.sendMessage(chatId, `Tabriklayman siz men o'ylagan ${chats[chatId]} sonini topdingiz 🎉`, againOption)
                await bot.deleteMessage(chatId, msg.message.message_id)
                await bot.deleteChatStickerSet(chatId)
            } else {
                user.wrong += 1 
                await bot.sendSticker(chatId, './img/wrong.png')
                await bot.sendMessage(chatId, `Afsuskiy siz men o'ylagan ${chats[chatId]} sonini topa olmadingiz`, againOption)
                await bot.deleteMessage(chatId, msg.message.message_id)
                await bot.deleteChatStickerSet(chatId)
            }
            await User.findByIdAndUpdate(user._id, user, {new: true})
        } catch (error) {
            console.log(error.message);
            await bot.sendMessage(chatId, 'Iltimos ko\'ting kichik nosozlik yuz berdi')
        }
    })
}

start()