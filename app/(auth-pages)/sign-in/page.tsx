import { Message } from "@/components/form-message";

import { SignInnForm } from "./components/sign-in-form";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <SignInnForm message={searchParams} />
    </>
  );
}
