import React from "react";
import "./search_bar.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateQuery } from "../../actions";

const SearchBar = (props) => {
  const handleEnter = (search) => (e) => {
    if (e.key === "Enter") {
      search(e.target.value);
    }
  };
  let input;
  return (
    <div className="search-wrapper">
      <input
        ref={(ref) => (input = ref)}
        type="search"
        defaultValue={props.query}
        onChange={(e) => props.onSearchVideos(e.target.value)}
        onKeyPress={handleEnter(props.onSearchVideos)}
        className="search-bar"
        placeholder="검색어를 입력하세요"
      />
      <button onClick={() => props.onSearchVideos(input.value)}>
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className="yt-icon"
          style={{
            pointerEvents: "none",
            display: "block",
            height: "15px",
            width: "20px",
          }}
        >
          <g className="yt-icon">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              className="style-scope yt-icon"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
