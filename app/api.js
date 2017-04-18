import { reduce, isUndefined, includes } from 'lodash';
import env from './env';

const API_ROOT = env.api;
const API_KEY = 'cfa0adf468d2103f9def27b896a6f917';

function serialize(obj) {
  return reduce(obj, (result, val, key) => {
    if(!isUndefined(val)) {
      return result.concat(`${result === '?' ? '' : '&'}${key}=${encodeURIComponent(val)}`);
    }
    return result;
  }, '?');
}

function makeUrl(endpoint) {
  return includes(endpoint, API_ROOT) ? endpoint : API_ROOT + endpoint;
}

function callApi(endpoint, payload) {
  const url = makeUrl(endpoint);

  return fetch(url + serialize({api_key: API_KEY, ...payload}))
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

export const callSelectPerson = ({person}) => callApi(`/person/${person.id}`, {append_to_response: 'combined_credits'})

export const callSearch = ({query}) => query ? callApi('/search/person', {query}) : Promise.reject('Nothing to search')
// export const callSelectPerson = ({person}) => callApi(`/person/${person.id}/combined_credits`)
