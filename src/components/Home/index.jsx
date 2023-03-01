import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import EventCard from '../EventCard';
import './Home.css';

function Header({ event }) {
  const [toggle, setToggle] = useState(true);
  const [filterType, setFilterType] = useState('areSeatsAvailable');
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container">
      <div className="header">
        <div className="filter">
          <div className="topbar flex">
            <div className="filter-section">
              <div className="flex sub-filter-section">
                <div>
                  <FontAwesomeIcon icon={faFilter} />
                </div>
                <div>FILTER</div>
                <div>
                  <FontAwesomeIcon onClick={handleClick} icon={faAngleUp} />
                </div>
              </div>

              {toggle ? (
                <ul className="list-group">
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setFilterType('All');
                    }}
                  >
                    All
                    <input
                      type="radio"
                      value={filterType}
                      name="filterType"
                      checked={filterType == 'All'}
                    />
                  </div>
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setFilterType('isRegistered');
                    }}
                  >
                    <input
                      type="radio"
                      value={filterType}
                      name="tripType"
                      checked={filterType == 'isRegistered'}
                    />
                    Registered
                  </div>
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setFilterType('isBookmarked');
                    }}
                  >
                    <input
                      type="radio"
                      value={filterType}
                      name="tripType"
                      checked={filterType == 'isBookmarked'}
                    />
                    Bookmarked
                  </div>
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setFilterType('areSeatsAvailable');
                    }}
                  >
                    <input
                      type="radio"
                      value={filterType}
                      name="tripType"
                      checked={filterType == 'areSeatsAvailable'}
                    />
                    Seats Avaialble
                  </div>
                </ul>
              ) : (
                <></>
              )}
            </div>
            <div className="search">
              <input
                type="text"
                className="searchTerm"
                placeholder="Event Name"
              />
              <button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-content flex">
        {filterType !== 'All'
          ? event
            .filter((singlevent) => singlevent[filterType] === true)
            .map((eachEvent, index) => {
              return (
                <EventCard
                  className="each-card-content"
                  key={eachEvent.id}
                  index={index}
                  id={eachEvent.id}
                  data={eachEvent}
                />
              );
            })
          : event.map((eachEvent, index) => {
            return (
              <EventCard
                className="each-card-content"
                key={eachEvent.id}
                index={index}
                id={eachEvent.id}
                data={eachEvent}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Header;
