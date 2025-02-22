import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignInnForm } from "./components/sign-in-form";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <SignInnForm message={searchParams} />
    </>
  );
}
