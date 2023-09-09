import { getDoc,doc } from 'firebase/firestore'
import React, { useEffect ,useState,} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../components/header'
import Loader from '../components/loader'
import PostCard from '../components/postCard'
import NotFound from './not-found'
import {firestore} from '../lib/firebase'

function Post() {
  const {postid} = useParams()
const [post, setPost] = useState(null)
const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getData = async () =>{
      const response = await getDoc(doc(firestore, `posts/${postid}`))
      if (response) {
        setLoading(false)
        setPost({id:response.id, ...response.data()})
        console.log(post?.user?.photoURL)

        
      } else {
        setLoading(false)
        setPost(null)
        
      }
    }
  
    getData()
  }, [postid])

  

  return (
    <div>
      <Header />
      <div className="mt-14 mx-auto h-screen max-w-4xk p-1">
        {loading ? (<Loader />) :(
          <>{post ? <PostCard post = {post} />: <NotFound />} </>
        )
        }
      </div>
    </div>
  )
}

export default Post