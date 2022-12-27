import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState, currentTrackState } from "../atoms/songsAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import styles from "../styles/player.module.css";
import { debounce } from "lodash";
import { currentTrackInfoState } from "../atoms/trackAtom";

const Player = () => {
  const { data: session } = useSession();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [currentTrackInfo, setCurrentTrackInfo] = useRecoilState(
    currentTrackInfoState
  );
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const spotifyApi = useSpotify();
  const [volume, setVolume] = useState(50);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [trackPosition, setTrackPosition] = useState(0);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrack(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
    setTrackPosition(0);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrack) {
      fetchCurrentSong();
      setTrackPosition(0);
      setVolume(50);
    }
  }, [currentTrackState, spotifyApi, session]);

  const debouncedVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((e) => {
        console.log("volume error /Player", e);
      });
    }, 500),
    []
  );
  useEffect(() => {
    debouncedVolume(volume);
  }, [volume]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
    console.log(spotifyApi.getAccessToken());
  };

  const handleRepeat = () => {
    if (repeat) {
      spotifyApi.setRepeat("off");
      setRepeat(!repeat);
    } else {
      spotifyApi.setRepeat("track");
      setRepeat(!repeat);
    }
  };

  const debouncedTrackPosition = useCallback(
    debounce((trackPosition) => {
      spotifyApi.seek(trackPosition);
    }, 500),
    []
  );
  useEffect(() => {
    debouncedTrackPosition(trackPosition);
  }, [trackPosition]);

  return (
    <div className='h-24 p-4 flex items-center justify-between text-white text-xs md:text-sm bg-gray-900'>
      <div className='flex items-center space-x-2 w-2/6 '>
        <img
          src={songInfo?.album?.images?.[0]?.url}
          alt=''
          className='h-13 w-14 hidden md:inline'
        />
        <div className='truncate'>
          <div>{songInfo?.name}</div>
          <div>{songInfo?.artists?.[0]?.name}</div>
        </div>
      </div>
      <div className='flex flex-col items-center  w-2/5 space-y-2 '>
        <div className='flex  space-x-2 justify-evenly items-center '>
          <ArrowsRightLeftIcon
            className={`text-gray-300 hover:text-white h-6 w-9 cursor-pointer ${
              shuffle ? "text-pink-500 hover:text-pink-500" : ""
            }`}
            onClick={() => {
              if (shuffle) {
                spotifyApi.setShuffle(false);
              } else {
                spotifyApi.setShuffle(true);
              }
              setShuffle(!shuffle);
            }}
          />
          <BackwardIcon
            className={`${styles.playerBtn}`}
            onClick={() => {
              spotifyApi.skipToPrevious();
            }}
          />
          {isPlaying ? (
            <PauseCircleIcon
              className={`h-10 w-10  hover:scale-105 transition-all ease-in`}
              onClick={handlePlayPause}
            />
          ) : (
            <PlayCircleIcon
              className={`h-10 w-10 hover:scale-105 transition-all ease-in`}
              onClick={handlePlayPause}
            />
          )}
          <ForwardIcon
            className={`${styles.playerBtn}`}
            onClick={() => {
              spotifyApi.skipToNext();
            }}
          />
          <ArrowPathRoundedSquareIcon
            className={`text-gray-300 hover:text-white h-6 w-9 cursor-pointer ${
              repeat ? "text-pink-500 hover:text-pink-500" : ""
            }`}
            onClick={handleRepeat}
          />
        </div>
        <input
          type='range'
          name=''
          id=''
          min={0}
          max={currentTrackInfo?.duration_ms}
          value={trackPosition}
          onChange={(e) => {
            setTrackPosition(Number(e.target.value));
          }}
          className='w-full h-2 text-sm accent-pink-500 rounded-lg cursor-pointer scroll-smooth'
        />
      </div>
      <div className='flex items-center  space-x-2 w-2/6 justify-center'>
        {volume ? (
          <SpeakerWaveIcon
            className={`${styles.playerBtn}`}
            onClick={() => {
              setVolume(0);
            }}
          />
        ) : (
          <SpeakerXMarkIcon className={`${styles.playerBtn}`} />
        )}
        <input
          type='range'
          value={volume}
          min={0}
          max={100}
          className='w-21 h-2 text-sm accent-pink-500 rounded-lg cursor-pointer scroll-smooth'
          onChange={(e) => {
            setVolume(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default Player;
