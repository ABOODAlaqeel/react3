# backend/utils.py
import os
import math
import yt_dlp
import subprocess

def format_size(size_bytes):
    """تنسيق الحجم إلى وحدات مناسبة"""
    if not size_bytes or size_bytes == 0:
        return "غير متوفر"
    size_name = ("B", "KB", "MB", "GB", "TB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = 1024 ** i
    s = round(size_bytes / p, 2)
    return f"{s} {size_name[i]}"

def download_video(url, format_code, download_folder):
    """تنزيل الفيديو باستخدام yt_dlp وإرجاع اسم الملف والمعلومات"""
    ydl_opts = {
        'format': format_code,
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s'),
        'noplaylist': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
    filename = ydl.prepare_filename(info)
    return filename, info

def merge_subtitles(video_path, subtitles_path, output_path):
    """دمج ملف الترجمة مع ملف الفيديو باستخدام FFmpeg"""
    cmd = [
        "ffmpeg",
        "-i", video_path,
        "-i", subtitles_path,
        "-c", "copy",
        "-c:s", "mov_text",
        output_path
    ]
    subprocess.run(cmd, check=True)
    return output_path
