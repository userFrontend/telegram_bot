const db = require('./src/db')
const express = require('express')
const User = require('./src/models')
const downloadApi = require('./src/request')
const mongoose = require("mongoose")
const changeLang = require('./language')
const TelegramApi =  require('node-telegram-bot-api')
const {gameOption, againOption, startOption} = require('./src/options')

require('dotenv').config()
const app = express()

//Port
const PORT = process.env.PORT || 4001;

//get
const token = process.env.TELEGRAM_API;
const chats = {}
const bot = new TelegramApi(token, {polling: true});

let lang = changeLang('ru')

const startGame = async (chatId) => {
    const randomNumber = Math.floor(Math.random(1) * 100)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `${lang.startGame}`, againOption)
}

let root = 0;
addCount = async (chatId) => {
    const user = await User.findOne({chatId})
    root += 1;
    if (root >= 6) {
      root = 0
      user.wrong += 1
      await User.findByIdAndUpdate(user._id, user, {new: true})
      return await bot.sendMessage(chatId, `${lang.gameOver}  [${chats[chatId]}]`, againOption)
    }
  };

const start = async () => {

    bot.setMyCommands([
        {command: '/start', description: `${lang.commands.start}`},
        {command: '/setting', description: `${lang.commands.setting}`},
        {command: '/game', description: `${lang.commands.game}`},
        {command: '/info', description: `${lang.commands.info}`},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        try {
            const user = await User.findOne({chatId})
            lang = changeLang(msg.from.language_code)
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
                await bot.sendMessage(chatId, `${lang.start} ${msg.from.first_name}`)
                return bot.sendAudio(chatId, './audio/music.mp3');
            }
            if(text === '/info'){
                return bot.sendMessage(chatId, `${lang.right} <b>${user.right}</b>  ${lang.wrong} <b>${user.wrong}</b>`, {parse_mode: 'HTML'})
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
                  await bot.sendMessage(chatId, `${lang.infoGame}`);
                  return addCount(chatId)
              } else if (text * 1 == chats[chatId]) {
                root = 0
                user.right += 1
                await User.findByIdAndUpdate(user._id, user, {new: true})
                return bot.sendMessage(chatId, `${lang.success}`, againOption)
              } else if (text * 1 > chats[chatId]) {
                  await bot.sendMessage(chatId, `${lang.nextGame}`)
                  return addCount(chatId)
              } else if (text * 1 < chats[chatId]) {
                  await bot.sendMessage(chatId, `${lang.prevGame}`)
                  return addCount(chatId)
            }
            if (msg.text !== '/start' && msg.text.includes('https://www.instagram.com/')) {
                await bot.sendMessage(chatId, `${lang.loading}`)
                const post = await downloadApi(msg.text)
                if (post) {
                    if (post.type === 'image') {
                        return bot.sendPhoto(chatId, post.link, {caption: post.caption + '\n Telegram bot @WebCourseBot'});
                    }
                    else if (post.type === 'video') {
                        return bot.sendVideo(chatId, post.link, {caption: post.caption + '\n Telegram bot @WebCourseBot'});
                    } else {
                        return bot.sendMessage(chatId, `${lang.error.error}`)
                    }  
                } else {
                    return bot.sendMessage(chatId, `${lang.error.infoError}`)
                }
            }
            return bot.sendMessage(chatId, `{} ....`)
        } catch (error) {
            console.log(error.message);
            return bot.sendMessage(chatId, `${lang.error.borError}` )
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
            await bot.sendMessage(chatId, `${lang.error.botError}`)
        }
    })
}

start()

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`Server startedon on port: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}
startServer()