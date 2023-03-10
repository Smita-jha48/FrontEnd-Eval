import React, { useState } from 'react';
import bookmarkimg from '../../assets/bookmark-regular.svg';
import crossimg from '../../assets/circle-xmark-regular.svg';
import bookmarkfillimg from '../../assets/bookmark-solid.svg';
import circlecheck from '../../assets/circle-check-regular.svg';
import { UPDATE_EVENT_DATA } from '../../constants/apiEndPoints';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import Header from '../Header';
import './SingleEventCard.css';

function SingleEventCard({ data }) {
    console.log(data);
  const navigate = useNavigate();
  const [register, setRegister] = useState(data.isRegistered);
  const [bookmark, setBookmark] = useState(data.isBookmarked);
  const handleRegister = async (id) => {
    try {
      await makeRequest(
        UPDATE_EVENT_DATA(id),
        {
          data: {
            isRegistered: !register,
          },
        },
        navigate
      );
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

  const handleBookmark = async (id) => {
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

  return (
    <div className='single-card-body'>
    <Header />
    <div className="card-container-single">
      <div className="card-single">
        <img className="card-img-single" src={data.imgUrl} alt="song" />
        <div className="card-footer-single flex">
          <p className="event-name-single">{data.name}</p>
          <p className="description-single">{data.description}</p>
          <p>VENUE: {data.venue}</p>
          <p>DATE: {data.datetime}</p>
          <div className="bookmark-register-single">
            {register ? (
              <>
                <div className="card-subfooter-single flex">
                  <div className="flex">
                    <img className="icon" src={circlecheck} alt="registered" />
                    <p>REGISTERED</p>
                  </div>
                  <img
                    className="icon"
                    src={bookmark ? bookmarkfillimg : bookmarkimg}
                    alt="bookmarked"
                    onClick={() => handleBookmark(data.id)}
                  />
                </div>
                <div >
                  <button className="card-button-single" onClick={() => handleRegister(data.id)}>
                    Unregister
                  </button>
                </div>
              </>
            ) : !data.areSeatsAvailable ? (
              <>
                <div className="card-subfooter-single flex">
                  <div className="flex">
                    <img className="icon" src={crossimg} alt="registered" />
                    <p>NO SEATS AVAILABLE</p>
                  </div>
                  <div>
                    <img
                      className="icon"
                      src={bookmark ? bookmarkfillimg : bookmarkimg}
                      alt="bookmark"
                      onClick={() => handleBookmark(data.id)}
                    />
                  </div>
                </div>
                <div >
                  <button className="card-button-single" onClick={() => handleRegister(data.id)}>
                    Unregister
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="card-subfooter-single flex">
                  <div></div>
                  <img
                    className="icon"
                    src={bookmark ? bookmarkfillimg : bookmarkimg}
                    alt="bookmark"
                    onClick={() => handleBookmark(data.id)}
                  />
                </div>
                <div>
                  <button className="card-button-single" onClick={() => handleRegister(data.id)}>
                    Register
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SingleEventCard;
