import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookmarkimg from '../../assets/bookmark-regular.svg';
import crossimg from '../../assets/circle-xmark-regular.svg';
import nocrossimg from '../../assets/circle-notch-solid.svg';
import bookmarkfillimg from '../../assets/bookmark-solid.svg';
import { UPDATE_EVENT_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import circlecheck from '../../assets/circle-check-regular.svg';
import './EventCard.css';

function EventCard({ id, index, data }) {
  const navigate = useNavigate();
  const [register, setRegister] = useState(data.isRegistered);
  const [bookmark, setBookmark] = useState(data.isBookmarked);
  const handleRegister = async (id, index) => {
    try {
      await makeRequest(
        UPDATE_EVENT_DATA(id),
        {
          data: {
            isRegistered: !data.isRegistered,
          },
        },
        navigate
      );
      setRegister(!data.isRegistered);
    } catch (e) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`error/${errorStatus}`);
      } else {
        navigate('error');
      }
    }
  };

  const handleBookmark = async (id, index) => {
    try {
      await makeRequest(
        UPDATE_EVENT_DATA(id),
        {
          data: {
            isBookmarked: !data.isBookmarked,
          },
        },
        navigate
      );
      setBookmark(!data.isBookmarked);
    } catch (e) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`error/${errorStatus}`);
      } else {
        navigate('error');
      }
    }
  };

  return (
    <div className="card-container">
      <div className="card ">
        <img className="card-img" src={data.imgUrl} alt="song" />
        <div className="card-footer ">
          <p className="event-name">{data.name}</p>
          <p className="description">{data.description}</p>
          <p>VENUE: {data.venue}</p>
          <p>DATE: {data.datetime}</p>
          <div className="bookmark-register">
            {register ? (
              <>
                <div className="card-footer flex">
                  <div className='flex'>
                    <img className="icon" src={circlecheck} alt="registered" />
                    <p>REGISTERED</p>
                  </div>
                  <img
                    className="icon"
                    src={bookmark ? bookmarkimg : bookmarkfillimg}
                    alt="bookmarked"
                    onClick={() => handleBookmark(id, index)}
                  />
                </div>
                <div className="card-button flex">
                  <button onClick={() => handleRegister(id, index)}>
                    Unregister
                  </button>
                </div>
              </>
            ) : !data.areSeatsAvailable ? (
              <>
                <div className="card-footer flex">
                  <div className='flex'>
                    <img className="icon" src={crossimg} alt="registered" />
                    <p>NO SEATS AVAILABLE</p>
                  </div>
                  <div>
                    <img
                      className="icon"
                      src={bookmark ? bookmarkimg : bookmarkfillimg}
                      alt="bookmark"
                      onClick={() => handleBookmark(id, index)}
                    />
                  </div>
                </div>
                <div className="card-button flex">
                  <button onClick={() => handleRegister(id, index)}>
                    Unregister
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="card-footer flex">
                  <div></div>
                  <img
                    className="icon"
                    src={bookmark ? bookmarkimg : bookmarkfillimg}
                    alt="bookmark"
                    onClick={() => handleBookmark(id, index)}
                  />
                </div>
                <div className="card-button flex">
                  <button onClick={() => handleRegister(id, index)}>
                    Register
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
