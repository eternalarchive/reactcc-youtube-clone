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
import { withRouter } from "react-router-dom";
import qs from "query-string";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateQuery } from "./actions";

class Main extends Component {
  constructor(props) {
    super(props);

    Object.getOwnPropertyNames(Main.prototype).forEach(
      (key) => (this[key] = this[key].bind(this))
    );
    this.state = {
      videos: [],
      nextPageToken: null,
    };
    this.defaultState = this.state;
  }

  _getYoutubeData = debounce(async (query, isChanged) => {
    if (isChanged) {
      this.setState(this.defaultState);
    }

    try {
      const { nextPageToken } = this.state;
      const params = {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        maxResults: 10,
        pageToken: nextPageToken,
      };

      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params,
        }
      );

      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken,
      });
    } catch (e) {}
  }, 500);

  getYoutubeData(query) {
    let isChanged = false;
    if (this.props.query !== query) {
      isChanged = true;
      this.props.updateQuery(query);
    }

    this._getYoutubeData(query, isChanged);
  }

  componentDidMount() {
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      if (search_query) this.getYoutubeData(search_query || "");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      const { search_query: prev } = qs.parse(prevProps.location.search);
      if (search_query !== prev) {
        this.getYoutubeData(search_query || "");
      }
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="a11y-hidden">YOUTUBE</h1>
        <Nav>
          <SearchBar
            onSearchVideos={(v) => {
              this.props.history.push(`/results?search_query=${v}`);
            }}
          />
        </Nav>
        <InfiniteScroll
          loadMore={() => this.getYoutubeData(this.props.query)}
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
              this.props.history.push(`watch?v=${selectedVideo}`)
            }
          />
        </InfiniteScroll>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.videos.query,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateQuery,
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
