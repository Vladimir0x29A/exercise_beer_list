import axios from 'axios';

const base = axios.create({
  baseURL: process.env.VUE_APP_URL,

  headers: {
    'Content-Type': 'application/json',
  },

  // responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // browser only: 'blob'
  responseType: 'json', // default

  // responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  withCredentials: false,
});

export default base;
