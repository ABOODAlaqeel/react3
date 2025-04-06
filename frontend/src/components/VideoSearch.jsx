// frontend/src/components/VideoSearch.jsx
import React, { useState } from 'react'

function VideoSearch({ setVideoInfo }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await response.json()
      if (response.ok) {
        setVideoInfo(data)
      } else {
        setError(data.error || 'حدث خطأ أثناء البحث')
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="أدخل رابط الفيديو من يوتيوب أو X هنا..." 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'جارٍ البحث...' : 'بحث'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  )
}

export default VideoSearch
