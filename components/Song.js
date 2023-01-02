import React from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackState, isPlayingState } from "../atoms/songsAtom";
import { currentTrackInfoState } from "../atoms/trackAtom";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackInfo, setCurrentTrackInfoState] = useRecoilState(
    currentTrackInfoState
  );

  const playSong = () => {
    setCurrentTrack(track?.track?.id || track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track?.track?.uri || track.uri],
    });
    setCurrentTrackInfoState(track?.track);
  };
  return (
    <div
      className=' text-gray-300 flex justify-between hover:bg-gray-800 rounded-md items-center py-1 pr-4 cursor-pointer'
      onClick={playSong}
    >
      <div className='flex space-x-4 px-8 items-center'>
        <p className=''>{order + 1}</p>
        <img
          src={track?.track?.album.images[0].url || track?.album.images[0].url}
          alt=''
          className='h-10 w-10'
        />
        <div>
          <p className='text-white w-36 lg:w-64 truncate'>
            {track?.track?.name || track.name}
          </p>
          <p className='text-sm'>
            {track?.track?.artists[0].name || track?.artists[0].name}
          </p>
        </div>
      </div>
      <div className=''>
        <p className=' truncate hidden xl:inline text-sm max-w-36 px-6'>
          {track?.track?.album.name || track?.album.name}
        </p>
      </div>
      <div className=''>
        <p>
          {new Date(track?.track?.duration_ms || track?.duration_ms)
            .toISOString()
            .slice(15, 19)}
        </p>
      </div>
    </div>
  );
};

export default Song;
