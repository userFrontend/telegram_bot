const language = {
    uz:{
        commands: {
            start: 'Boshlash',
            game: 'O\'yinni boshlash',
            info: 'O\'yin natijalari',
            setting: 'Sozlamalar',
        },
        error: {
            error: 'Havolani yuborishda xatolik yuz berdi, keyinroq qayta urinib ko\'ring',
            infoError: 'Bu havola uchun media topilmadi.',
            botError: 'Texnik sabablarga ko\'ra bot vaqtincha ishlamaydi',
        },
        start: 'Assalomu alekem',
        success: 'Tabriklayman siz men o\'ylagan sonni to\'g\'ri topdingiz 🎉',
        wiat: '',
        loading: 'Havolaga ishlov berilmoqda, kuting...',
        info: '',
        wrong: 'ta noto\'g\'ri javoblar esa:',
        right: 'Sizda to\'g\'ri javoblar:',
        startGame: 'Men 1 dan 100 gacha bo\'lgan 1 ta raqamni o\'yladim. Bu raqamni 6 ta urinishda topishingiz kerak bo\'ladi. Agar tayyor bo\'lsangiz, boshlang.',
        stopGame: '',
        prevGame: 'Siz kiritgan raqam men o\'ylaganimdan kichikroq! 🙃',
        nextGame: 'Siz kiritgan raqam men o\'ylaganimdan kattaroq! 😏',
        gameOver: 'Limit tugadi siz yutqazdingiz 🧐 Men o\'ylagan son:',
        infoGame: '1 dan 100 gacha oraliqdagi sonlarni kiriting! 🚫',
    },
    ru:{
        commands: {
            start: 'Начинать',
            game: 'Начать игру',
            info: 'Результаты игры',
            setting: 'Настройки',
        },
        error: {
            error: 'При отправке ссылки произошла ошибка, повторите попытку позже.',
            infoError: 'По этой ссылке не найдены носители.',
            botError: 'Бот временно недоступен по техническим причинам.',
        },
        start: 'Приветь',
        success: 'Поздравляю, вы нашли номер  🎉',
        wiat: '',
        loading: 'Ссылка обрабатывается, подождите...',
        info: '',
        wrong: 'и неправильные ответы:',
        right: 'У вас есть правильные ответы:',
        startGame: 'Я задумал одно число от 1 до 100. Вам придется найти это число за 6 попыток. Если вы готовы, начинайте.',
        stopGame: '',
        prevGame: 'Введенное вами число меньше, чем я думал! 🙃',
        nextGame: 'Число, которое вы ввели, больше, чем я думал! 😏',
        gameOver: 'Лимит закончился, ты проиграл 🧐 Число, которое я подумал:',
        infoGame: 'Введите цифры от 1 до 100! 🚫',
    },
    eng:{
        commands: {
            start: 'Start',
            game: 'Start the game',
            info: 'Game results',
            setting: 'Setting',
        },
        error: {
            error: 'There was an error sending your link, please try again later',
            infoError: 'Could not find the media for that link.',
            botError: 'The bot is temporarily down for technical reasons',
        },
        start: 'Hello',
        success: 'Congratulations, you found the number I thought correctly 🎉',
        wiat: '',
        loading: 'Processing your link, please wait...',
        info: '',
        wrong: 'and wrong answers',
        right: 'You have the correct answers:',
        startGame: 'I thought of 1 number from 1 to 100. You will have to find this number in 6 tries. If you are ready, start.',
        stopGame: '',
        prevGame: 'The number you entered is smaller than I thought! 🙃',
        nextGame: 'The number you entered is bigger than I thought! 😏',
        gameOver: 'The limit is over, you lost 🧐 The number I thought:',
        infoGame: 'Enter numbers between 1 and 100! 🚫',
    },
}

const changeLang = (lang) => {
    for (const res in language) {
        if (Object.hasOwnProperty.call(language, res)) {
            const element = language[lang];
            return element;
        }
    }
}

module.exports = changeLang

// for (const res in language) {
//     if (Object.hasOwnProperty.call(language, res)) {
//         if(res == lang){
//             const element = language[res];
//             return console.log(element);
//         }
//     }
// }