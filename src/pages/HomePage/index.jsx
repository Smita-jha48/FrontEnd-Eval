import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { GET_EVENT_DATA } from '../../constants/apiEndPoints';
import { Header, Home } from '../../components';

function HomePage() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const handleRegister = (index) => {
    const newEvent = [...event];
    newEvent[index].isRegistered = !event[index].isRegistered;
    setEvent(newEvent);
  };
  const handleBookmark = (index) => {
    const newEvent = [...event];
    newEvent[index].isBookmarked = !event[index].isBookmarked;
    setEvent(newEvent);
  };
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
          <Home
            event={event}
            handleBookmark={handleBookmark}
            handleRegister={handleRegister}
          />
        </div>
      )}
    </>
  );
}

export default HomePage;
