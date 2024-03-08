
const  musicOption = (post) => {
    return  options = {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        reply_markup: createCinemaListInlineKeyboardMarkup(post)
    };
      
      function createCinemaListInlineKeyboardMarkup (cinemas) {
        return JSON.stringify({
          inline_keyboard: cinemas.map(function (cinema, i) {;
                return [
                {
                  text: `${i + 1}`,
                  callback_data: `${cinema.language}:${cinema.voice}:lang`,
                }
            ];
          })
        });
      
    }
    };

module.exports = {
    startOption: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'UZB', callback_data: 'uz'}, {text: 'RUS', callback_data: 'ru'} ,{text: 'ENG', callback_data: 'eng'}]
            ]
        })
    },
    gameOption: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'} ,{text: '3', callback_data: '3'}],
                [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'} ,{text: '6', callback_data: '6'}],
                [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'} ,{text: '9', callback_data: '9'}],
                [{text: '0', callback_data: '0'}],
            ]
        })
    },
    voiceOption: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '🇺🇸 EN', callback_data: 'en'}, {text: '🇷🇺 RU', callback_data: 'ru'} ,{text: '🇩🇪 GR', callback_data: 'dE'}, {text: '🇫🇷 FR', callback_data: 'fr'}, {text: '🇪🇸 ES', callback_data: 'es'}],
                [{text: '🇦🇷 AR', callback_data: 'ar'}, {text: '🇰🇷 KR', callback_data: 'ko'}, {text: '🇯🇵 JA', callback_data: 'ja'} ,{text: '🇮🇹 IT', callback_data: 'it'}, {text: '🇮🇸 IS', callback_data: 'is'}],
                [{text: '❌', callback_data: '/delete'}]
            ]
        })
    },
    musicOption,
    audioOption: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '1', callback_data: {id: '1', audio: "url", title: "test"}}, {text: '2', callback_data: {id: '2', audio: "url", title: "test"}} ,{text: '3', callback_data: {id: '3', audio: "url", title: "test"}}, {text: '4', callback_data: {id: '4', audio: "url", title: "test"}}, {text: '5', callback_data: '5'}],
                [{text: '6', callback_data: {id: '6', audio: "url", title: "test"}}, {text: '7', callback_data: {id: '7', audio: "url", title: "test"}}, {text: '8', callback_data: {id: '8', audio: "url", title: "test"}}, {text: '9', callback_data: {id: '9', audio: "url", title: "test"}}, {text: '10', callback_data: {id: '10, audio: "url", title: "test"'}}],
                [{text: '⏮', callback_data: 'prev'}, {text: '⏭', callback_data: 'next'}],
            ]
        })
    },
    againOption: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '🔄', callback_data: '/again'}, {text: '❌', callback_data: '/stop'}],
            ]
        })
    }
    
}