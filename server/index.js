import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';

import {
  handleImageRequests,
  handleDataRequests,
  handleMentorRequests,
  handleFileRequests,
  handleYoutubeAPIRequest,
  handleSubscribe,
} from './handlers/index.js';

const app = express();
const PORT = process.env.PORT;
export const __dirname = path.resolve();

app.use(cors());

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.get('/db/img/:category/:image', handleImageRequests);
app.get('/db/img/:category/icons/:image', handleImageRequests);
app.get('/:data', handleDataRequests);
app.get('/mentor/:name', handleMentorRequests);
app.get('/files/:file', handleFileRequests);
app.get('/youtube-api/:videoId', handleYoutubeAPIRequest);
app.post('/getBook', (req, res) =>
  handleSubscribe({ req, res, fileName: 'bookRequests' }),
);
app.post('/getWebinar', (req, res) =>
  handleSubscribe({ req, res, fileName: 'webinarRequests' }),
);
