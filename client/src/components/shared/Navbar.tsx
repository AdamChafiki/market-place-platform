import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus, LogIn, LogOut, Sparkles } from "lucide-react";
import { useAuthUser } from "@/hooks/authHook/useAuthUser";
import { useLogout } from "@/hooks/authHook/useLogout";

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
                to="/browse"
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
            <li>
              <NavLink
                to="/boutique"
                className={({ isActive }) =>
                  `relative inline-block px-1 py-2 text-sm ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                Boutique
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
              <li className="text-sm text-muted-foreground">
                👋 Hello,{" "}
                <span className="font-medium text-foreground">
                  {user.username}
                </span>
              </li>
              <li>
                <Button
                  variant="outline"
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 w-4 h-4 text-destructive" />
                  Logout
                  {isLoggingOut && (
                    <span className="ml-2 animate-spin">🔄</span>
                  )}
                </Button>
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
            <NavLink to="/annoucement/create">
              <Button
                variant="outline"
                className="flex items-center cursor-pointer"
              >
                <FilePlus className="mr-2 w-4 h-4 text-primary" />
                Post an annoucement
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
