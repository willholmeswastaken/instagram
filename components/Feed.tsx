import React from 'react'
import Stories from './Stories'

const Feed = () => {
  return (
    <main className="grid max-w-3xl grid-cols-1 md:mx-auto md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      <section className="col-span-2">
        <Stories />
        {/* Posts */}
      </section>

      <section>
        {/* Mini Profile */}
        {/* Suggestions */}
      </section>
    </main>
  )
}

export default Feed
