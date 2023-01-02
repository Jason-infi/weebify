import React from "react";
import { getProviders, signIn } from "next-auth/react";
import styles from "../styles/login.module.css";

const Login = ({ providers }) => {
  const provider = providers.spotify;
  return (
    <>
      <div className={styles.loginMain}></div>
      <div className='grid place-items-center absolute h-full w-full '>
        <div key={provider.name} className='flex flex-col gap-8 items-center'>
          <img
            src={"https://cdn.worldvectorlogo.com/logos/spotify-1.svg"}
            className={styles.loginIcon}
          ></img>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className={styles.loginBtn}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
