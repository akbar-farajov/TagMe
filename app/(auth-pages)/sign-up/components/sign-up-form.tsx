import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";

type SignUpFormProps = React.ComponentPropsWithoutRef<"div"> & {
  message: Message;
};

export function SignUpForm({ className, message, ...props }: SignUpFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUpAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* <SignInWithGoogleButton /> */}
                {/* <div className="w-full text-center">Or</div> */}
                <Label htmlFor="username">username</Label>
                <Input name="username" placeholder="username" required />
                <Label htmlFor="fullName">fullName</Label>
                <Input name="fullName" placeholder="fullName" required />
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Your password"
                  required
                />
              </div>
              <SubmitButton
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
