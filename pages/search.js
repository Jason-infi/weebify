import { getSession, useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Searchbar from "../components/search_page/Searchbar";
import Songs from "../components/Songs";
import { playlistState } from "../atoms/playlistIdstate";
import { useRecoilState } from "recoil";

export default function Search() {
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const { data: session, status } = useSession();
  return (
    <div className='h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <div className='flex-grow overflow-y-scroll scrollbar-hide'>
          <Searchbar />
          {console.log(playlist)}
          <Songs playlist={playlist} />
        </div>
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
