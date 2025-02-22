"use client";
import { Button } from "@/components/ui/button";

import React from "react";
import { signInWithGoogle } from "../actions";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      Login with Google
    </Button>
  );
};

export default SignInWithGoogleButton;
