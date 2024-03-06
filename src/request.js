const axios = require('axios');
require('dotenv').config();

//API
const APIKey = process.env.RAPID_API_KEY
const APIHost = process.env.RAPID_API_HOST

//Scrapping data from Instagram
const downloadApi = async (insta_url) => {
  const options = {
    method: 'GET',
    url: 'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/',
    params: {url: insta_url},
    headers: {
      'X-RapidAPI-Key': APIKey,
      'X-RapidAPI-Host': APIHost
    }
  };

  try {
    const res = await axios.request(options);
    const result = {
        type: res.data[0].type.toLowerCase(),
        link: res.data[0].url,
        caption: res.data[0].title
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = downloadApi