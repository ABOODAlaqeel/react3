// frontend/src/components/MergeSubtitles.jsx
import React, { useState } from 'react';

function MergeSubtitles({ setDownloads }) {
  const [videoFilename, setVideoFilename] = useState('');
  const [subtitlesFilename, setSubtitlesFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMerge = async () => {
    if (!videoFilename || !subtitlesFilename) {
      alert("يرجى إدخال اسم ملف الفيديو والترجمة");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/merge_subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          video_filename: videoFilename, 
          subtitles_filename: subtitlesFilename 
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setDownloads(prev => [...prev, data]);
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>دمج الترجمة مع الفيديو</h2>
      <div>
        <input 
          type="text" 
          placeholder="اسم ملف الفيديو" 
          value={videoFilename}
          onChange={(e) => setVideoFilename(e.target.value)}
        />
      </div>
      <div>
        <input 
          type="text" 
          placeholder="اسم ملف الترجمة (مثلاً: video.srt)" 
          value={subtitlesFilename}
          onChange={(e) => setSubtitlesFilename(e.target.value)}
        />
      </div>
      <button onClick={handleMerge} disabled={loading}>
        {loading ? 'جارٍ الدمج...' : 'دمج الملفات'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default MergeSubtitles;
