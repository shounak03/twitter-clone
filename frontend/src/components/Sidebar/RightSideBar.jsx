import React from 'react'
import { IoIosSearch } from "react-icons/io";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton';
import {  useQuery } from '@tanstack/react-query';
import useFollow from '../Hooks/useFollow';
import LoadingSpinner from '../common/LoadingSpinner';
const RightSideBar = () => {

  // const user = {
  //   username: "Levi",
  //   fullname: "shounak",
  //   profileImg: "public/boy3.png"
  // }

  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUser"],
    queryFn: async () => {
      try {
        const res = await fetch('api/users/suggested');
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Something went wrong")
        return data
      } catch (error) {
        throw new Error(error);
      }
    }
  })

  const {follow,isPending} = useFollow();
    
  

  return (
    <div className='w-[25%]'>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none '>
        <IoIosSearch size={20} />
        <input type="text" className='outline-none bg-transparent px-2' placeholder='Search' />
      </div>
      <div className='p-4 my-4 bg-gray-100 rounded-2xl'>
        <h1 className='font-bold text-lg my-3'>Who to follow</h1>
        {isLoading && (
          <>
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
            <RightPanelSkeleton />
          </>
        )}


        {!isLoading && suggestedUsers?.data.map((user) => (
          <Link to={`/profile/${user.username}`}
            className='flex items-center justify-between my-3 hover:bg-gray-300 rounded-full px-3 py-2'>
            <div className='flex w-full'>
              <div>
                <Avatar src={user.profileImg || "./public/avatar-placeholder.png"} googleId="118096717852922241760" size="42" round={true} />
              </div>
              <div className='ml-2'>
                <h1 className='font-bold '>{user.fullname}</h1>
                <p className='text-sm'>@{user.username}</p>
              </div>
            </div>
            <div className=' mt-1 px-13 '>
              <button className='appearance-none hover:bg-white hover:text-gray-950 bg-black border-2 border-[#1A1A1A] rounded-full box-border text-white cursor-pointer inline-block font-sans font-semibold text-[16px] w-[80px] h-[30px]'
              onClick={(e) => {
                e.preventDefault()
                follow(user._id)}}>
                {isPending?<LoadingSpinner/>: "follow"}</button>
            </div>
          </Link>

        ))}


      </div>
    </div>
  )
}

export default RightSideBar