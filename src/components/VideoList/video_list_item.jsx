import React from "react";
import "./video_list.css";

const VideoListItem = props => {
  const videoData = {
    title: props.snippet.title,
    img: props.snippet.thumbnails.default.url,
    channel: props.snippet.channelTitle,
    id: props.id.videoId
  };
  return (
    <ul className="list-group-item">
      <li className="list-item" onClick={() => props.onVideoSelect(videoData.id)}>
        <img src={videoData.img} alt={videoData.title} className="thumbnail" />
        <div className="text-container">
          <span className="video-list-title">{videoData.title}</span>
          <small className="channelName">{videoData.channel}</small>
        </div>
      </li>
    </ul>
  );
};

export default VideoListItem;
