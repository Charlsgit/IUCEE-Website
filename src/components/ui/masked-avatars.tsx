"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Avatar {
  avatar: string;
  name: string;
}

interface MaskedAvatarsProps {
  avatars: Avatar[];
  className?: string;
}

export const MaskedAvatars = ({ avatars, className }: MaskedAvatarsProps) => {
  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {avatars.map((item, index) => (
        <div
          key={item.name + index}
          className="relative h-10 w-10 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden hover:z-10 transition-transform duration-300 hover:scale-110"
        >
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};
