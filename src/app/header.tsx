import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import SearchInput from "./search-input";
import { auth, signIn, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/search?q="
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse
        </Link>
        {session && (
          <Link
            href="/favourites"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Favourites
          </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="grid gap-6 text-lg font-medium">
            <SheetClose asChild>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/search?q="
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Browse
              </Link>
            </SheetClose>
            <SheetClose asChild>
              {session && (
                <Link
                  href="/favourites"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Favourites
                </Link>
              )}
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form
          action={async (formData) => {
            "use server";
            const search = formData.get("search");
            redirect(`/search?q=${search}`);
          }}
          className="ml-auto flex-1 sm:flex-initial"
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SearchInput />
          </div>
        </form>
        <AccountMenu />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;

const AccountMenu = async () => {
  const session = await auth();
  if (!session) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button type="submit">Login</Button>
      </form>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
