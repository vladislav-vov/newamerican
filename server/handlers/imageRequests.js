import path from 'path';
import { sendFile } from '../utils/sendFile.js';

import { __dirname } from '../index.js';

const handleImageRequests = (req, res) => {
  const imagePath = getImagePath(['server', req.path]);
  sendFile(res, imagePath);
};

const getImagePath = (foldersArr) => {
  return path.join(__dirname, ...foldersArr);
};

export default handleImageRequests;
