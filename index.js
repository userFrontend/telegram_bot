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
    const randomNumber = Math.floor(Math.random(1) * 100)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Men 1 dan 100 gacha 1 ta sonni o'yladim.Siz shu sonni 6 ta urunishda topishingiz kerak bo'ladi.Tayyor bo'lsangiz boshlang.", againOption)
}

let root = 0;
addCount = async (chatId) => {
    const user = await User.findOne({chatId})
    root += 1;
    if (root >= 6) {
      root = 0
      user.wrong += 1
      await User.findByIdAndUpdate(user._id, user, {new: true})
      return await bot.sendMessage(chatId, "Limit tugadi siz yutqazdingiz 🧐" +
        " Men o'ylagan son: " +
        "[" +
        chats[chatId] +
        "]" +
        " edi", againOption)
      
    }
  };

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
            const user = await User.findOne({chatId})
            if(text === '/info'){
                
                return bot.sendMessage(chatId, `Sizda ${user.right} ta to'g'ri javob va ${user.wrong} ta noto'g'ri javob mavjud !`)
            }
            if(text === '/setting'){
                return bot.sendMessage(chatId, `Sozlamalar mavjud emas !`)
            }
            if(text === '/game') {
                return startGame(chatId)
            }
            if (text == "") {
                await bot.sendMessage(chatId, "Son kiriting🚫:");
                return addCount(chatId)
              } else if (text * 1 > 100 || text * 1 < 0) {
                  await bot.sendMessage(chatId, "1 dan 100 gacha oraliqdagi sonlarni kiriting! 🚫");
                  return addCount(chatId)
              } else if (text * 1 == chats[chatId]) {
                root = 0
                user.right += 1
                await User.findByIdAndUpdate(user._id, user, {new: true})
                return bot.sendMessage(chatId, "Tabriklaymiz siz to'g'ri toptingiz 🎉", againOption)
              } else if (text * 1 > chats[chatId]) {
                  await bot.sendMessage(chatId, "Siz kiritgan son men o'ylagan sondan katta! 😏")
                  return addCount(chatId)
              } else if (text * 1 < chats[chatId]) {
                  await bot.sendMessage(chatId, "Siz kiritgan son men o'ylagan sondan kichik! 🙃")
                  return addCount(chatId)
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
                root = 0
                await bot.deleteMessage(chatId, msg.message.message_id)
                return startGame(chatId)
            }
            if(data === '/stop') {
                root = 0
                return bot.deleteMessage(chatId, msg.message.message_id)
            }
            const user = await User.findOne({chatId})
            if(data == chats[chatId]){
                user.right += 1 
                await bot.sendMessage(chatId, `Tabriklayman siz men o'ylagan ${chats[chatId]} sonini topdingiz 🎉`, againOption)
                await bot.deleteMessage(chatId, msg.message.message_id)
            } else {
                user.wrong += 1 
                await bot.sendMessage(chatId, `Afsuskiy siz men o'ylagan ${chats[chatId]} sonini topa olmadingiz`, againOption)
                await bot.deleteMessage(chatId, msg.message.message_id)
            }
            await User.findByIdAndUpdate(user._id, user, {new: true})
        } catch (error) {
            console.log(error.message);
            await bot.sendMessage(chatId, 'Iltimos ko\'ting kichik nosozlik yuz berdi')
        }
    })
}

start()