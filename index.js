const User = require('./src/models')
const {downloadApi, saveAll, VoiceApi, ChangeVoice, searchSong} = require('./request')
const startServer = require('./src/db')
const changeLang = require('./src/language')
const TelegramApi =  require('node-telegram-bot-api')
const {gameOption, againOption, voiceOption, musicOption} = require('./src/options')
require('dotenv').config()

//get
const token = process.env.TELEGRAM_API;
const chats = {}
const bot = new TelegramApi(token, {polling: true});


//set middleware
let root = 0;
let iPage = 1
let idMsg
let idText
let dataMus = []
const perPage = 5
const page = iPage
let gameIsStarted = false
let textVoice = false
let lang = changeLang('ru')


const start = async () => {
    startServer()
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        const user = await User.findOne({chatId})
        if(user){
            lang = changeLang(user.lang)
        }

        //Functions
        const startGame = async (chatId) => {
            gameIsStarted = true
            const randomNumber = Math.floor(Math.random(1) * 100)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, `${lang.startGame}`, {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: `📊 ${lang.wiat}`, callback_data: '/infoGame'}, {text: `❌ ${lang.stopGame}`, callback_data: '/stop'}],
                    ]
                })
            })
        }
        
        bot.setMyCommands([
            {command: '/start', description: `${lang.commands.start}`},
            {command: '/menu', description: `${lang.commands.setting}`},
        ])

        addCount = async (chatId) => {
            root += 1;
            if (root >= 6) {
                gameIsStarted = false
                if(idMsg && idText){
                    await bot.deleteMessage(chatId, idMsg.message_id)
                    await bot.deleteMessage(chatId, idText)
                }
                root = 0
                user.wrong += 1
                await User.findByIdAndUpdate(user._id, user, {new: true})
                return await bot.sendMessage(chatId, `${lang.gameOver}  [${chats[chatId]}]`, againOption)
            }
          };

        try {

            if(text === '/start'){
                await bot.sendSticker(chatId, './img/start.png')
                if(!user){
                    await bot.sendMessage(chatId, `${lang.start} ${msg.from.first_name} \n${lang.contact}`, {
                
                        reply_markup: {
                
                            keyboard: [
                                [{text: `🔐 ${lang.menu.contact}`, request_contact: true}]
                
                            ],
                            resize_keyboard: true
                
                        }
                
                    })
                    return (await User.create({chatId, lang: msg.from.language_code, user: msg.chat})).save()
                }

                return await bot.sendMessage(chatId, `${lang.start} ${msg.from.first_name} \nВаша данних уже сохранино ! \nВы запустили бот в ${new Date(user.createdAt).toLocaleDateString()} чесле`,{
                    reply_markup: {
                        keyboard: [
                            [{text: `🔗 ${lang.menu.start}`, callback_data: '/menu'}]
            
                        ],
                        resize_keyboard: true
            
                    }
            
                } )
                // return bot.sendMessage(chatId, "Tilni tanlang", startOption)

                // const photo = './img/photo.jpg'
                // await bot.sendPhoto(chatId, photo, {caption: "I'm a bot!"});
                // await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/175/10e/17510e63-2d89-41ec-a18c-1e3351dd42b1/4.webp')
                // return bot.sendAudio(chatId, './audio/music.mp3');
            }
            if(msg.contact){
                user.contact = msg.contact
                await bot.sendMessage(chatId, 'Ваша даних сохранино !', {                
                    reply_markup: {
                        remove_keyboard: true
                    }
                    
                });
                return await User.findByIdAndUpdate(user._id, user, {new: true})
            }
            if(text === '/info' || text === `🔐 ${lang.commands.info}`){
                return bot.sendMessage(chatId, `${lang.right} <b>${user.right}</b>  ${lang.wrong} <b>${user.wrong}</b>`, {parse_mode: 'HTML'})
            }
            if(text === '/setting' || text === `⚙ ${lang.commands.setting}`){
                return bot.sendMessage(chatId, `Sozlamalar mavjud emas !`)
            }
            if(text === '/menu' || text === `🔗 ${lang.menu.start}`) {
                return await bot.sendMessage(chatId, `${lang.menu.start}`, {
                    reply_markup: {
                        keyboard: [
                            // ['⭐️ Картинка', '⭐️ Видео'],
                            [{text: `📄🔊 Text to voice`, callback_data: '/voice'}, `⚙ ${lang.commands.setting}`],
                            [{text: `🎮 ${lang.commands.game}`, callback_data: '/game'}, {text: `🔐 ${lang.commands.info}`, callback_data: '/info'}],
                            [`❌ ${lang.menu.close}`]
            
                        ],
                        resize_keyboard: true
                    }
                })
            
            }
            if(text === '/game'|| text === `🎮 ${lang.commands.game}`) {
                return startGame(chatId)
            }
            if(gameIsStarted){
                if(idMsg && idText){
                    await bot.deleteMessage(chatId, idMsg.message_id)
                    await bot.deleteMessage(chatId, idText)
                }
                if (text * 1 > 100 || text * 1 < 0) {
                    idMsg = await bot.sendMessage(chatId, `${lang.infoGame}`);
                    idText = msg.message_id
                    return addCount(chatId)
                } else if (text * 1 == chats[chatId]) {
                    root = 0
                    user.right += 1
                    await User.findByIdAndUpdate(user._id, user, {new: true})
                    return bot.sendMessage(chatId, `[${chats[chatId]}]  ${lang.success}`, againOption)
                } else if (text * 1 > chats[chatId]) {
                    idMsg = await bot.sendMessage(chatId, `${lang.nextGame}`)
                    idText = msg.message_id
                    return addCount(chatId)
                } else if (text * 1 < chats[chatId]) {
                    idMsg = await bot.sendMessage(chatId, `${lang.prevGame}`)
                    idText = msg.message_id
                    return addCount(chatId)
                }
            }
            if(text === '/stopVoice'){
                textVoice = false
                await bot.sendMessage(chatId, 'Text to voice stoped !')
                return bot.deleteMessage(chatId, msg.message_id)
            }
            if(textVoice){
                if(user){
                    const voice = await VoiceApi(text, user.voice)
                    return await bot.sendAudio(chatId, voice.fileDownloadUrl, {caption: `\n📥 ${lang.download} @WebCourseBot`})
                }
            }
            if(text === '/changeVoice'){
                const res = await ChangeVoice()
                dataMus = await res
                return await bot.sendMessage(chatId, 'Please chack voice language', voiceOption)
            }
            if(text === '/voice' || text === `📄🔊 Text to voice`){
                textVoice = true
                return await bot.sendMessage(chatId, 'Send me text')
            }
            if (text !== '/start' && text.includes('https://www.instagram.com/')) {
                const ani = await bot.sendMessage(chatId, '🔎')
                const sms = await bot.sendMessage(chatId, `${lang.loading}`)
                const post = await downloadApi(msg.text)
                if (post) {
                    const type = post.type;
                    await bot.deleteMessage(chatId, sms.message_id)
                    await bot.deleteMessage(chatId, ani.message_id)
                    if (type == 'image') {
                        return bot.sendPhoto(chatId, post.link, {caption: `\n${post.caption} \n\n📥 ${lang.download} @WebCourseBot`});
                    }
                    else if (type == 'video') {
                        return bot.sendVideo(chatId, post.link, {caption: `\n${post.caption} \n\n📥 ${lang.download} @WebCourseBot`});
                    } else {
                        return bot.sendMessage(chatId, `${lang.error.error}`)
                    }  
                } else {
                    await bot.deleteMessage(chatId, sms.message_id)
                    await bot.deleteMessage(chatId, ani.message_id)
                    return bot.sendMessage(chatId, `${lang.error.infoError}`)
                }
            } 
            if(text == `❌ ${lang.menu.close}`) {
                return await bot.sendMessage(msg.chat.id, `${lang.menu.close}`, {
                    reply_markup: {
                        remove_keyboard: true
                    }
                })
            
            }
            if(text.includes('https://open.spotify.com/')){
                const res = await searchSong(text)
                return bot.sendAudio(chatId, res.download_link, {caption: `\n📥 ${lang.download} @WebCourseBot`})
            }
            if(msg.text !== '/start'){
                const post = await saveAll(msg.text)
                if(post){
                    return await bot.sendMessage(chatId, `${post.message.content}`)
                } else {
                    return await bot.sendMessage(chatId, `${lang.error.infoError}`)
                }
            }
            return bot.sendMessage(chatId, `${lang?.error.botError}` )
        } catch (error) {
            console.log(error.message + ' start');
            return bot.sendMessage(chatId, `${lang?.error.textError}` )
        }
    })



    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id
        try {
            const user = await User.findOne({chatId})
            if(data === '/again') {
                gameIsStarted = true
                root = 0
                await bot.deleteMessage(chatId, msg.message.message_id)
                return startGame(chatId)
            }
            if(data === '/delete'){
                return await bot.deleteMessage(chatId, msg.message.message_id)
            }
            if(data === '/stop') {
                root = 0
                gameIsStarted = false
                if(idMsg && idText){
                    await bot.deleteMessage(chatId, idMsg.message_id)
                    await bot.deleteMessage(chatId, idText)
                }
                return bot.deleteMessage(chatId, msg.message.message_id)
            }
            if(data === '/voice'){
                textVoice == true
                return await bot.sendMessage(chatId, 'Send me text')
            }
            if(data === 'prev' && iPage !== 1){
                return iPage -= 1
            }
            if(data === 'next'){
                return iPage += 1
            }
            if(data === '/infoGame') {
                await bot.deleteMessage(chatId, msg.message.message_id)
                return bot.sendMessage(chatId, `${user.right + user.wrong} ${lang.right} <b>${user.right} ✅</b>  \n${lang.wrong} <b>${user.wrong} 🚫</b>`, {parse_mode: 'HTML',
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{text: `🎮 ${lang.commands.game}`, callback_data: '/again'}, {text: `🗑 ${lang.delete}`, callback_data: '/delete'}],
                        ]
                    })
                })
            }
            if(data.includes('lang')){
                const res = await ChangeVoice()
                const result = res.filter(voc => voc.language === data.split(':')[0] && voc.voice === data.split(':')[1])
                if(result){
                    user.voice = result[0]
                    await bot.deleteMessage(chatId,  msg.message.message_id)
                    await bot.sendMessage(chatId, 'Change voice Language successfully')
                    return await User.findByIdAndUpdate(user._id, user, {new: true})
                }
            }
            if(dataMus?.length > 0){
                const post = dataMus.filter(res => data === res.language.slice(0, 2))
                let text = ''
                if(post.length > 0){
                    post.map(async (voc, i) => {
                        text = text + `\n${i + 1}. ${voc.voice} - ${voc.voiceGender} ${voc.languageDescription}`
                        return text
                    })
                return await bot.sendMessage(chatId, text, musicOption(post))
                }
                //         }
                // return dataMus.map(async res => {
                //     if(data === res.language.slice(0, 2)){
                //         const post = res.splice(perPage*page - perPage, perPage * page)
                //         let text = ''
                //         if(res.length > 0){
                //             res.map((voc, i) => {
                //                 text = text + `\n${i + 1}. ${voc.voice} - ${voc.voiceGender} ${voc.languageDescription}`
                //                 return text
                //             })
                //             return await bot.sendMessage(chatId, text, musicOption(res))
                //         }
                //     }
                // })
            }
            
            return await bot.sendMessage(chatId, 'Buttons is disabled ')
        } catch (error) {
            console.log(error.message + 'callback');
            await bot.sendMessage(chatId, `${lang.error.textError}`)
        }
    })
}

start()
