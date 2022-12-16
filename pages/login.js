import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

const Login = ({ providers }) => {
  const provider = providers.spotify;
  return (
    <>
      <div className='loginMain grid place-items-center h-full'>
        <div key={provider.name} className='bg-purple-400'>
          <Image src='/login/login-icon.jpg' width={20} height={20}></Image>
          <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Login with {provider.name}
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
