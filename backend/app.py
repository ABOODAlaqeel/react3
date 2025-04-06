# backend/app.py
import os
import yt_dlp
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from utils import format_size, download_video, merge_subtitles

app = Flask(__name__)
CORS(app)  # السماح للواجهة بالتواصل مع الخادم

DOWNLOAD_FOLDER = os.path.join(os.getcwd(), "downloads")
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route('/api/search', methods=['POST'])
def search_video():
    data = request.json
    url = data.get("url")
    if not url:
        return jsonify({"error": "يرجى إرسال رابط الفيديو"}), 400
    try:
        ydl_opts = {'skip_download': True, 'quiet': True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
        return jsonify({
            "title": info.get("title", "غير متوفر"),
            "thumbnail": info.get("thumbnail", ""),
            "formats": info.get("formats", []),
            "url": url  # يتم الاحتفاظ بالرابط للاستخدام لاحقًا
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/download', methods=['POST'])
def download_video_endpoint():
    data = request.json
    url = data.get("url")
    format_code = data.get("format_code")
    if not url or not format_code:
        return jsonify({"error": "يرجى إرسال الرابط والصيغة المطلوبة"}), 400
    try:
        filename, info = download_video(url, format_code, DOWNLOAD_FOLDER)
        size = format_size(os.path.getsize(filename))
        return jsonify({
            "message": "تم تحميل الفيديو بنجاح",
            "file": os.path.basename(filename),
            "size": size
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/merge_subtitles', methods=['POST'])
def merge_subtitles_endpoint():
    data = request.json
    video_filename = data.get("video_filename")
    subtitles_filename = data.get("subtitles_filename")
    if not video_filename or not subtitles_filename:
        return jsonify({"error": "يرجى إرسال أسماء ملفات الفيديو والترجمة"}), 400
    video_path = os.path.join(DOWNLOAD_FOLDER, video_filename)
    subtitles_path = os.path.join(DOWNLOAD_FOLDER, subtitles_filename)
    output_filename = "merged_" + video_filename
    output_path = os.path.join(DOWNLOAD_FOLDER, output_filename)
    try:
        merge_subtitles(video_path, subtitles_path, output_path)
        size = format_size(os.path.getsize(output_path))
        return jsonify({
            "message": "تم دمج الترجمة مع الفيديو بنجاح",
            "file": output_filename,
            "size": size
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/files/<path:filename>')
def serve_file(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)
