"use client";

import LogoIcon from "@/components/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "../../(auth)/signout/actions";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <LogoIcon />

      <Button onClick={() => signOut()}>LogOut</Button>
    </header>
  );
}
