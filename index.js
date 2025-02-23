require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');

const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
console.log(req.url);
next();
});

app.get('/api/auth/discord/redirect', async (req, res) => {
const { code } = req.query;

if (code) {
const formData = new FormData();
formData.append('client_id', process.env.ClientID);
  formData.append('client_secret', process.env.ClientSecret);
  formData.append('grant_type', 'authorization_code');
  formData.append('code', code.toString());
  formData.append('redirect_uri', 'https://15797e9a-8d50-4c03-9b69-465d5750588e-00-2bkp9c4gwtbum.kirk.replit.dev/api/auth/discord/redirect');

  const output = await axios.post('https://discord.com/api/v10/oauth2/token', formData, {
  headers: {
  'Content-Type': 'multipart/form-data',
  },
  });

  if (output.data) {
  const access = output.data.access_token;

  const userinfo = await axios.get('https://discord.com/api/v10/users/@me', {
  headers: {
  'Authorization': `Bearer ${access}`,
  },
  });

  console.log(output.data, userinfo.data);
  res.json({message: 'Authorization successful', data: output.data, userinfo: userinfo.data});
  }
  } else {
  console.log('No code provided');
  res.json({message: 'No code provided'});
  }
  });

  app.listen(port, () => console.log(`Running on ${port}`));
