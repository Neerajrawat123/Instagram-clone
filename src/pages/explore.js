import React ,{useState,useEffect} from 'react'
import Header from '../components/header'
import Loader from '../components/loader'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { firestore } from '../lib/firebase'
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import {motion} from 'framer-motion'
import ProfilePostCard from '../components/profilePostCard'

function Explore() {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [limitNum,setLimitNum] = useState(5)

  useEffect(() => {
    setIsLoading(true)
    const getPosts =async() =>{
      const q = query(
        collection(firestore,'posts'),
        orderBy('createdAt', 'desc'),
        limit(limitNum)
      )
      onSnapshot(q,(snapshot)=>{
      const posts = snapshot.docs?.map((doc)=>({
        ...doc.data(),
        id:doc.id
      }))
      setPosts(posts)
      setIsLoading(false)
    })
    }
  
    return getPosts()
  }, [limitNum])
  
  return (
    <div>
      <Header />
      <div className="mt-14 lg:max-w-4xl lg:mx-auto">
        <div className='block sm:hidden p-2'>
          <div className="p-2 items-center w-full border-[1px] rounded">
            <form action="">
            <div className="flex gap-2 text-xs text-gray-primary">
            <SearchIcon size={15} />

              <input type="text" className='bg-transparent h-full outline-none' placeholder='search'/>
            </div>
            </form>
          </div>
        </div>
        {
          isLoading && (
            <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
          )
        }
        {posts?.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">No posts yet</div>
          </div>
        )}
         <motion.div
          layout
          className="grid grid-cols-3 md:gap-5 gap-0.5 md:p-2 p-0.5"
        >
          {posts.map((post, index) => (
            <ProfilePostCard
              key={post?.id}
              //   span={(index + 1) % 2 === 0 && (index + 1) % 3 !== 0}
              span={[2, 10, 20, 28, 38].includes(index + 1)}
              post={post}
            />
          ))}
        </motion.div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setLimitNum(limitNum + 9)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>

      </div>

    </div>
  )
}

export default Explore