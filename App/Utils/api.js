export function getBio(username) {
  username = username.toLowerCase().trim();
  const url = `https://api.github.com/users/${username}`;
  return fetch(url).then(res => res.json());
}

export function getRepos(username) {
  username = username.toLowerCase().trim();
  const url = `https://api.github.com/users/${username}/repos`;
  return fetch(url).then(res => res.json());
}

export function getNotes(username) {
  username = username.toLowerCase().trim();
  const url = `https://github-saver-chen.firebaseio.com/${username}.json`;
  return fetch(url).then(res => res.json());
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
