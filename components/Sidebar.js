import React, { useEffect, useState } from "react";
import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/20/solid";
import styles from "../styles/sidebar.module.css";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { playlistIdState, playlistState } from "../atoms/playlistIdstate";
import { useRecoilState } from "recoil";
import Link from "next/link";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const getUserLikedTracks = () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks().then((data) => {
        setPlaylist({ tracks: data.body });
      });
    }
  };

  return (
    <div className={`${styles.sidebarMain}`}>
      <div className=' space-y-4 truncate'>
        <div className='space-y-10'>
          <div>
            <img
              src={"https://cdn.worldvectorlogo.com/logos/spotify-1.svg"}
              className={`w-15 h-10`}
            ></img>
          </div>
          <div className='space-y-4'>
            <button className={`${styles.sidebarButton}`}>
              <HomeIcon className={`${styles.sidebarIcon}`} />
              <p className={`${styles.sidebarLabel}`}>Home</p>
            </button>
            <button className={`${styles.sidebarButton}`}>
              <MagnifyingGlassCircleIcon className={`${styles.sidebarIcon}`} />
              <Link className={`${styles.sidebarLabel}`} href='/search'>
                Search
              </Link>
            </button>
            <button className={`${styles.sidebarButton}`}>
              <BuildingLibraryIcon className={`${styles.sidebarIcon}`} />
              <p className={`${styles.sidebarLabel}`}>Your Library</p>
            </button>
          </div>
          <div className='space-y-4'>
            <button className={`${styles.sidebarButton}`}>
              <PlusCircleIcon className={`${styles.sidebarIcon}`} />
              <p className={`${styles.sidebarLabel}`}>Create Playlist</p>
            </button>
            <button className={`${styles.sidebarButton}`}>
              <HeartIcon className={`${styles.sidebarIcon} text-pink-500`} />
              <Link
                className={`${styles.sidebarLabel}`}
                onClick={getUserLikedTracks}
                href='/'
              >
                Liked Songs
              </Link>
            </button>
          </div>
        </div>
        <hr className='border-none bg-gray-800 h-px' />
        {playlists.map((playlist) => (
          <button
            className={`${styles.sidebarButton} truncate text-sm tracking-tight`}
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
          >
            <Link href={"/"}>{playlist.name}</Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
