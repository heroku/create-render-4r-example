import fetch from 'isomorphic-fetch';

export const SET_COUNTER = 'SET_COUNTER'

export function set(value) {
  return {
    type: SET_COUNTER,
    payload: value
  }
}

export function get() {
  return (dispatch, getState) => {
    const state = getState();
    const proto = state.sourceRequest.protocol;
    const host = state.sourceRequest.host;

    return fetch(`${proto}://${host}/api/count`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => detectStatus(response))
      .then(json => dispatch(set(parseInt(json.value, 10))))
      .catch(error => {
        console.error('fetch error for GET /api/count', error);
    });
  };
}

export function increment() {
  return (dispatch, getState) => {
    const state = getState();
    const proto = state.sourceRequest.protocol;
    const host = state.sourceRequest.host;

    return fetch(`${proto}://${host}/api/count/increment`, {
        method: 'post',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => detectStatus(response))
      .then(json => dispatch(set(parseInt(json.value, 10))))
      .catch(error => {
        console.error('fetch error for POST /api/count/increment', error);
    });
  };
}

export function decrement() {
  return (dispatch, getState) => {
    const state = getState();
    const proto = state.sourceRequest.protocol;
    const host = state.sourceRequest.host;

    return fetch(`${proto}://${host}/api/count/decrement`, {
        method: 'post',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => detectStatus(response))
      .then(json => dispatch(set(parseInt(json.value, 10))))
      .catch(error => {
        console.error('fetch error for POST /api/count/decrement', error);
    });
  };
}

function detectStatus(response) {
  const status = response.status;
  if (status >= 200 && status <= 299) {
    return response.json();
  } else {
    throw new Error(`${response.status} ${response.statusText}`);
  }
}
