import React from 'react';
import { Link } from 'react-router-dom';

function Gojo() {
  return (
    <div>
      <Link to={'/home'}>home</Link> <br /> <br />
      <Link to={'/about'}>About</Link><br /> <br />
      <Link to={'/watch/thor'}>Watch thor</Link><br /> <br />
      <Link to={'/watch/solo'}>Watch solo</Link><br /> <br />
    </div>
  )
}

export default Gojo