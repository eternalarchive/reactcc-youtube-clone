import { UPDATE_QUERY } from "../actions";
import { LIKE } from "../actions";
import { DISLIKE } from "../actions";
import { COMMENT } from "../actions";
import { DELETE } from "../actions";
import { Z_DATA_ERROR } from "zlib";

const INITIAL_STATE = {
  query: "",
  data: {},
};

export default function videos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case LIKE:
      const video = state.data[action.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            count: video && video.count ? video.count + 1 : 1,
          },
        },
      };
    case DISLIKE:
      const video2 = state.data[action.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video2,
            count2: video2 && video2.count2 ? video2.count2 + 1 : 1, // 최초 상태가 빈객체이므로 존재하지 않으면 1로 만들어주기
          },
        },
      };
    case COMMENT:
      const _comments = state.data[action.id.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id.id]: {
            ..._comments,
            comments:
              _comments && _comments.comments
                ? [
                    { text: action.id.value, id: action.id.cid },
                    ..._comments.comments,
                  ]
                : [{ text: action.id.value, id: action.id.cid }],
          },
        },
      };
    case DELETE:
      const _comments2 = state.data[action.id.videoId];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id.videoId]: {
            ..._comments2,
            comments:
              _comments2 &&
              _comments2.comments.filter((c) => c.id !== action.id.commentId),
          },
        },
      };
    default:
      return state;
  }
}
