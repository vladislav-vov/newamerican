import process from 'node:process';
import path from 'path';
import fs from 'fs/promises';

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = 5000;
const __dirname = path.resolve();

app.use(
  cors({ origin: ['http://192.168.252.65:8080'], optionsSuccessStatus: 200 }),
);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.get('/:data', async (req, res) => {
  const dataType = req.params.data;
  const filePath = path.join(__dirname, 'server', 'db', `${dataType}.json`);

  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    res.json(jsonData);
  } catch (error) {
    console.error(`Error reading ${dataType} data:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/youtube-api/:videoId', (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const videoId = req.params.videoId;

  try {
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=contentDetails`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error('Error request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (error) {
    console.error('Error request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
