import React from "react";
import { playlistState } from "../atoms/playlistIdstate";
import { useRecoilValue } from "recoil";
import Song from "./Song";
import { ClockIcon } from "@heroicons/react/20/solid";
const Songs = ({ playlist }) => {
  return (
    <div className='flex flex-col space-y-4 p-12 bg-gradient-to-b from-gray-900/95 to-black/95 h-auto min-h-full'>
      <div className=' text-gray-300 flex justify-between text-sm py-1 pr-4'>
        <div className='flex space-x-4 px-8 items-center'>
          <p className=''>#</p>
          {/* <p>{""}</p> */}
          <div>
            <p className='text-white w-36 lg:w-64 truncate'>TITLE</p>
          </div>
        </div>
        <div className=''>
          <p className='truncate text-clip hidden xl:inline text-sm'>ALBUM</p>
        </div>
        <div className=''>
          <ClockIcon className='h-5 w-5'></ClockIcon>
        </div>
      </div>
      <hr className='border-none bg-gray-800 h-px' />

      {playlist?.tracks.items.map((track, idx) => (
        <Song key={track?.track?.id ?? track.id} order={idx} track={track} />
      ))}
    </div>
  );
};

export default Songs;
