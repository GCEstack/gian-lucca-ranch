#!/usr/bin/env python3
"""
Build ALL story videos from image sequences + voice recordings using ffmpeg.
Each scene is shown for an equal share of the audio duration, so no audio is cut off.

Usage:
    python scripts/build-videos.py

Requires:
    - Scene images in public/story-scenes/<story>/ (10 scenes each)
    - Audio files in public/audio/

Output:
    - public/videos/story_*.mp4 for all stories with audio + scenes
"""

import os
import subprocess
import sys
from pathlib import Path

try:
    import imageio_ffmpeg
    FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG_EXE = os.environ.get("FFMPEG_PATH", "ffmpeg")

BASE = Path(__file__).parent.parent
SCENES = BASE / "public" / "story-scenes"
VIDEOS = BASE / "public" / "videos"
AUDIO = BASE / "public" / "audio"

VIDEOS.mkdir(exist_ok=True)


def check_ffmpeg():
    try:
        subprocess.run([FFMPEG_EXE, "-version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def get_duration(path: Path) -> float:
    result = subprocess.run(
        [FFMPEG_EXE, "-i", str(path)],
        capture_output=True,
        text=True,
    )
    for line in result.stderr.splitlines():
        if "Duration:" in line:
            time_str = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = time_str.split(":")
            return int(h) * 3600 + int(m) * 60 + float(s)
    raise RuntimeError(f"Could not determine duration for {path}")


def build_video(story_name, audio_file, output_file):
    """
    Build a video from 10 scene images + audio using ffmpeg concat demuxer.
    Scene duration is calculated from the audio so nothing gets cut.
    """
    scene_dir = SCENES / story_name
    if not scene_dir.exists():
        print(f"ERROR: Scene directory not found: {scene_dir}")
        return False

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

    audio_duration = get_duration(audio_path)
    scene_duration = audio_duration / 10
    print(f"  Audio duration: {audio_duration:.2f}s -> scene duration: {scene_duration:.2f}s")

    concat_file = VIDEOS / f"{story_name}_concat.txt"
    with open(concat_file, "w") as f:
        for sf in scene_files:
            f.write(f"file '{sf}'\n")
            f.write(f"duration {scene_duration}\n")
        f.write(f"file '{scene_files[-1]}'\n")

    output = VIDEOS / output_file

    cmd = [
        FFMPEG_EXE, "-y",
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
        str(output)
    ]

    print(f"\n{'='*50}")
    print(f"Building: {story_name}")
    print(f"{'='*50}")
    print(f"Scenes: {len(scene_files)}")
    print(f"Audio: {audio_path}")
    print(f"Output: {output}")

    result = subprocess.run(cmd, capture_output=True, text=True)
    concat_file.unlink(missing_ok=True)
    if result.returncode != 0:
        print(f"ERROR building {story_name}:")
        print(result.stderr)
        return False

    # Safety trim: concat demuxer can add a trailing frame; ensure video matches audio
    tmp_output = output.with_suffix(".trimmed.mp4")
    trim_cmd = [
        FFMPEG_EXE, "-y",
        "-i", str(output),
        "-i", str(audio_path),
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-c:v", "copy",
        "-c:a", "copy",
        "-t", str(audio_duration),
        "-shortest",
        str(tmp_output),
    ]
    trim_result = subprocess.run(trim_cmd, capture_output=True, text=True)
    if trim_result.returncode != 0:
        print(f"ERROR trimming {story_name}:")
        print(trim_result.stderr)
        return False
    tmp_output.replace(output)

    final_duration = get_duration(output)
    print(f"SUCCESS: {output} ({final_duration:.2f}s)")
    return True


def main():
    if not check_ffmpeg():
        print("ERROR: ffmpeg not found.")
        print("Install ffmpeg or set FFMPEG_PATH environment variable.")
        sys.exit(1)

    stories = [
        # (scene_dir_name, audio_filename, output_filename)
        ("sleepy-little-bear", "story_sleepy_bear.m4a", "story_sleepy_little_bear.mp4"),
        ("rainy-day-parade", "story_rainy_day_parade.m4a", "story_rainy_day_parade.mp4"),
        ("great-honey-harvest", "story_great_honey_harvest.m4a", "story_great_honey_harvest.mp4"),
        ("night-under-stars", "story_night_under_stars.m4a", "story_night_under_stars.mp4"),
        ("benny-adventure", "story_benny_adventure.m4a", "story_benny_adventure.mp4"),
        ("chicken-dance", "story_chicken_dance.m4a", "story_chicken_dance.mp4"),
        ("tommy-turkey", "story_tommy_turkey.m4a", "story_tommy_turkey.mp4"),
        ("ranch-morning", "story_ranch_morning.m4a", "story_ranch_morning.mp4"),
        ("starlight-lullaby", "story_starlight_lullaby.m4a", "story_starlight_lullaby.mp4"),
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
