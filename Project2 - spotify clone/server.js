// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(cors()); // Enable Cross-Origin Resource Sharing

// // Serve static files from the project folder
// app.use(express.static(path.join(__dirname)));

// // Serve the "songs" folder for audio files
// app.use('/songs', express.static(path.join(__dirname, 'songs')));

// // Handle the root endpoint
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html')); // Serve the main HTML file
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors()); // Enable CORS for all requests

// Serve the "songs" directory for direct access to audio files
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// API endpoint to list all song files
app.get('/api/songs', (req, res) => {
    const songsDir = path.join(__dirname, 'songs');

    // Read the files in the "songs" directory
    fs.readdir(songsDir, (err, files) => {
        if (err) {
            console.error('Error reading songs directory:', err);
            return res.status(500).json({ error: 'Unable to read songs directory' });
        }

        // Filter only MP3 files and return as JSON
        const mp3Files = files.filter(file => file.endsWith('.mp3'));
        res.json(mp3Files);
    });
});

// Root route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
