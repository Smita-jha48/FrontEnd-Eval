export const BACKEND_URL = 'http://localhost:8000/';

export const GET_EVENT_DATA = {
  url: 'api/events',
  method: 'get',
};

export const GET_EACH_EVENT = (id) => ({
  url: `api/events/${id}`,
  method: 'get',
});

export const UPDATE_EVENT_DATA = (songId) => ({
  url: `api/events/${songId}`,
  method: 'patch',
});
