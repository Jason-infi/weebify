import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import styles from "../styles/content.module.css";
import getImage from "../utilities/getImage";
import { playlistIdState, playlistState } from "../atoms/playlistIdstate";
import { useRecoilValue, useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
// import getColor from "../utilities/getColor";

const Content = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [image, setImage] = useState("/chika/0.jpg");
  // const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setImage(getImage());
    // setColor(getColor());
    console.log(image);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => {
        console.log(error, "content useEffect | playlist fetch error");
      });
  }, [playlistId, spotifyApi]);
  return (
    <div
      className={`${styles.contentMain}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <header className='h-15 p-2 px-4 bg-pink-500/90 flex justify-end'>
        <div className='flex space-x-2 bg-pink-900  hover:bg-gray-800 rounded-full text-white text-sm p-1 items-center'>
          <img
            src={session?.user.image}
            alt=''
            className='h-7 w-7 rounded-full'
          />
          <h2 className=''>{session?.user.name}</h2>
          <button onClick={() => signOut()} className='pr-1'>
            <LockClosedIcon className={`${styles.contentIcon} `} />
          </button>
        </div>
      </header>
      <section
        className={`${styles.contentSection} bg-gradient-to-b from-pink-500/90 to-gray-900/95 `}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=''
          className='h-45 w-60 shadow-2xl'
        />
        <div className='space-y-2'>
          <p className='text-white text-xs font-semibold'>PLAYLIST</p>
          <h1 className='text-white font-black text-2xl md:text-4xl xl:text-6xl'>
            {playlist?.name}
          </h1>
        </div>
      </section>
      <Songs />
    </div>
  );
};

export default Content;
