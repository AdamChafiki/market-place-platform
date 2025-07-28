import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus, LogIn, LogOut, Sparkles } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/auth";

function Navbar() {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useAuthUser();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.removeQueries();
      navigate("login", { replace: true });
    },
  });

  const baseLinkStyles =
    "relative inline-block px-1 py-2 text-sm text-muted-foreground dark:text-white";
  const underlineEffect =
    "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full";
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseLinkStyles} ${underlineEffect} ${
      isActive ? "text-primary after:w-full" : "hover:text-primary"
    }`;

  return (
    <header className="py-4 border-b">
      <nav className="flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-primary font-sans">
              Findora
            </h2>
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <NavLink to="/Browze" className={getNavLinkClass}>
                Browze
              </NavLink>
            </li>
            <li>
              <NavLink to="/boutique" className={getNavLinkClass}>
                Boutique
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side: Auth / Post */}
        <ul className="flex space-x-4 items-center">
          {isLoading ? (
            <div className="animate-pulse text-muted-foreground text-sm"></div>
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
                  disabled={isPending}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 w-4 h-4 text-destructive" />
                  Logout
                  {isPending && <span className="ml-2 animate-spin">🔄</span>}
                </Button>
              </li>
            </>
          ) : (
            // Show login button if no user
            <li>
              <NavLink to="/login">
                <Button className="cursor-pointer flex items-center">
                  <LogIn className="mr-2 w-4 h-4 text-secondary" />
                  Login
                </Button>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/article/create">
              <Button
                className="cursor-pointer flex items-center"
                variant={"outline"}
              >
                <FilePlus className="mr-2 w-4 h-4 text-primary" />
                Post an article
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
