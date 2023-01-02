import React from "react";
import { signOut, useSession } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import styles from "../styles/content.module.css";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div
      className={`flex space-x-2 bg-gray-700 hover:bg-gray-800 rounded-full text-white text-sm p-1 items-center`}
    >
      <img src={session?.user.image} alt='' className='h-7 w-7 rounded-full' />
      <h2 className=''>{session?.user.name}</h2>
      <button onClick={() => signOut()} className='pr-1'>
        <LockClosedIcon className={`${styles.contentIcon} `} />
      </button>
    </div>
  );
};

export default Profile;
