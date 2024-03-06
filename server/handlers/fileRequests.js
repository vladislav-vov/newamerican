import path from 'path';
import fs from 'fs/promises';
import { sendFile } from '../utils/sendFile.js';
import { __dirname } from '../index.js';

const handleFileRequests = async (req, res) => {
  const filePath = path.join(__dirname, 'server', 'db', req.path);

  try {
    await fs.access(filePath);
    sendFile(res, filePath);
  } catch (error) {
    console.error(`Error reading ${filePath} data:`, error);
    res.status(404).json({ error: 'File not found' });
  }
};

export default handleFileRequests;
