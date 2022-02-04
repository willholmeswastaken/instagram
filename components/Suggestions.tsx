import faker from '@faker-js/faker'
import React, { FunctionComponent, useEffect, useState } from 'react'

interface Suggestion {
  id: number
  name: string
  username: string
  avatar: string
  email: string
  dob: Date
  phone: string
  company: {
      name: string;
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  website: string
}

const Suggestions: FunctionComponent = () => {
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([])
  useEffect(() => {
    const fetchedSuggestions: Array<Suggestion> = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))
    setSuggestions(fetchedSuggestions)
  }, [])

  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See all</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="mt-3 flex items-center justify-between"
        >
          <img
            className="h-10 w-10 rounded-full border p-[2px]"
            src={profile.avatar}
            alt="Profile picture for suggestions"
          />
          <div className='flex-1 ml-4'>
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3 className='text-xs text-gray-400'>Works at {profile.company.name}</h3>
          </div>

          <button className='text-blue-400 text-xs font-bold'>Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
