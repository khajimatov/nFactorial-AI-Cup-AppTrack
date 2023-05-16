import React from "react";

import Link from "next/link";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { type UserResource } from "@clerk/types";
import { toast } from "react-hot-toast";
import PersonaLogo from "~/assets/svg/persona-logo";

import { cn } from "~/lib/utils";

import { Button } from "~/components/button";
import { navigationMenuTriggerStyle } from "~/components/nav-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/nav-menu";

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-slate-500">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const Nav = ({
  user,
  isSignedIn,
}: {
  user: UserResource | null | undefined;
  isSignedIn: boolean | undefined;
}) => {
  const { signOut } = useAuth();
  if (isSignedIn && !user) {
    return null;
  }
  async function signOutHandler() {
    await signOut()
      .then(() => {
        toast.success("Signed out successfully");
      })
      .catch(() => {
        toast.error("An error occurred while signing out. Please try again or contact support.");
      });
  }
  return (
    <header className="flex items-center w-full md:w-[700px] lg:w-[900px] justify-between mx-auto">
      <section className="flex items-center gap-2">
        <PersonaLogo width={30} height={30} />
        <Link href="/" className="text-[18px] font-bold">
          Persóna
        </Link>
      </section>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>Tech stack</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem
                  key="typescript"
                  title="TypeScript"
                  href="https://www.typescriptlang.org/"
                >
                  TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
                </ListItem>
                <ListItem key="nextjs" title="Next.js" href="https://nextjs.org/">
                  The React Framework
                </ListItem>
                <ListItem key="openai" title="OpenAI" href="https://openai.com/">
                  OpenAI is an artificial intelligence research company.
                </ListItem>
                <ListItem key="prisma" title="Prisma" href="https://www.prisma.io/">
                  Prisma is an open-source database toolkit.
                </ListItem>
                <ListItem key="planetScale" title="PlanetScale" href="https://www.planetscale.com/">
                  PlanetScale is a database platform for modern applications.
                </ListItem>
                <ListItem key="trpc" title="tRPC" href="https://trpc.io/">
                  tRPC is a full-stack framework for building data-driven applications.
                </ListItem>
                <ListItem key="clerk" title="Clerk" href="https://clerk.dev/">
                  Clerk is a developer-friendly authentication and user management platform.
                </ListItem>
                <ListItem key="vercel" title="Vercel" href="https://vercel.com/">
                  Vercel is a cloud platform for static sites, hybrid apps, and Serverless
                  Functions.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Docs</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-fit h-[40px]">
        {isSignedIn ? (
          //eslint-disable-next-line @typescript-eslint/no-misused-promises
          <Button variant="outline" onClick={signOutHandler}>
            Sign out
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        )}
      </div>
    </header>
  );
};

export default Nav;
