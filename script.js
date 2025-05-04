// HTML 要素の取得
const urlInput = document.getElementById('input-url');
const titleInput = document.getElementById('input-title');
const addButton = document.getElementById('add-button');
const videoContainer = document.getElementById('video-container');
const clearButton = document.getElementById('clear-button');

let videos = []

function getVideoIdFromUrl(url) {
    if (!url) {
        console.error("URLが空です");
        return null;
    }
    try {
        console.log("URL:", url);
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const videoId = pathname.slice(1); // 先頭の "/" を削除
        return videoId;
    } catch (error) {
        console.error("URL解析エラー:", error);
        return null;
    }
}



function addVideoToList() {
    const url = urlInput.value;
    const title = titleInput.value;
    const videoID = getVideoIdFromUrl(url);
    if (!videoID) {
        alert("URLが無効です");
        return;
    }

    const existingVideo = videos.find(video => video.id === videoID);
    if (!existingVideo) {
        const newVideo = { id: videoID, title: title };
        let storedVideos = localStorage.getItem('videoList');
        let videoList = storedVideos ? JSON.parse(storedVideos) : [];
        videoList.push(newVideo);
        localStorage.setItem('videoList', JSON.stringify(videoList));
        displayVideoList();
    } else {
        alert("この動画はすでに存在します");
    }
    urlInput.value = '';
    titleInput.value = '';
}


function displayVideoList() {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // 既存のリストをクリア
    const storedVideos = localStorage.getItem('videoList');
    let videoList = storedVideos ? JSON.parse(storedVideos) : [];

    // 動画リストをループして表示
    videoList.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';

        // サムネイル画像のURL (YouTubeから自動取得)
        const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

        videoCard.innerHTML = `
                <div class="video-card">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div class="video-title">${video.title}</div>
                </div>
            `;

        videoContainer.appendChild(videoCard);
    });
    
    console.log(videos);
}

function clearList() {
    localStorage.clear();
    videos = [];
}

displayVideoList();
addButton.addEventListener('click', addVideoToList);
clearButton.addEventListener('click', clearList);