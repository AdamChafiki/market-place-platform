import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Megaphone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const menu = [
  {
    label: "Profile",
    path: "/account",
    icon: <User className="w-4 h-4 text-primary" />,
  },
  {
    label: "Messages",
    path: "/account/messages",
    icon: <Mail className="w-4 h-4 text-primary" />,
  },
  {
    label: "My Announcements",
    path: "/account/announcements",
    icon: <Megaphone className="w-4 h-4 text-primary" />,
  },
];

export default function AccountSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen border-r bg-muted p-4">
      <div className="mb-4 text-xl font-semibold text-foreground">
        My Account
      </div>
      <Separator className="mb-4" />

      <nav className="space-y-1">
        {menu.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;

          return (
            <Button
              key={path}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={clsx(
                "w-full justify-start gap-2 rounded-md",
                !isActive && "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Link to={path} className="flex items-center gap-2">
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
