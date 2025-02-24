import { signOutAction } from "@/lib/auth-actions";
import { Button } from "./ui/button";

const SignUpButton = () => {
  return (
    <div className="p-4">
      <form action={signOutAction}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default SignUpButton;
