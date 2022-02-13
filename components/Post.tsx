import React, { FunctionComponent, useEffect, useState } from 'react'
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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'

interface PostProps {
  id: string
  username: string
  userImage: string
  image: string
  caption: string
}

interface Comment {
  id: string
  comment: string
  username: string
  userImage: string
  timestamp: Timestamp
}

interface Like {
  id: string
  username: string
}

const Post: FunctionComponent<PostProps> = ({
  id,
  username,
  userImage,
  image,
  caption,
}) => {
  const { data: session } = useSession()
  const [currentComment, setCurrentComment] = useState<string>('')
  const [comments, setComments] = useState<Array<Comment>>([])
  const [likes, setLikes] = useState<Array<Like>>([])
  const [hasLiked, setHasLiked] = useState<boolean>(false)
  const commentButtonDisabled = !currentComment.trim()

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) =>
          setComments(
            snapshot.docs.map(
              (x) =>
                ({
                  id: x.id,
                  ...x.data(),
                } as Comment)
            )
          )
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(
          snapshot.docs.map(
            (x) =>
              ({
                id: x.id,
                ...x.data(),
              } as Like)
          )
        )
      ),
    [db, id]
  )

  useEffect(() => {
    setHasLiked(likes.some((x) => x.id === session?.user?.email))
  }, [likes])

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.email!))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user?.email!), {
        username: session?.user?.name,
      })
    }
  }

  const sendComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const commentToSend = currentComment
    setCurrentComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }
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
            {hasLiked ? (
              <HeartIconFilled
                onClick={() => likePost()}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={() => likePost()} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className="truncate p-5">
        {/* TODO: add the show more on captions */}
        {likes.length > 0 && (
          <p className="mb-1 font-bold">
            {likes.length} like{likes.length > 1 ? 's' : ''}
          </p>
        )}
        <span className="mr-1 font-bold">{username} </span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {comments.map((x) => (
            <div key={x.id} className="mb-3 flex items-center space-x-2">
              <img
                src={x.userImage}
                alt="posted users image"
                className="h-7 rounded-full"
              />
              <p className="flex-1 text-sm">
                <span className="font-bold">{x.username} </span>
                {x.comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {x.timestamp.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4" action="">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            className="flex-1 border-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={commentButtonDisabled}
            onClick={(e) => sendComment(e)}
            className={`font-semibold  ${
              !commentButtonDisabled
                ? 'cursor-pointer text-blue-400'
                : 'text-gray-400'
            }`}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
