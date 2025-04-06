// frontend/src/components/VideoDownload.jsx
import React, { useState } from 'react'

function VideoDownload({ videoInfo, setDownloads }) {
  const [selectedFormat, setSelectedFormat] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleDownload = async () => {
    if (!selectedFormat) {
      alert("يرجى اختيار صيغة التحميل")
      return
    }
    setLoading(true)
    setMessage('')
    try {
      const response = await fetch('http://localhost:5000/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: videoInfo.url,  // التأكد من إرسال الرابط الصحيح المُسترجَع
          format_code: selectedFormat
        })
      })
      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
        setDownloads(prev => [...prev, data])
      } else {
        setMessage(data.error)
      }
    } catch (err) {
      setMessage(err.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2>معاينة التحميل</h2>
      <p>عنوان الفيديو: {videoInfo.title}</p>
      {videoInfo.thumbnail && <img src={videoInfo.thumbnail} alt="Thumbnail" style={{maxWidth: '320px'}} />}
      <div>
        <label>اختر دقة التحميل:</label>
        <select onChange={(e) => setSelectedFormat(e.target.value)}>
          <option value="">-- اختر الصيغة --</option>
          {videoInfo.formats.map(fmt => {
            const quality = fmt.format_note || (fmt.height ? `${fmt.height}p` : "N/A")
            return (
              <option key={fmt.format_id} value={fmt.format_id}>
                {`ID: ${fmt.format_id} - ${quality} - ${fmt.ext}`}
              </option>
            )
          })}
        </select>
      </div>
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'جارٍ التحميل...' : 'تحميل الفيديو'}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default VideoDownload
