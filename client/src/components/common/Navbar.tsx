import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus, LogIn, LogOut, Sparkles, User } from "lucide-react";
import { useAuthUser } from "@/hooks/authHook/useAuthUser";
import { useLogout } from "@/hooks/authHook/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

function Navbar() {
  const { data: user, isLoading } = useAuthUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <header className="py-4 border-b">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-primary font-sans">
              Findora
            </h2>
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <NavLink
                to="/browze"
                className={({ isActive }) =>
                  `relative inline-block px-1 py-2 text-sm ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                Browse
              </NavLink>
            </li>
          </ul>
        </div>

        <ul className="flex space-x-4 items-center">
          {isLoading ? (
            <div className="animate-pulse text-muted-foreground text-sm">
              Loading...
            </div>
          ) : user ? (
            <>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative p-0 w-9 h-9 rounded-full"
                    >
                      <span className="flex items-center justify-center w-full h-full bg-primary text-white rounded-full font-semibold text-sm uppercase">
                        {user.username.charAt(0)}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    asChild
                    align="end"
                    className="w-40 mt-2 bg-popover"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to={`/account`}>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Account
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() => logout()}
                        disabled={isLoggingOut}
                      >
                        <LogOut className="mr-2 h-4 w-4 text-destructive" />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">
                <Button className="flex items-center cursor-pointer">
                  <LogIn className="mr-2 w-4 h-4 text-secondary" />
                  Login
                </Button>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/announcement/create">
              <Button
                variant="outline"
                className="flex items-center cursor-pointer"
              >
                <FilePlus className="mr-2 w-4 h-4 text-primary" />
                Post an announcement
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
