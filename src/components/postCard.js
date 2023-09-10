import React ,{useContext}from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage} from "react-lazy-load-image-component";


import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
// icons
import { CgHeart as HeartIcon } from "react-icons/cg";
import { FaHeart as HeartFillIcon } from "react-icons/fa";
import { RiChat3Line as CommentIcon } from "react-icons/ri";
import { FiSend as SendIcon } from "react-icons/fi";
import { BsBookmark as TagIcon } from "react-icons/bs";
import { BsBookmarkFill as TagFillIcon } from "react-icons/bs";
import { IoEllipsisHorizontalSharp as PostMenuIcon } from "react-icons/io5";
import { AiOutlineSmile as SmileIcon } from "react-icons/ai";
import { GoChevronRight as NextIcon } from "react-icons/go";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { AuthContext } from '../context/authcontext';
import { firestore } from '../lib/firebase';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';


function PostCard({ post }) {
  const [liked,setLiked ] = useState(false)
  const { user } = useContext(AuthContext);
  const swiper = useSwiper();

  const likePost = async() =>{
    const postRef = doc(firestore,`posts/${post?.id}`);
    updateDoc(
      postRef,
      {
        likedBy:arrayUnion(user?.uid)
      },
      {merge:true}
    );
    setLiked(true)
  }

  const unlikePost = async() =>{
    const postRef = doc(firestore,`posts/${post?.id}`);
    updateDoc(
      postRef,
      {
        likedBy:arrayRemove(user?.uid)
      },
      {merge:true}
    );
    setLiked(false)
  }
  return (
    <div
    
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="sm:mb-6 bg-white sm:border-[1px] rounded"
  >
    <div className='flex gap-3 items-center p-2 justify-between'>
      <Link to={`/${post?.user?.username}`}>
        <img 
        src={
          post?.user?.photoURL || 
          'images/avatars/default.png'
        } />
      </Link>
      <div className='flex-grow'>
        <Link to={`/${post?.user?.username}`} 
        className='font-semiBold'>
          {post?.user?.username}
        </Link>
      </div>
      <button>
        <PostMenuIcon />
      </button>
      <Link to={`/p/${post?.id}`}>
        {
          !post?.carouselMedia && (
            <div className='relative aspect-square'>
              <LazyLoadImage 
              src={post?.singleMedia?.src || post?.carouselMedia?.src}
              alt={post?.id}
              className='h-full w-full object-cover'/>

            </div>
          )
        }
        {
          post?.carouselMedia && (
            <div className="relative">
              <swiper 
              navigation
              Pagination={{clickable:true}}
              scrollbar= {{draggable:true}}
              modules = {[Pagination]}>
                 {post?.carouselMedia.map((media, index) => (
                <SwiperSlide key={index}>
                  <LazyLoadImage
                    src={media?.src}
                    placeholderSrc="https://cutewallpaper.org/24/image-placeholder-png/index-of-img.png"
                    alt={post?.id}
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))}
               <button
                onClick={() => swiper.slidePrev()}
                className="absolute top-[50%] translate-y-[-50%] right-3 p-1 aspect-square rounded-full bg-gray-200 text-slate-800 backdrop-opacity-50 z-50"
              >
                <NextIcon />
              </button>
              <button
                onClick={() => swiper.slideNext()}
                className="absolute top-[50%] translate-y-[-50%] rotate-180 left-3 p-1 aspect-square rounded-full bg-gray-200 text-slate-800 backdrop-opacity-40 z-50"
              >
                <NextIcon />
              </button>
              </swiper>
            </div>
          )
        }
      </Link>
      <div className="p-3">
        <div className="flex text-2xl md:py-3 w-full">
          <div className="flex w-full text-slate-900 gap-2">
            {
              liked ? (
                <button onClick={unlikePost}>
                  <HeartFillIcon color='#ff2828' />
                </button>
              ):(
                <button onClick={likePost}>
                  <HeartIcon size={25} />
                </button>
              )
            }
          </div>
        </div>
      </div>
      </div>  </div>
  )
}

export default PostCard
