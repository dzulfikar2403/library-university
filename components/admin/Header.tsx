import { Session } from 'next-auth'
import React from 'react'

const Header = ({session}:{session:Session}) => {
  return (
    <header className='admin-header'>
        <div>
            <h2 className='text-2xl font-semibold text-dark-400'>{session.user?.name}</h2>
            <p className='text-slate-500'>Monitor all of your users and all book here</p>
        </div>

        {/* <div>search</div> */}
    </header>
  )
}

export default Header