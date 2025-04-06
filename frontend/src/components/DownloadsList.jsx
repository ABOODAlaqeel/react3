// frontend/src/components/DownloadsList.jsx
import React from 'react'

function DownloadsList({ downloads }) {
  return (
    <div>
      <h2>قائمة التنزيلات</h2>
      {downloads.length === 0 ? (
        <p>لا توجد تنزيلات بعد.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>اسم الملف</th>
              <th>الحجم</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((item, index) => (
              <tr key={index}>
                <td>{item.file}</td>
                <td>{item.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DownloadsList
