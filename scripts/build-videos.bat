@echo off
REM ============================================================================
REM Build story videos from image sequences + voice recordings
REM Run this after recording your narration with ElevenLabs or your own voice
REM ============================================================================
REM Requirements: ffmpeg installed and on PATH
REM
REM For each story:
REM   1. Record narration audio (e.g., story_rainy_day_parade.m4a)
REM   2. Run this script to generate the MP4
REM
REM Output: public/videos/story_rainy_day_parade.mp4
REM         public/videos/story_great_honey_harvest.mp4
REM         public/videos/story_night_under_stars.mp4
REM ============================================================================

set BASE=%~dp0..
set SCENES=%BASE%\public\story-scenes
set VIDEOS=%BASE%\public\videos
set AUDIO=%BASE%\public\audio

if not exist "%VIDEOS%" mkdir "%VIDEOS%"

where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: ffmpeg not found. Install ffmpeg and add to PATH.
    echo Download: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

echo.
echo ==========================================
echo Building: The Rainy Day Parade
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\rainy-day-parade\scene-01.png" -i "%SCENES%\rainy-day-parade\scene-02.png" -i "%SCENES%\rainy-day-parade\scene-03.png" -i "%SCENES%\rainy-day-parade\scene-04.png" -i "%SCENES%\rainy-day-parade\scene-05.png" -i "%SCENES%\rainy-day-parade\scene-06.png" -i "%SCENES%\rainy-day-parade\scene-07.png" -i "%SCENES%\rainy-day-parade\scene-08.png" -i "%SCENES%\rainy-day-parade\scene-09.png" -i "%SCENES%\rainy-day-parade\scene-10.png" -i "%AUDIO%\story_rainy_day_parade.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_rainy_day_parade.mp4"

echo.
echo ==========================================
echo Building: The Great Honey Harvest
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\great-honey-harvest\scene-01.png" -i "%SCENES%\great-honey-harvest\scene-02.png" -i "%SCENES%\great-honey-harvest\scene-03.png" -i "%SCENES%\great-honey-harvest\scene-04.png" -i "%SCENES%\great-honey-harvest\scene-05.png" -i "%SCENES%\great-honey-harvest\scene-06.png" -i "%SCENES%\great-honey-harvest\scene-07.png" -i "%SCENES%\great-honey-harvest\scene-08.png" -i "%SCENES%\great-honey-harvest\scene-09.png" -i "%SCENES%\great-honey-harvest\scene-10.png" -i "%AUDIO%\story_great_honey_harvest.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_great_honey_harvest.mp4"

echo.
echo ==========================================
echo Building: Benny's Night Under the Stars
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\night-under-stars\scene-01.png" -i "%SCENES%\night-under-stars\scene-02.png" -i "%SCENES%\night-under-stars\scene-03.png" -i "%SCENES%\night-under-stars\scene-04.png" -i "%SCENES%\night-under-stars\scene-05.png" -i "%SCENES%\night-under-stars\scene-06.png" -i "%SCENES%\night-under-stars\scene-07.png" -i "%SCENES%\night-under-stars\scene-08.png" -i "%SCENES%\night-under-stars\scene-09.png" -i "%SCENES%\night-under-stars\scene-10.png" -i "%AUDIO%\story_night_under_stars.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_night_under_stars.mp4"

echo.
echo ==========================================
echo DONE! Videos built:
echo   %VIDEOS%\story_rainy_day_parade.mp4
echo   %VIDEOS%\story_great_honey_harvest.mp4
echo   %VIDEOS%\story_night_under_stars.mp4
echo ==========================================
pause
