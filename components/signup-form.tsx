import OAuthButtons from "./oauth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signUpEmail } from "@/server/auth-actions";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-base">
            Continue with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUpEmail}>
            <FieldGroup>
              <Field>
                <OAuthButtons />
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  required
                  id="name"
                  name="name"
                  placeholder="Your name"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  required
                  id="email"
                  name="email"
                  placeholder="you@email.com"
                  type="email"
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      required
                      id="password"
                      name="password"
                      placeholder="Your password"
                      type="password"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      required
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="Confirm password"
                      type="password"
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button className="font-semibold" type="submit">
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a className="font-semibold" href="/login">
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-sm">
        By clicking continue, you agree to our{" "}
        <a className="font-medium" href="/terms">
          Terms of Service
        </a>{" "}
        and{" "}
        <a className="font-medium" href="/privacy">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
