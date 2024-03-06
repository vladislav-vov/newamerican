export const sendFile = (res, filePath) => {
  try {
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error sending file:', error);
    res.status(404).json({ error: 'File not found' });
  }
};
