import React from "react";
import "./VideoPlayer.css";
import qs from "query-string";
import uuid from "uuid";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { like, dislike, comment, commentdelete } from "../../actions";
import { withRouter } from "react-router-dom";

import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar";

const VideoPlayer = (props) => {
  // REST API
  const { id } = props.match.params;
  // QUERY STRING
  const { v } = qs.parse(props.location.search);
  const _id = id || v;
  if (!_id) return null;
  const url = `https://youtube.com/embed/${id || v}`;

  const commentInputRef = React.createRef();

  const clickSub = (id, value) => {
    const cid = uuid.v4();
    props.comment({ id, value, cid });
    commentInputRef.current.value = "";
  };

  return (
    <div className="video-player-box">
      <h1 className="a11y-hidden">YOUTUBE</h1>
      <Nav>
        <SearchBar
          onSearchVideos={(v) => {
            this.props.history.push(`/results?search_query=${v}`);
          }}
        />
      </Nav>
      <div className="video-detail">
        <iframe src={url} title={_id} className="video-player" />

        <div className="video-fav-info">
          <button className="good btn" onClick={() => props.like(_id)}>
            GOOD
          </button>
          {props.data[_id] && props.data[_id].count ? props.data[_id].count : 0}

          <button className="bad btn" onClick={() => props.dislike(_id)}>
            BAD
          </button>
          {props.data[_id] && props.data[_id].count2
            ? props.data[_id].count2
            : 0}
        </div>
        <div>
          Write a comment :
          <input className="comment-input" ref={commentInputRef}></input>
          <button
            className="comment-subbtn"
            onClick={() => clickSub(_id, commentInputRef.current.value)}
          >
            등록
          </button>
        </div>
        <ul className="comments-box">
          <p className="comments-title">Comments</p>
          {props.data[_id] &&
            props.data[_id].comments &&
            props.data[_id].comments.map((comment) => {
              console.log("cc", _id);
              return (
                <li key={comment.id} className="comment-list">
                  <span>{comment.text}</span>
                  <button
                    className="comment-remove-btn"
                    onClick={() =>
                      props.commentdelete({
                        commentId: comment.id,
                        videoId: _id,
                      })
                    }
                  >
                    X
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    data: state.videos.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      like,
      dislike,
      comment,
      commentdelete,
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)
);
