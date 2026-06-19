#!/usr/bin/env python3
"""
Build The Rainy Day Parade video from per-slide Daddy recordings.
Each scene is shown for the exact duration of its matching audio clip.
"""

import os
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

BASE = Path(__file__).parent.parent
SCENES = BASE / "public" / "story-scenes" / "rainy-day-parade"
AUDIO_OUT = BASE / "public" / "audio" / "story_rainy_day_parade.m4a"
VIDEO_OUT = BASE / "public" / "videos" / "story_rainy_day_parade.mp4"
RECORDINGS_DIR = Path("C:/Users/Dekan AI Brother/Desktop/04-Data/Documents/Sound Recordings")

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

# Slide recordings in order
SLIDE_FILES = [
    "Beeny The Bear Slide 1.m4a",
    "Beeny the bear slide 2.m4a",
    "Beeny the bear slide 3.m4a",
    "Beeny the bvear 4.m4a",
    "Beeny 5.m4a",
    "benny 6.m4a",
    "Beeny 7.m4a",
    "benny slide 8.m4a",
    "benny slide 9.m4a",
    "benny 10.m4a",
]


def get_duration(path: Path) -> float:
    result = subprocess.run(
        [FFMPEG, "-i", str(path)],
        capture_output=True,
        text=True,
    )
    for line in result.stderr.splitlines():
        if "Duration:" in line:
            # Format: Duration: 00:00:37.89, start: ...
            time_str = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = time_str.split(":")
            return int(h) * 3600 + int(m) * 60 + float(s)
    raise RuntimeError(f"Could not determine duration for {path}")


def concat_audio(clips, output):
    """Concatenate audio clips using ffmpeg concat demuxer (same codec assumed)."""
    list_file = output.with_suffix(".concat.txt")
    with open(list_file, "w") as f:
        for clip in clips:
            f.write(f"file '{clip}'\n")

    cmd = [
        FFMPEG, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(list_file),
        "-c", "copy",
        str(output),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    list_file.unlink(missing_ok=True)
    if result.returncode != 0:
        print("ERROR concatenating audio:")
        print(result.stderr)
        sys.exit(1)


def build_video(durations, audio_path, output):
    """Build video where each scene image is shown for the matching duration."""
    scene_files = [SCENES / f"scene-{i:02d}.png" for i in range(1, 11)]
    for f in scene_files:
        if not f.exists():
            print(f"ERROR: Missing scene file: {f}")
            sys.exit(1)

    concat_file = output.with_suffix(".concat.txt")
    with open(concat_file, "w") as f:
        # Duration directive applies to the preceding file in ffmpeg concat demuxer
        for scene_file, duration in zip(scene_files, durations):
            f.write(f"file '{scene_file}'\n")
            f.write(f"duration {duration}\n")
        # Final file entry (no duration) tells ffmpeg where the last scene ends
        f.write(f"file '{scene_files[-1]}'\n")

    cmd = [
        FFMPEG, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_file),
        "-i", str(audio_path),
        "-vf", "fps=30,scale=800:450:force_original_aspect_ratio=decrease,pad=800:450:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
        "-c:v", "libx264",
        "-crf", "23",
        "-preset", "fast",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        "-movflags", "+faststart",
        "-pix_fmt", "yuv420p",
        str(output),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    concat_file.unlink(missing_ok=True)
    if result.returncode != 0:
        print("ERROR building video:")
        print(result.stderr)
        sys.exit(1)


def trim_video_to_audio(video_path: Path, audio_path: Path, output_path: Path):
    """Trim video to exactly match the audio duration."""
    audio_duration = get_duration(audio_path)
    cmd = [
        FFMPEG, "-y",
        "-i", str(video_path),
        "-i", str(audio_path),
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-c:v", "copy",
        "-c:a", "copy",
        "-t", str(audio_duration),
        "-shortest",
        str(output_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("ERROR trimming video to audio:")
        print(result.stderr)
        sys.exit(1)


def main():
    clips = [RECORDINGS_DIR / name for name in SLIDE_FILES]
    for clip in clips:
        if not clip.exists():
            print(f"ERROR: Recording not found: {clip}")
            sys.exit(1)

    print("Measuring slide durations...")
    durations = [get_duration(clip) for clip in clips]
    for name, duration in zip(SLIDE_FILES, durations):
        print(f"  {name}: {duration:.2f}s")
    total = sum(durations)
    print(f"\nTotal narration length: {total:.2f}s ({int(total//60)}:{int(total%60):02d})")

    print(f"\nConcatenating audio -> {AUDIO_OUT}")
    concat_audio(clips, AUDIO_OUT)

    print(f"Building video -> {VIDEO_OUT}")
    build_video(durations, AUDIO_OUT, VIDEO_OUT)

    # Ensure video does not extend past audio due to concat demuxer quirks
    print("Trimming video to match audio duration...")
    tmp_video = VIDEO_OUT.with_suffix(".trimmed.mp4")
    trim_video_to_audio(VIDEO_OUT, AUDIO_OUT, tmp_video)
    tmp_video.replace(VIDEO_OUT)

    print("\nSUCCESS!")
    print(f"  Audio: {AUDIO_OUT}")
    print(f"  Video: {VIDEO_OUT}")


if __name__ == "__main__":
    main()
