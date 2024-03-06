import path from 'path';
import fs from 'fs/promises';
import { __dirname } from '../index.js';

const handleMentorRequests = async (req, res) => {
  const name = req.params.name;
  const filePath = path.join(__dirname, 'server', 'db', 'mentors.json');

  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const dataArr = JSON.parse(fileData);

    const data = dataArr.find(
      (obj) => obj.name.toLowerCase() === name.toLowerCase(),
    );

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Mentor not found' });
    }
  } catch (error) {
    console.error('Error reading mentor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleMentorRequests;
