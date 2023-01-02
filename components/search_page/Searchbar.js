import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useCallback, useEffect, useState } from "react";
import Profile from "../Profile";
import { debounce } from "lodash";
import useSpotify from "../../hooks/useSpotify";
import { playlistState } from "../../atoms/playlistIdstate";
import { useRecoilState } from "recoil";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("chika");
  const spotifyApi = useSpotify();
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const debouncedSearchQuery = useCallback(
    debounce((searchQuery) => {
      spotifyApi.searchTracks(searchQuery).then((data) => {
        setPlaylist(data.body);
        console.log(data.body);
      });
    }, 500),
    []
  );

  useEffect(() => {
    if (searchQuery !== "") {
      debouncedSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className=' p-4 pl-8 flex justify-between items-center bg-black'>
      <div className='flex p-1 pl-2 w-3/12 items-center justify-between space-x-1 bg-white rounded-full'>
        <MagnifyingGlassIcon className='h-6 w-6' />
        <input
          type='text'
          className='w-full outline-none text-sm appearance-none'
          value={searchQuery}
          placeholder='What do you want to listen to?'
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <XMarkIcon
          className='h-8 w-8 cursor-pointer'
          onClick={() => {
            setSearchQuery("");
          }}
        />
      </div>
      <Profile />
    </div>
  );
};

export default Searchbar;
