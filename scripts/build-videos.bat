@echo off
REM ============================================================================
REM Build ALL story videos from image sequences + voice recordings
REM Run this after recording your narration with ElevenLabs or your own voice
REM ============================================================================
REM Requirements: ffmpeg installed and on PATH
REM
REM For each story:
REM   1. Record narration audio (e.g., story_rainy_day_parade.m4a)
REM   2. Run this script to generate the MP4
REM
REM Output: public/videos/story_*.mp4 for all 9 stories
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

REM ============================================================================
REM 1. Sleepy Little Bear (bedtime story - already exists, can rebuild)
REM ============================================================================
echo.
echo ==========================================
echo Building: Sleepy Little Bear
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\sleepy-little-bear\scene-01.png" -i "%SCENES%\sleepy-little-bear\scene-02.png" -i "%SCENES%\sleepy-little-bear\scene-03.png" -i "%SCENES%\sleepy-little-bear\scene-04.png" -i "%SCENES%\sleepy-little-bear\scene-05.png" -i "%SCENES%\sleepy-little-bear\scene-06.png" -i "%SCENES%\sleepy-little-bear\scene-07.png" -i "%SCENES%\sleepy-little-bear\scene-08.png" -i "%SCENES%\sleepy-little-bear\scene-09.png" -i "%SCENES%\sleepy-little-bear\scene-10.png" -i "%AUDIO%\story_sleepy_little_bear.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_sleepy_little_bear.mp4"

REM ============================================================================
REM 2. The Rainy Day Parade
REM ============================================================================
echo.
echo ==========================================
echo Building: The Rainy Day Parade
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\rainy-day-parade\scene-01.png" -i "%SCENES%\rainy-day-parade\scene-02.png" -i "%SCENES%\rainy-day-parade\scene-03.png" -i "%SCENES%\rainy-day-parade\scene-04.png" -i "%SCENES%\rainy-day-parade\scene-05.png" -i "%SCENES%\rainy-day-parade\scene-06.png" -i "%SCENES%\rainy-day-parade\scene-07.png" -i "%SCENES%\rainy-day-parade\scene-08.png" -i "%SCENES%\rainy-day-parade\scene-09.png" -i "%SCENES%\rainy-day-parade\scene-10.png" -i "%AUDIO%\story_rainy_day_parade.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_rainy_day_parade.mp4"

REM ============================================================================
REM 3. The Great Honey Harvest
REM ============================================================================
echo.
echo ==========================================
echo Building: The Great Honey Harvest
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\great-honey-harvest\scene-01.png" -i "%SCENES%\great-honey-harvest\scene-02.png" -i "%SCENES%\great-honey-harvest\scene-03.png" -i "%SCENES%\great-honey-harvest\scene-04.png" -i "%SCENES%\great-honey-harvest\scene-05.png" -i "%SCENES%\great-honey-harvest\scene-06.png" -i "%SCENES%\great-honey-harvest\scene-07.png" -i "%SCENES%\great-honey-harvest\scene-08.png" -i "%SCENES%\great-honey-harvest\scene-09.png" -i "%SCENES%\great-honey-harvest\scene-10.png" -i "%AUDIO%\story_great_honey_harvest.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_great_honey_harvest.mp4"

REM ============================================================================
REM 4. Benny's Night Under the Stars
REM ============================================================================
echo.
echo ==========================================
echo Building: Benny's Night Under the Stars
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\night-under-stars\scene-01.png" -i "%SCENES%\night-under-stars\scene-02.png" -i "%SCENES%\night-under-stars\scene-03.png" -i "%SCENES%\night-under-stars\scene-04.png" -i "%SCENES%\night-under-stars\scene-05.png" -i "%SCENES%\night-under-stars\scene-06.png" -i "%SCENES%\night-under-stars\scene-07.png" -i "%SCENES%\night-under-stars\scene-08.png" -i "%SCENES%\night-under-stars\scene-09.png" -i "%SCENES%\night-under-stars\scene-10.png" -i "%AUDIO%\story_night_under_stars.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_night_under_stars.mp4"

REM ============================================================================
REM 5. Benny Bear's Adventure
REM ============================================================================
echo.
echo ==========================================
echo Building: Benny Bear's Adventure
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\benny-adventure\scene-01.png" -i "%SCENES%\benny-adventure\scene-02.png" -i "%SCENES%\benny-adventure\scene-03.png" -i "%SCENES%\benny-adventure\scene-04.png" -i "%SCENES%\benny-adventure\scene-05.png" -i "%SCENES%\benny-adventure\scene-06.png" -i "%SCENES%\benny-adventure\scene-07.png" -i "%SCENES%\benny-adventure\scene-08.png" -i "%SCENES%\benny-adventure\scene-09.png" -i "%SCENES%\benny-adventure\scene-10.png" -i "%AUDIO%\story_benny_adventure.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_benny_adventure.mp4"

