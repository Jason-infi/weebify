import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import styles from "../styles/content.module.css";
import getImage from "../utilities/getImage";
import { playlistIdState, playlistState } from "../atoms/playlistIdstate";
import { useRecoilValue, useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import Profile from "./Profile";

const Content = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [image, setImage] = useState("/chika/0.jpg");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setImage(getImage());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playlistId, spotifyApi]);
  return (
    <div
      className={`${styles.contentMain}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div
        className={`bg-gradient-to-b to-gray-900/90 from-pink-500/90 via-pink-600/90 `}
      >
        <header className={`'h-15 p-2 px-4  flex justify-end`}>
          <Profile />
        </header>
        <section className={`${styles.contentSection}`}>
          <img
            src={
              playlist?.images?.[0]?.url ||
              "https://media.tenor.com/AubytKfTss4AAAAC/anime-heart.gif"
            }
            alt=''
            className={`h-45 w-60 shadow-2xl rounded-sm
          `}
          />
          <div className='space-y-8 text-white'>
            <div className='space-y-2'>
              <p className=' text-xs font-semibold'>PLAYLIST</p>
              <h1 className=' font-black text-2xl md:text-4xl xl:text-6xl'>
                {playlist?.name ?? "Liked Songs"}
              </h1>
            </div>
            <div className='space-y-2'>
              <p className='text-gray-400 text-sm'>{playlist?.description}</p>
              <div className='flex space-x-4 text-sm'>
                <p className=' font-semibold'>
                  {playlist?.owner?.display_name}{" "}
                </p>
                {playlist?.name && <p>{playlist?.followers?.total} likes </p>}
                <p>{playlist?.tracks?.items.length} songs</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Songs playlist={playlist} />
    </div>
  );
};

export default Content;
