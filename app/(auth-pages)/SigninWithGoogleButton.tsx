"use client";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/icons/google-icon.svg";

import React from "react";
import { signInWithGoogle } from "@/lib/auth-actions";
import Image from "next/image";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      className="w-full"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <Image
        src={GoogleIcon}
        alt="image"
        width={20}
        height={20}
        className="mr-2"
      />
      Sign-in with Google
    </Button>
  );
};

export default SignInWithGoogleButton;
