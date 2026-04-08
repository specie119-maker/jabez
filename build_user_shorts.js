const fs = require('fs-extra');
const path = require('path');
const { createShortsVideo } = require('./agents/video');

async function buildShorts() {
    console.log("Building Shorts video for user...");
    
    const shortsDir = path.join(__dirname, '쇼츠영상');
    const files = await fs.readdir(shortsDir);
    
    // Extract video clips (skip music.mp4)
    const bgVideos = files
        .filter(f => (f.endsWith('.mp4') || f.endsWith('.mov')) && f !== 'music.mp4')
        .map(f => path.join(shortsDir, f));

    if (bgVideos.length === 0) {
        throw new Error("No video files found in 쇼츠영상 folder!");
    }

    const audioVideo = path.join(__dirname, '롱영상음원', 'ai_gen_track_1.mp3');
    const shortsOutput = path.join(__dirname, 'output', 'final_test_videos', 'user_real_shorts_v2.mp4');

    try {
        await createShortsVideo(bgVideos, audioVideo, shortsOutput, 30);
        console.log(`✅ SUCCESS! Created custom real Shorts at: ${shortsOutput}`);
    } catch (e) {
        console.error("❌ ERROR generating shorts:", e);
    }
}

buildShorts();
