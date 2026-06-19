#!/usr/bin/env python3
"""
Build story videos from image sequences + voice recordings using ffmpeg.

Usage:
    python scripts/build-videos.py

Requires:
    - ffmpeg installed and on PATH
    - Scene images in public/story-scenes/<story>/
    - Audio files in public/audio/

Output:
    - public/videos/story_rainy_day_parade.mp4
    - public/videos/story_great_honey_harvest.mp4
    - public/videos/story_night_under_stars.mp4
"""

import os
import subprocess
import sys
from pathlib import Path

BASE = Path(__file__).parent.parent
SCENES = BASE / "public" / "story-scenes"
VIDEOS = BASE / "public" / "videos"
AUDIO = BASE / "public" / "audio"

VIDEOS.mkdir(exist_ok=True)

FFMPEG_EXE = os.environ.get("FFMPEG_PATH", "ffmpeg")


def check_ffmpeg():
    try:
        subprocess.run([FFMPEG_EXE, "-version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def build_video(story_name, audio_file, output_file, scene_duration=18.0, fade_duration=0.5):
    """
    Build a video from 10 scene images + audio using ffmpeg xfade filter.
    """
    scene_dir = SCENES / story_name
    if not scene_dir.exists():
        print(f"ERROR: Scene directory not found: {scene_dir}")
        return False

    # Collect scene images (scene-01.png through scene-10.png)
    scene_files = []
    for i in range(1, 11):
        f = scene_dir / f"scene-{i:02d}.png"
        if f.exists():
            scene_files.append(str(f))
        else:
            print(f"WARNING: Missing scene file: {f}")

    if len(scene_files) < 10:
        print(f"ERROR: Only found {len(scene_files)} scenes for {story_name}, need 10.")
        return False

    audio_path = AUDIO / audio_file
    if not audio_path.exists():
        print(f"WARNING: Audio file not found: {audio_path}")
        print(f"  Place your recorded audio at: {audio_path}")
        print(f"  Then run this script again.")
        return False

    # Build filter_complex for xfade transitions
    # We need a black placeholder video at the start because xfade needs two inputs
    inputs = ["-f", "lavfi", "-i", f"color=c=black:s=800x450:d=0.1"]
    for sf in scene_files:
        inputs.extend(["-i", sf])
    inputs.extend(["-i", str(audio_path)])

    audio_idx = len(scene_files) + 1

    # Build xfade chain
    filter_parts = []
    prev = "0:v"
    for i in range(1, len(scene_files) + 1):
        offset = scene_duration * (i - 1) + (scene_duration - fade_duration) * (i > 1)
        if i == 1:
            offset = scene_duration - fade_duration
        else:
            offset = (scene_duration * (i - 1)) - (fade_duration * (i - 1))
        
        # Simpler: each scene starts at (i-1)*scene_duration, crossfade at boundaries
        offset = (i - 1) * scene_duration - (fade_duration if i > 1 else 0)
        if i == 1:
            offset = scene_duration - fade_duration
        
        # Actually, let's use a simpler concat approach with fade
        # Use the concat approach instead which is more reliable
        pass

    # Simpler approach: use concat demuxer with a file list
    # Each scene is shown for scene_duration seconds
    concat_file = VIDEOS / f"{story_name}_concat.txt"
    with open(concat_file, "w") as f:
        for sf in scene_files:
            f.write(f"file '{sf}'\n")
            f.write(f"duration {scene_duration}\n")
        # Last frame needs duration too for concat
        f.write(f"file '{scene_files[-1]}'\n")
        f.write(f"duration {scene_duration}\n")

    output = VIDEOS / output_file

    cmd = [
        FFMPEG_EXE, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_file),
        "-i", str(audio_path),
        "-vf", f"fps=30,scale=800:450:force_original_aspect_ratio=decrease,pad=800:450:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
        "-c:v", "libx264",
        "-crf", "23",
        "-preset", "fast",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        "-movflags", "+faststart",
        "-pix_fmt", "yuv420p",
        str(output)
    ]

    print(f"\n{'='*50}")
    print(f"Building: {story_name}")
    print(f"{'='*50}")
    print(f"Scenes: {len(scene_files)}")
    print(f"Audio: {audio_path}")
    print(f"Output: {output}")

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ERROR building {story_name}:")
        print(result.stderr)
        return False
    else:
        print(f"SUCCESS: {output}")
        # Clean up concat file
        concat_file.unlink(missing_ok=True)
        return True


def main():
    if not check_ffmpeg():
        print("ERROR: ffmpeg not found. Please install ffmpeg and add it to your PATH.")
        print("Download: https://ffmpeg.org/download.html")
        sys.exit(1)

    stories = [
        ("rainy-day-parade", "story_rainy_day_parade.m4a", "story_rainy_day_parade.mp4"),
        ("great-honey-harvest", "story_great_honey_harvest.m4a", "story_great_honey_harvest.mp4"),
        ("night-under-stars", "story_night_under_stars.m4a", "story_night_under_stars.mp4"),
    ]

    results = []
    for story_name, audio_file, output_file in stories:
        ok = build_video(story_name, audio_file, output_file)
        results.append((story_name, ok))

    print(f"\n{'='*50}")
    print("BUILD SUMMARY")
    print(f"{'='*50}")
    for story_name, ok in results:
        status = "OK" if ok else "FAILED"
        print(f"  {story_name}: {status}")

    if all(ok for _, ok in results):
        print(f"\nAll videos built successfully in: {VIDEOS}")
    else:
        print(f"\nSome videos failed. Check audio files exist in: {AUDIO}")
        sys.exit(1)


if __name__ == "__main__":
    main()
