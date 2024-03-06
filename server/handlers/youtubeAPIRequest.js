import fetch from 'node-fetch';

const handleYoutubeAPIRequest = (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const videoId = req.params.videoId;

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
};

export default handleYoutubeAPIRequest;
