const axios = require('axios');
require('dotenv').config();
const FormData = require('form-data');
const express = require('express')

const app = express()

app.use(express.json())

//API
const APIKey = process.env.RAPID_API_KEY
const APIHost = process.env.RAPID_API_HOST

//Scrapping data from Instagram
const downloadApi = async (insta_url) => {
  const options = {
    method: 'GET',
    url: 'https://instagram-post-and-reels-downloader.p.rapidapi.com/',
    params: {url: insta_url},
    headers: {
      'X-RapidAPI-Key': '820eda211cmshda5ce2c028a0dd9p1df49ajsn75e9824c4f24',
      'X-RapidAPI-Host': 'instagram-post-and-reels-downloader.p.rapidapi.com'
    }
  };

  try {
    const res = await axios.request(options);
    let type = ''
    if(res.data[0].type === 'jpg'){
      type = 'image'
    } else if(res.data[0].type === 'mp4'){
      type = 'video'
    }
    const result = {
        type,
        link: res.data[0].link,
        caption: res.data[0].title
    }
    return result;
  } catch (error) {
    console.log(error.message + 'instagram');
  }
}

const saveAll = async (text) => {
  
const options = {
  method: 'POST',
  url: 'https://chat-gpt26.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '18d77d1306msh926f22c3307c7bep1247dcjsn72c509211f31',
    'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'
  },
  data: {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: text
      }
    ]
  }
};
try {
	const res = await axios.request(options);
	return res.data.choices[0];
} catch (error) {
	console.log(error.message + 'CHatGpt');
}
}

const VoiceApi = async (text, voices) => {
  const options = {
    method: 'POST',
    url: 'https://ai-powered-text-to-speech1.p.rapidapi.com/synthesize-speech',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '820eda211cmshda5ce2c028a0dd9p1df49ajsn75e9824c4f24',
      'X-RapidAPI-Host': 'ai-powered-text-to-speech1.p.rapidapi.com'
    },
    data: {
      sentence: text,
      language: voices.language,
      voice: voices.voice,
      engine: voices.engine,
      withSpeechMarks: false
    }
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.log(error.message + 'voice');
  }
}

const ChangeVoice = async () => {

  const options = {
    method: 'GET',
    url: 'https://ai-powered-text-to-speech1.p.rapidapi.com/get-voices',
    headers: {
      'X-RapidAPI-Key': '820eda211cmshda5ce2c028a0dd9p1df49ajsn75e9824c4f24',
      'X-RapidAPI-Host': 'ai-powered-text-to-speech1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const searchSong = async(name) => {
  const options = {
    method: 'GET',
    url: 'https://spotify-downloader6.p.rapidapi.com/spotify',
    params: {
      spotifyUrl: name
    },
    headers: {
      'X-RapidAPI-Key': '18d77d1306msh926f22c3307c7bep1247dcjsn72c509211f31',
      'X-RapidAPI-Host': 'spotify-downloader6.p.rapidapi.com'
    }
  
  };
  
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


module.exports = {downloadApi, saveAll, ChangeVoice, VoiceApi, searchSong}