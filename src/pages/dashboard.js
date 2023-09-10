import React, { useContext, useState, useEffect} from 'react';
import Header from '../components/header';
import PostCard from '../components/postCard';

import {AuthContext} from '../context/authcontext'
import { collection, onSnapshot, orderBy, query ,limit} from 'firebase/firestore';
import { firestore } from '../lib/firebase';

function Dashboard() {
  const {user} = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [suggestedUser, setSuggestedUser] = useState([])
  const [userProfile, setUserProfile] = useState(null)
  const [limitnum, setLimitnum] = useState(9)

  useEffect(() => {
    const getData = async() =>{
      const q = query(
        collection(firestore,'posts'),
        orderBy('createdAt','desc')
      );
      onSnapshot(q, (snapshot) =>{
        const posts = snapshot.docs?.map((doc)=>({
          ...doc.data(),
          id:doc.id,
        }))
        setPosts(posts)
        console.log(posts)
      })
    }
  
     getData()
  }, [limitnum])
  

  return (
    <>
    <Header />
    <div className='flex md-mt-14 max-w-4xl gap-2 mx-auto mb-8 '>
      <div className='w-full md:w-[70%]'>
        <div>
          {posts?.map((post) => (
            <PostCard post= {post} key = {post?.id} />
          ))}
        </div>
        {
          posts?.length === 0 && (
            <div className='flex items-center justify-center h-screen'>
              <div className='text-center'>No Posts Yet</div>
              </div>

          )
        }
      </div>
    </div>

    </>
  );
}
export default Dashboard;
