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
import { signInEmail } from "@/server/auth-actions";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Continue with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signInEmail}>
            <FieldGroup>
              <Field>
                <OAuthButtons />
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  required
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  type="email"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    className="ml-auto text-sm underline-offset-4 hover:underline font-medium"
                    href="/forgot-password"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input required id="password" name="password" type="password" />
              </Field>
              <Field>
                <Button className="font-semibold" type="submit">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a className="font-semibold" href="/signup">
                    Sign up
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
