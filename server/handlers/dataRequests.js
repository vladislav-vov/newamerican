import path from 'path';
import fs from 'fs/promises';

import { __dirname } from '../index.js';

const handleDataRequests = async (req, res) => {
  const dataType = req.params.data;
  const filePath = path.join(__dirname, 'server', 'db', `${dataType}.json`);

  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(fileData));
  } catch (error) {
    console.error(`Error reading ${dataType} data:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleDataRequests;
