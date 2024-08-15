"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let user;

    if (isSignUp) {
      user = await signup(formData);
    } else {
      user = await login(formData);
    }

    if (user) {
      setUser(user);
      toast.success(isSignUp ? "Signup successful" : "Login successful");
      router.push("/");
    } else {
      toast.error("Authentication failed");
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen">
      <Card className="w-[440px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
            <CardDescription>
              Please {isSignUp ? "create an account." : "enter your details."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {isSignUp && (
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              )}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {isSignUp && (
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            <Button variant="outline" type="submit">
              {isSignUp ? "Sign up" : "Log in"}
            </Button>
            <Button
              variant="link"
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
