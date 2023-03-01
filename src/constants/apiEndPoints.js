export const BACKEND_URL = 'http://localhost:8000/';

export const GET_EVENT_DATA = {
  url: 'api/events',
  method: 'get',
};

export const GET_SONG_LIKE = (songId) => ({
  url: `api/records/${songId}/likes`,
  method: 'get',
});

export const UPDATE_EVENT_DATA = (songId) => ({
  url: `api/events/${songId}`,
  method: 'patch',
});
