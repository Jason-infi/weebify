import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className=''>
      <main className=''>
        <div>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      </main>

      <footer className=''></footer>
    </div>
  );
}
