/** @format */

import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/header';
import PostCard from '../components/postCard';
import { Link } from 'react-router-dom';
import { ImSpinner3 as SpinnerIcon } from 'react-icons/im';


import { AuthContext } from '../context/authcontext';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getDoc,
  doc,
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [limitNum, setLimitNum] = useState(9);

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(firestore, 'posts'),
        orderBy('createdAt', 'desc'),
      );
      onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(posts);
      });
    };

    getData();
  }, [limitNum]);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getDoc(doc(firestore, `/user/${user?.uid}`));
      setUserProfile(userData?.data());
    };

    getUserData();
  }, []);

  useEffect(() => {
    const suggestUsers = async () => {
      const q = query(
        collection(firestore, 'user'),
        orderBy('lastLogin', 'desc'),
      );
      onSnapshot(q, (snapshot) => {
        const users = snapshot.docs?.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setSuggestedUsers(users.filter((i) => i.id !== user?.uid)?.slice(0, 8));
      });
    };
    suggestUsers();
  }, []);

  return (
    <>
      <Header />
      <div className='flex md:mt-14 max-w-4xl gap-2 mx-auto mb-8 '>
        <div className='w-full md:w-3/4'>
          <div>
            {posts?.map((post) => (
              <PostCard post={post} key={post?.id} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setLimitNum(limitNum + 9)}
              className="bg-blue-medium hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            >
              Load More
              <SpinnerIcon className='w-3 h-3 animate-spin my-1 mx-auto' />
            </button>
          </div>
          {posts?.length === 0 && (
            <div className='flex items-center justify-center h-screen'>
              <div className='text-center'>No Posts Yet</div>
            </div>
          )}
        </div>
        <div className='hidden md:mt-7 md:block md:w-[30%] p-3'>
          <div className='flex items-center justify-between w-full gap-2'>
            <div>
              <img
                src={userProfile?.photoURL}
                className='h-14 w-15 aspect-square object-cover rounded-full'
                alt={userProfile?.fullName}
              />
            </div>
            <div className='flex-grow'>
              <Link
                to={`profile/${userProfile?.username}`}
                className='text-sm font-semibold text-gray-800'
              >
                {userProfile?.username}
              </Link>
              <p className='text-gray-700 text-base'>{userProfile?.fullName}</p>
            </div>
            <div className='text-sm font-bold text-blue-500'>Switch</div>
          </div>
          <div>
            <div className='flex text-sm items-center my-2 justify-between'>
              <div className='text-gray-700  font-semibold'>
                Suggestions For You
              </div>
              <button className='text-slate-800 font-bold'>See All</button>
            </div>
          </div>
          <div>
            {suggestedUsers?.map((item, index) => (
              <div
                className='flex items-center  justify-between my-2'
                key={index}
              >
                <div className='flex gap-2 items-center'>
                  <Link to={`/profile/${item?.username}`}>
                    <img
                      src={item?.photoURL}
                      className='h-7 w-7 aspect-square object-cover rounded-full'
                      alt={item?.username}
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/profile/${item?.username}`}
                      className='text-sm font-semibold text-gray-800'
                    >
                      {item?.username}
                    </Link>
                    <p className='text-[10px] text-gray-500'>{item.fullName}</p>
                  </div>
                </div>
                <Link
                  to={`/profile/${item?.username}`}
                  className='text-xs font-bold text-blue-500'
                >
                  Follow
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
