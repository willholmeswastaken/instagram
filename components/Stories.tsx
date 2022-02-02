import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from './Story'

interface Story {
  id: number
  name: string
  username: string
  avatar: string
  email: string
  dob: Date
  phone: string
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
const Stories = () => {
  const [suggestions, setSuggestions] = useState<Array<Story>>([])
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))
    setSuggestions(suggestions)
  }, [])
  return (
    <div className="mt-8 flex space-x-2 border-gray-200 bg-white p-6 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-100">
      {suggestions.map((x) => (
        <Story key={x.id} img={x.avatar} username={x.username} />
      ))}
    </div>
  )
}

export default Stories
