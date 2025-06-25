import React from 'react'

const emailTemplate = ({username,bodyMessage}:{username:string,bodyMessage:string}) => {
  return (
    <>
    <div>hello world {username} !</div>
    <p className='py-4'>{bodyMessage}</p>
    </>
  )
}

export default emailTemplate