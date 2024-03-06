import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { __dirname } from '../index.js';

async function getSubscribers(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveSubscribers(subscriber, filePath) {
  const data = JSON.stringify(subscriber);
  await fs.writeFile(filePath, data);
}

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubscribe = async ({ req, res, fileName }) => {
  try {
    const { email } = req.body;

    if (!email || !isEmailValid(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const filePath = path.join(__dirname, 'server', 'db', `${fileName}.json`);

    try {
      await fs.access(filePath);
    } catch (error) {
      await fs.writeFile(filePath, '[]');
    }

    const existingSubscribers = await getSubscribers(filePath);

    if (existingSubscribers.some((subscriber) => subscriber.email === email)) {
      return res
        .status(400)
        .json({ message: 'A user with this email already exists' });
    }

    const newSubscriber = { id: uuidv4(), email };
    existingSubscribers.push(newSubscriber);
    await saveSubscribers(existingSubscribers, filePath);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default handleSubscribe;
