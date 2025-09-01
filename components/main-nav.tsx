"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ContactDropdown } from "@/components/contact-dropdown";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function MainNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    // { href: "/photography", label: "Photos" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo / Home link */}
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors"
          >
            Cody Engstrom
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2 items-center">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        onMouseEnter={() => setHovered(item.href)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative inline-flex h-10 w-max items-center justify-center 
                                   px-4 py-2 text-sm font-medium text-foreground 
                                   border border-transparent transition-colors hover:bg-transparent"
                      >
                        {item.label}
                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] w-full bg-primary
                            transform origin-left transition-transform duration-300
                            ${
                              pathname === item.href || hovered === item.href
                                ? "scale-x-100"
                                : "scale-x-0"
                            }`}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Contact Dropdown (desktop) */}
                <NavigationMenuItem>
                  <ContactDropdown>
                    <button
                      onMouseEnter={() => setHovered("contact")}
                      onMouseLeave={() => setHovered(null)}
                      className="relative inline-flex h-10 w-max items-center justify-center 
                                 px-4 py-2 text-sm font-medium text-foreground cursor-pointer
                                 border border-transparent transition-colors hover:bg-transparent"
                    >
                      Contact
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] w-full bg-primary
                          transform origin-left transition-transform duration-300
                          ${
                            pathname === "/contact" || hovered === "contact"
                              ? "scale-x-100"
                              : "scale-x-0"
                          }`}
                      />
                    </button>
                  </ContactDropdown>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <VisuallyHidden>
                  <DialogTitle>Mobile Navigation</DialogTitle>
                </VisuallyHidden>

                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center justify-between mb-4 p-4">
                    <span className="text-lg font-semibold">Navigation</span>
                  </div>

                  {/* Mobile nav items */}
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Contact Dropdown (mobile) */}
                  <ContactDropdown>
                    <button
                      className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                        pathname === "/contact"
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      Contact
                    </button>
                  </ContactDropdown>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}