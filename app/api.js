import { reduce, isUndefined, includes } from 'lodash';

const API_ROOT = 'http://api.themoviedb.org/3';
const API_KEY = 'cfa0adf468d2103f9def27b896a6f917';

function serialize(obj) {
  return reduce(obj, (result, val, key, index) => {
    if(!isUndefined(val)) {
      return result.concat(`${index > 0 ? '&' : '?'}${key}=${encodeURIComponent(val)}`);
    }
    return result;
  }, '?');
}

function makeUrl(endpoint) {
  return includes(endpoint, API_ROOT) ? API_ROOT + endpoint : endpoint;
}

function callApi(endpoint, payload) {
  const url = makeUrl(endpoint);

  return fetch(url + serialize({...payload, api_key: API_KEY}))
    .then((response) => {
      return response.json()
      	.then((json) => {
      		return { json, response };
      	});
    }).then(({ json, response }) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
}

export const callSearch = payload => callApi('/search/multi', payload)