REM ============================================================================
REM 6. Chicken Dance Party
REM ============================================================================
echo.
echo ==========================================
echo Building: Chicken Dance Party
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\chicken-dance\scene-01.png" -i "%SCENES%\chicken-dance\scene-02.png" -i "%SCENES%\chicken-dance\scene-03.png" -i "%SCENES%\chicken-dance\scene-04.png" -i "%SCENES%\chicken-dance\scene-05.png" -i "%SCENES%\chicken-dance\scene-06.png" -i "%SCENES%\chicken-dance\scene-07.png" -i "%SCENES%\chicken-dance\scene-08.png" -i "%SCENES%\chicken-dance\scene-09.png" -i "%SCENES%\chicken-dance\scene-10.png" -i "%AUDIO%\story_chicken_dance.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_chicken_dance.mp4"

REM ============================================================================
REM 7. Tommy Turkey's Day
REM ============================================================================
echo.
echo ==========================================
echo Building: Tommy Turkey's Day
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\tommy-turkey\scene-01.png" -i "%SCENES%\tommy-turkey\scene-02.png" -i "%SCENES%\tommy-turkey\scene-03.png" -i "%SCENES%\tommy-turkey\scene-04.png" -i "%SCENES%\tommy-turkey\scene-05.png" -i "%SCENES%\tommy-turkey\scene-06.png" -i "%SCENES%\tommy-turkey\scene-07.png" -i "%SCENES%\tommy-turkey\scene-08.png" -i "%SCENES%\tommy-turkey\scene-09.png" -i "%SCENES%\tommy-turkey\scene-10.png" -i "%AUDIO%\story_tommy_turkey.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_tommy_turkey.mp4"

REM ============================================================================
REM 8. Ranch Morning Routine
REM ============================================================================
echo.
echo ==========================================
echo Building: Ranch Morning Routine
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\ranch-morning\scene-01.png" -i "%SCENES%\ranch-morning\scene-02.png" -i "%SCENES%\ranch-morning\scene-03.png" -i "%SCENES%\ranch-morning\scene-04.png" -i "%SCENES%\ranch-morning\scene-05.png" -i "%SCENES%\ranch-morning\scene-06.png" -i "%SCENES%\ranch-morning\scene-07.png" -i "%SCENES%\ranch-morning\scene-08.png" -i "%SCENES%\ranch-morning\scene-09.png" -i "%SCENES%\ranch-morning\scene-10.png" -i "%AUDIO%\story_ranch_morning.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_ranch_morning.mp4"

REM ============================================================================
REM 9. Starlight Lullaby
REM ============================================================================
echo.
echo ==========================================
echo Building: Starlight Lullaby
echo ==========================================
ffmpeg -y -f lavfi -i color=c=black:s=800x450:d=0.1 -i "%SCENES%\starlight-lullaby\scene-01.png" -i "%SCENES%\starlight-lullaby\scene-02.png" -i "%SCENES%\starlight-lullaby\scene-03.png" -i "%SCENES%\starlight-lullaby\scene-04.png" -i "%SCENES%\starlight-lullaby\scene-05.png" -i "%SCENES%\starlight-lullaby\scene-06.png" -i "%SCENES%\starlight-lullaby\scene-07.png" -i "%SCENES%\starlight-lullaby\scene-08.png" -i "%SCENES%\starlight-lullaby\scene-09.png" -i "%SCENES%\starlight-lullaby\scene-10.png" -i "%AUDIO%\story_starlight_lullaby.m4a" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=17.5[v1]; [v1][2:v]xfade=transition=fade:duration=0.5:offset=34.5[v2]; [v2][3:v]xfade=transition=fade:duration=0.5:offset=51.5[v3]; [v3][4:v]xfade=transition=fade:duration=0.5:offset=68.5[v4]; [v4][5:v]xfade=transition=fade:duration=0.5:offset=85.5[v5]; [v5][6:v]xfade=transition=fade:duration=0.5:offset=102.5[v6]; [v6][7:v]xfade=transition=fade:duration=0.5:offset=119.5[v7]; [v7][8:v]xfade=transition=fade:duration=0.5:offset=136.5[v8]; [v8][9:v]xfade=transition=fade:duration=0.5:offset=153.5[v9]; [v9][10:v]xfade=transition=fade:duration=0.5:offset=170.5[v10]; [v10]format=yuv420p[video]" -map "[video]" -map 11:a -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k -movflags +faststart -pix_fmt yuv420p "%VIDEOS%\story_starlight_lullaby.mp4"

REM ============================================================================
REM DONE!
REM ============================================================================
echo.
echo ==========================================
echo DONE! All 9 videos built:
echo   %VIDEOS%\story_sleepy_little_bear.mp4
echo   %VIDEOS%\story_rainy_day_parade.mp4
echo   %VIDEOS%\story_great_honey_harvest.mp4
echo   %VIDEOS%\story_night_under_stars.mp4
echo   %VIDEOS%\story_benny_adventure.mp4
echo   %VIDEOS%\story_chicken_dance.mp4
echo   %VIDEOS%\story_tommy_turkey.mp4
echo   %VIDEOS%\story_ranch_morning.mp4
echo   %VIDEOS%\story_starlight_lullaby.mp4
echo ==========================================
pause
