import React, { FunctionComponent } from 'react'
import { signOut, useSession } from 'next-auth/react'

const MiniProfile: FunctionComponent = () => {
  const { data: session } = useSession()
  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        className="h-16 w-16 rounded-full border p-[2px]"
        src={session?.user?.image || ""}
        alt="Mini profile picture"
      />
      <div className="mx-4 flex-1">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram!</h3>
      </div>
      <button
        className="text-sm font-semibold text-blue-400"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  )
}

export default MiniProfile
