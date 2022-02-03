import React, { FunctionComponent } from 'react'
import Post from './Post'

const posts = [
  {
    id: '123',
    username: 'willl.holmes',
    userImage:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--XWtgdZei--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/539842/cd0a3b2a-7787-4dc9-8842-3a4781a8369b.jpg',
    img: 'https://res.cloudinary.com/practicaldev/image/fetch/s--XWtgdZei--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/539842/cd0a3b2a-7787-4dc9-8842-3a4781a8369b.jpg',
    caption: 'This is awesome!',
  },
  {
    id: '213',
    username: 'willl.holmes',
    userImage:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--XWtgdZei--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/539842/cd0a3b2a-7787-4dc9-8842-3a4781a8369b.jpg',
    img: 'https://res.cloudinary.com/practicaldev/image/fetch/s--XWtgdZei--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/539842/cd0a3b2a-7787-4dc9-8842-3a4781a8369b.jpg',
    caption: 'This is awesome!',
  },
]

const Posts: FunctionComponent = () => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          username={post.username}
          userImage={post.userImage}
          image={post.img}
          caption={post.caption}
        />
      ))}
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
      {/* Post */}
    </div>
  )
}

export default Posts
