const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Pilihan kualitas video
const QUALITY_MAP = {
  '360p': 'best[height<=360]',
  '480p': 'best[height<=480]',
  '720p': 'best[height<=720]',
  '1080p': 'best[height<=1080]',
  'best': 'best'
};

app.post('/download', (req, res) => {
  const { url, quality } = req.body;
  
  if (!url.includes('dailymotion.com')) {
    return res.status(400).json({ error: 'URL tidak valid!' });
  }

  const qualityFlag = QUALITY_MAP[quality] || 'best';
  exec(./yt-dlp -g -f "${qualityFlag}" ${url}, (error, stdout) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Gagal mengambil video!' });
    }
    const downloadUrl = stdout.trim();
    res.json({ url: downloadUrl });
  });
});

app.listen(3000, () => console.log('Server ready!'));
