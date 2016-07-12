import axios from 'axios';

export function getBio(username) {
  username = username.toLowerCase().trim();
  const url = `https://api.github.com/users/${username}`;
  return fetch(url).then(res => res.json());
}

export function getRepos(username) {
  username = username.toLowerCase().trim();
  // const url = `http://facebook.github.io/react-native/movies.json`;
  const url = `https://api.github.com/users/${username}/repos`;
  return axios.get(url).then(res => res.data);
}

export function getNotes(username) {
  username = username.toLowerCase().trim();
  // const url = `https://blowing.firebaseio.com/${username}.json`;
  // const url = `https://github-saver-chen.firebaseio.com/${username}.json`;
  const url = `http://facebook.github.io/react-native/movies.json`;
  console.log(url);
  // const url = `https://api.github.com/users/${username}/repos`;
  // return fetch(url).then(res => res.json());
  return axios.get(url).then(res => res.data);
}

export function addNote(username, note) {
  username = username.toLowerCase().trim();
  const url = `https://github-saver-chen.firebaseio.com/${username}.json`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(note)
  }).then(res => {
    return res.json()
  });
}
