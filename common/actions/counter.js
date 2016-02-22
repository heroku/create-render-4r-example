import fetch from 'isomorphic-fetch';

export const SET_COUNTER  = 'SET_COUNTER'
export const SUBSCRIBED   = 'SUBSCRIBED'
export const UNSUBSCRIBED = 'UNSUBSCRIBED'

export function set(value) {
  return {
    type: SET_COUNTER,
    payload: value
  }
}

export function subscribe() {
  return (dispatch, getState) => {
    const state = getState();

    if (state.counter.subscription) { return }

    const proto = state.sourceRequest.protocol;
    const host = state.sourceRequest.host;

    var source = new EventSource(`${proto}://${host}/api/count`);
    dispatch(subscribed(source));

    source.addEventListener("message", function(e) {
      var countValue = JSON.parse(e.data);
      dispatch(set(parseInt(countValue, 10)));
    });
  };
}

export function subscribed(subscription) {
  return {
    type: SUBSCRIBED,
    subscription: subscription
  }
}

export function unsubscribe() {
  return (dispatch, getState) => {
    const state = getState();
    const subscription = state.counter.subscription;
    if (subscription == null) { return }
    subscription.close();
    dispatch(unsubscribed());
  };
}

export function unsubscribed() {
  return {
    type: UNSUBSCRIBED
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
