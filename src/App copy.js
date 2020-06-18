import React, { Component } from "react";
import { debounce } from "lodash";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import uuid from "uuid";

import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import Nav from "./components/Nav/Nav";
import "./App.css";
import { spinner } from "./components/images";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

class App extends Component {
  constructor(props) {
    super(props);

    Object.getOwnPropertyNames(App.prototype).forEach(
      (key) => (this[key] = this[key].bind(this))
    );
    this.state = {
      videos: [],
      selectedVideo: null,
      query: "",
      nextPageToken: null,
    };
    this.defaultState = this.state;
  }

  async getYoutubeData(query) {
    console.log(query);
    if (!query) {
      this.setState(this.defaultState);
      return;
    }
    if (this.state.query !== query) {
      this.setState(this.defaultState);
    }

    const { nextPageToken } = this.state;
    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: query,
      part: "snippet",
      maxResults: 10,
      pageToken: nextPageToken,
    };
    const {
      data,
    } = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params,
    });

    this.setState({
      videos: [...this.state.videos, ...data.items],
      query,
      nextPageToken: data.nextPageToken,
    });
  }

  componentWillMount() {
    this.getYoutubeData("여행");
  }

  render() {
    const { selectedVideo } = this.state;
    return (
      <div className="App">
        <Nav>
          <SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)} />
        </Nav>
        {selectedVideo ? (
          <VideoPlayer videoId={selectedVideo} />
        ) : (
          <InfiniteScroll
            loadMore={() => this.getYoutubeData(this.state.query)}
            hasMore={!!this.state.nextPageToken}
            loader={
              <div key={uuid.v4()} className="loader">
                <img src={spinner} alt="loading" />
              </div>
            }
          >
            <VideoList
              {...this.state}
              onVideoSelect={(selectedVideo) =>
                this.setState({ selectedVideo })
              }
            />
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default App;
