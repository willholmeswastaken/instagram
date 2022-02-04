import React, { FunctionComponent } from 'react'

const MiniProfile: FunctionComponent = () => {
  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        className="h-16 w-16 rounded-full border p-[2px]"
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--XWtgdZei--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/539842/cd0a3b2a-7787-4dc9-8842-3a4781a8369b.jpg"
        alt="Mini profile picture"
      />
      <div className='flex-1 mx-4'>
        <h2 className="font-bold">willl.holmes</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram!</h3>
      </div>
      <button className='text-blue-400 text-sm font-semibold'>Sign out</button>
    </div>
  )
}

export default MiniProfile
