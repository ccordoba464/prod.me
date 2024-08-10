"use client";

import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="text-neutral-400 flex flex-col w-full items-center justify-center">
      <Card className="w-[350px]">
        <form>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Please enter your details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" formAction={login}>
              Log in
            </Button>
            <Button formAction={signup}>Sign up</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
