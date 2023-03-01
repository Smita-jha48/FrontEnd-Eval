import React from 'react';
import { useParams } from 'react-router-dom';

function Error() {
  const { errorCode } = useParams();
  return (
    <div className="errorContainer">
      <p>Something went wrong</p>
      {errorCode && <p>{`Error code: ${errorCode}`}</p>}
    </div>
  );
}
export default Error;
