import React from "react";

import { SignInButton, useUser, SignedIn, SignedOut, useAuth, useSignIn } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

const Nav = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { signIn } = useSignIn();
  function signOutHandler() {
    void toast.promise(signOut(), {
      loading: "Signing Out...",
      success: <b>Signed Out successfully!</b>,
      error: <b>Could not sign out.</b>,
    });
  }
  return (
    <header className="flex flex-col items-center gap-x-40">
      <h1 className="text-[34px] font-bold">Personas from 🇰🇿 {signIn?.status}</h1>
      <h2 className="text-italic italic">
        Встрейчайте наших друзей 🤖
        {user?.fullName && `, ${user.fullName}.`}
      </h2>
      <SignedIn>
        <button onClick={signOutHandler}>Sign out</button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </header>
  );
};

export default Nav;
