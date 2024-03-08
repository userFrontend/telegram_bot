const language = {
    uz:{
        commands: {
            start: 'Boshlash',
            game: "O'yinni boshlash",
            info: "Ma'lumotlar",
            setting: 'Sozlamalar',
        },
        menu: {
            contact: "Kontaktni baham ko'rish",
            start: 'Bot menyusi',
            close: 'Menyuni yopish',

        },
        error: {
            error: "Havolani yuborishda xatolik yuz berdi, keyinroq qayta urinib ko'ring",
            infoError: 'Bu havola uchun media topilmadi.',
            botError: "Texnik sabablarga ko'ra bot vaqtincha ishlamaydi",
            textError: "Ma'lum bir sabablarga ko'ra \nBot vaqtincha savollarga javob berolmaydi \nNoqulaylik uchun uzur so'raymiz 🛠"
        },
        start: 'Assalomu alekem',
        success: "Tabriklayman siz men o'ylagan sonni to'g'ri topdingiz 🎉",
        delete: "O'chirish",
        contact: "Barcha xizmatlarga kirish uchun kontaktingizni baham ko'ring",
        wiat: "Natijalar",
        loading: 'Havolaga ishlov berilmoqda, kuting...',
        info: '',
        wrong: "Noto'g'ri javoblar esa:",
        right: "marotaba o'yinimizda ishtirok ettingiz  \nTo'g'ri javoblar:",
        startGame: "Men 1 dan 100 gacha bo'lgan 1 ta raqamni o'yladim. Bu raqamni 6 ta urinishda topishingiz kerak bo'ladi. Agar tayyor bo'lsangiz, boshlang.",
        stopGame: "To'xtatish",
        download: 'Yuklab beruvchi',
        prevGame: "Siz kiritgan raqam men o'ylaganimdan kichikroq! 📉🤗",
        nextGame: "Siz kiritgan raqam men o'ylaganimdan kattaroq! 📈☺",
        gameOver: "Limit tugadi siz yutqazdingiz 🙁📝 Men o'ylagan son:",
        infoGame: '1 dan 100 gacha oraliqdagi sonlarni kiriting! 🚫',
    },
    ru:{
        commands: {
            start: 'Начинать',
            game: 'Начать игру',
            info: 'Информатсия',
            setting: 'Настройки',
        },
        menu: {
            contact: 'Поделитесь контактом',
            start: 'Меню бота',
            close: 'Закрыть меню',

        },
        error: {
            error: 'При отправке ссылки произошла ошибка, повторите попытку позже.',
            infoError: 'По этой ссылке не найдены носители.',
            botError: 'Бот временно недоступен по техническим причинам.',
            textError: 'По определённым причинам\nБот временно не может отвечать на вопросы\nПриносим извинения за неудобства 🛠'
        },
        start: 'Приветь',
        success: 'Поздравляю, вы нашли номер  🎉',
        delete: 'Удалить',
        contact: 'Пожалуйста, поделитесь своим контактом, чтобы получить доступ ко всем услугам',
        wiat: 'Результаты',
        loading: 'Ссылка обрабатывается, подождите...',
        info: '',
        wrong: 'Неправильные ответы:',
        right: 'раза Вы принимали участие в игре \nВот правильные ответы:',
        startGame: 'Я задумал одно число от 1 до 100. Вам придется найти это число за 6 попыток. Если вы готовы, начинайте.',
        stopGame: 'Остановить',
        download: 'Скачал с помощью',
        prevGame: 'Введенное вами число меньше, чем я думал! 📉🤗',
        nextGame: 'Число, которое вы ввели, больше, чем я думал! 📈☺',
        gameOver: 'Лимит закончился, ты проиграл 🙁📝 Число, которое я подумал:',
        infoGame: 'Введите цифры от 1 до 100! 🚫',
    },
    en:{
        commands: {
            start: 'Start',
            game: 'Start the game',
            info: 'Information',
            setting: 'Setting',
        },
        menu: {
            contact: 'Share contact',
            start: 'Bot menu',
            close: 'Close the Menu',

        },
        error: {
            error: 'There was an error sending your link, please try again later',
            infoError: 'Could not find the media for that link.',
            botError: 'The bot is temporarily down for technical reasons',
            textError: 'Due to certain reasons \nBot is temporarily unable to answer questions \nSorry for the inconvenience 🛠'
        },
        start: 'Hello',
        success: 'Congratulations, you found the number I thought correctly 🎉',
        delete: 'Delete',
        contact: 'Please share your contact to access all services',
        wiat: 'Results',
        loading: 'Processing your link, please wait...',
        info: '',
        wrong: 'Wrong answers',
        right: 'times You took part in the game. \nThese are the correct answers:',
        startGame: 'I thought of 1 number from 1 to 100. You will have to find this number in 6 tries. If you are ready, start.',
        stopGame: 'Stop game',
        download: 'Downloaded via',
        prevGame: 'The number you entered is smaller than I thought! 📉🤗',
        nextGame: 'The number you entered is bigger than I thought! 📈☺',
        gameOver: 'The limit is over, you lost 🙁📝 The number I thought:',
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