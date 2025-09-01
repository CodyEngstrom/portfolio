"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { contactLinks } from "@/lib/constants";
import { Mail, Github, Linkedin } from "lucide-react";

interface ContactDropdownProps {
  children: React.ReactNode; // The trigger button comes from MainNav
}

export function ContactDropdown({ children }: ContactDropdownProps) {
  return (
    <Popover>
      {/* The trigger is passed as children from MainNav */}
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      {/* Popover content */}
      <PopoverContent
        className="w-72 p-4 card-texture"
        side="bottom"
        align="start"
        sideOffset={8}
        collisionPadding={16}
        avoidCollisions={true}
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-lg font-serif font-bold text-foreground">
            Get In Touch
          </h3>
          <div className="text-2xl animate-bounce">🐱</div>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors w-full py-2 mb-4">
          <Mail className="w-4 h-4" />
          <a
            href={"mailto:" + contactLinks.email}
            className="hover:text-primary transition-colors"
          >
            {contactLinks.email}
          </a>
        </div>

        <hr className="border-border my-4" />

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Connect with me</p>
          <div className="flex gap-3">
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={contactLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}