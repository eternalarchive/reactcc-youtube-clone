import React from 'react';
import VideoListItem from './video_list_item';
import './video_list.css';
import uuid from 'uuid'

const VideoList = ({ videos, onVideoSelect }) => {
  const _videos = videos.map(video => <VideoListItem {...video} key={uuid.v4()} onVideoSelect={onVideoSelect} />);
  return (
    <div>
      {_videos}
    </div>
  );
};

export default VideoList;