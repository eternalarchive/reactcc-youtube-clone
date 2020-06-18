export const UPDATE_QUERY = 'UPDATE_QUERY';
export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';
export const COMMENT = 'COMMENT';
export const DELETE = 'DELETE';

export function updateQuery(query) {
  return({ type: UPDATE_QUERY, query })
}

export function like(id) {
  return ({ type: LIKE, id})
}

export function dislike(id) {
  return ({ type: DISLIKE, id})
}

export function comment(id, val) {
  return ({ type: COMMENT, id, val })
}

export function commentdelete(id) {
  return ({ type: DELETE, id })
}

