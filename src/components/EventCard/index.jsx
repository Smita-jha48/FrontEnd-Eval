import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookmarkimg from '../../assets/bookmark-regular.svg';
import crossimg from '../../assets/circle-xmark-regular.svg';
import bookmarkfillimg from '../../assets/bookmark-solid.svg';
import { UPDATE_EVENT_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import circlecheck from '../../assets/circle-check-regular.svg';
import PropTypes from 'prop-types';
import './EventCard.css';

function EventCard({ id, index, data, handleBookmarked, handleRegistered }) {
  const navigate = useNavigate();
  const [register, setRegister] = useState(data.isRegistered);
  const [bookmark, setBookmark] = useState(data.isBookmarked);
  const handleRegister = async (id, index) => {
    try {
      console.log(register);
      await makeRequest(
        UPDATE_EVENT_DATA(id),
        {
          data: {
            isRegistered: !register,
          },
        },
        navigate
      );
      handleRegistered(index);
      setRegister(!register);
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
            isBookmarked: !bookmark,
          },
        },
        navigate
      );
      handleBookmarked(index);
      setBookmark(!bookmark);
    } catch (e) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`error/${errorStatus}`);
      } else {
        navigate('error');
      }
    }
  };

  const handleSingleCard = (id) => {
    navigate(`singlecard/${id}`);
  };

  return (
    <div className="card-container">
      <div className="card ">
        <img
          className="card-img"
          src={data.imgUrl}
          alt="song"
          onClick={() => handleSingleCard(id)}
        />
        <div className="card-footer ">
          <p className="event-name">{data.name}</p>
          <p className="description">{data.description}</p>
          <p>VENUE: {data.venue}</p>
          <p>DATE: {data.datetime}</p>
          <div className="bookmark-register">
            {register ? (
              <>
                <div className="card-footer flex">
                  <div className="flex">
                    <img className="icon" src={circlecheck} alt="registered" />
                    <p>UNREGISTERED</p>
                  </div>
                  <img
                    className="icon"
                    src={bookmark ? bookmarkfillimg : bookmarkimg}
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
                  <div className="flex">
                    <img className="icon" src={crossimg} alt="registered" />
                    <p>NO SEATS AVAILABLE</p>
                  </div>
                  <div>
                    <img
                      className="icon"
                      src={bookmark ? bookmarkfillimg : bookmarkimg}
                      alt="bookmark"
                      onClick={() => handleBookmark(id, index)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card-footer flex">
                  <div></div>
                  <img
                    className="icon"
                    src={bookmark ? bookmarkfillimg : bookmarkimg}
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
