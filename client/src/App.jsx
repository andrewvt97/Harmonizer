import { useState } from 'react'
import axios from 'axios';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = youtubeUrl.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/);
    if (match && match[1]) {
      setVideoId(match[1]);
      console.log("Hello");
      axios.post('http://127.0.0.1:5000/api/process', {
        url: youtubeUrl
      })
        .then((response) => {
          console.log('Backend response:', response.data);
        })
        .catch((error) => {
          console.error('Axios error:', error);
        });
    } else {
      setVideoId('');
      alert('Invalid YouTube URL');
    }
  };
  
  return (
    
    <div className="container mt-5">

      <h1 className="text-center mb-4">Harmonious</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter YouTube URL"
            value={youtubeUrl}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Load Video
          </button>
        </div>
      </form>

      {videoId && (
        <div className="ratio ratio-16x9 mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            allowFullScreen
          ></iframe>
        </div>
      )}

      
      <div className="card p-3">
        <h5>Result</h5>
        <p className="text-muted">Result from backend will appear here.</p>
      </div>
    </div>
  );
}

export default App;
