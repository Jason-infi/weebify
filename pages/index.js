import { getSession, useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Player from "../components/Player";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className='h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Content />
      </main>
      <Player />
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
