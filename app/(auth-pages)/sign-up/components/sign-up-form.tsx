import SignInWithGoogleButton from "@/app/(auth-pages)/SigninWithGoogleButton";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signUpAction } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SignUpFormProps = React.ComponentPropsWithoutRef<"div"> & {
  message: Message;
};

export function SignUpForm({ className, message, ...props }: SignUpFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="w-96">
          <form action={signUpAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <SignInWithGoogleButton />
                <div className="w-full text-center">Or</div>
                <Input name="username" placeholder="username" required />
                <Input name="fullName" placeholder="fullName" required />
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Your password"
                  required
                />
              </div>

              <Link
                href="#"
                className="text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
              <SubmitButton
                variant="outline"
                formAction={signUpAction}
                pendingText="Signing up..."
              >
                Sign up
              </SubmitButton>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link href="sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
          <FormMessage message={message} />
        </CardContent>
      </Card>
    </div>
  );
}
