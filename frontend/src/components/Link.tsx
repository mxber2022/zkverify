import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

interface LinkProps {
  href: string;
  icon: typeof LucideIcon;
  label: string;
}

export function Link({ href, icon: Icon, label }: LinkProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300"
    >
      <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
      <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600">
        {label}
      </span>
    </a>
  );
}
