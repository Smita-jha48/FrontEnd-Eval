import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { GET_EVENT_DATA, GET_SONG_LIKE } from '../../constants/apiEndPoints';
import { Header, Home } from '../../components';

function HomePage() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  useEffect(() => {
    makeRequest(GET_EVENT_DATA, {}, navigate)
      .then(async (response) => {
        setEvent(response);
      })
      .catch((e) => {
        if (navigate) {
          const errorStatus = e.response?.status;
          if (errorStatus) {
            navigate(`error/${errorStatus}`);
          } else {
            navigate('error');
          }
        }
      });
  }, []);
  return (
    <>
      {event.length === 0 ? (
        <div>loading....</div>
      ) : (
        <div>
          <Header />
          <Home event={event} />
        </div>
      )}
    </>
  );
}

export default HomePage;
