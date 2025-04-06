// frontend/src/App.jsx
import React, { useState } from 'react'
import VideoSearch from './components/VideoSearch'
import VideoDownload from './components/VideoDownload'
import DownloadsList from './components/DownloadsList'
import MergeSubtitles from './components/MergeSubtitles'

function App() {
  const [videoInfo, setVideoInfo] = useState(null)
  const [downloads, setDownloads] = useState([])

  return (
    <div className="container">
      <h1>يو-سب برو | تحميل الفيديو والترجمة (يوتيوب وX)</h1>
      <VideoSearch setVideoInfo={setVideoInfo} />
      {videoInfo && <VideoDownload videoInfo={videoInfo} setDownloads={setDownloads} />}
      <MergeSubtitles setDownloads={setDownloads} />
      <DownloadsList downloads={downloads} />
    </div>
  )
}

export default App
