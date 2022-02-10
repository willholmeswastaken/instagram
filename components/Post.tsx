import React, { FunctionComponent } from 'react'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'

interface PostProps {
  id: string
  username: string
  userImage: string
  image: string
  caption: string
}

const Post: FunctionComponent<PostProps> = ({
  id,
  username,
  userImage,
  image,
  caption,
}) => {
  const { data: session } = useSession()
  return (
    <div className="my-7 rounded-sm border bg-white">
      <div className="flex items-center p-5">
        <img
          src={userImage}
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
          alt="User profile image"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      <img src={image} className="w-full object-cover" alt="Uploaded photo" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      
      <p className="truncate p-5">
        {/* TODO: add the show more on captions */}
        <span className="mr-1 font-bold">{username} </span>
        {caption}
      </p>
      {/* comments */}

      {session && (
        <form className="flex items-center p-4" action="">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none focus:ring-0"
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      )}
    </div>
  )
}

export default Post
