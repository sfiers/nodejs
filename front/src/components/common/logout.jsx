import React from 'react'

function Logout() {
    localStorage.removeItem('token');
    window.location = '/';
  return (
    null
  )
}

export default Logout