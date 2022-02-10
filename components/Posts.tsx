import { onSnapshot, collection, query, orderBy, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

interface Post {
  id: string;
  image: string;
  caption: string;
  profileImage: string;
  username: string;
}

const Posts: FunctionComponent = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs.filter(x => (x.data() as Post).image !== undefined).map(x => x.data() as Post))
        }
      ),
    [db]
  )
  
  return (
    <div>
      {posts.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          username={post.username}
          userImage={post.profileImage}
          image={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  )
}

export default Posts
