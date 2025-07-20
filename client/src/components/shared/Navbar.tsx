import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus, LogIn, Sparkles } from "lucide-react";

function Navbar() {
  const baseLinkStyles =
    "relative inline-block px-1 py-2 text-sm text-muted-foreground dark:text-white";
  const underlineEffect =
    "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full";
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseLinkStyles} ${underlineEffect} ${
      isActive ? "text-primary after:w-full" : "hover:text-primary"
    }`;

  return (
    <header className="py-4">
      <nav className="flex items-center justify-between">
        {/* Logo */}
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

        {/* Navigation Links */}

        {/* Action Buttons */}
        <ul className="flex space-x-4 items-center">
          <li>
            <NavLink to="/login">
              <Button className="cursor-pointer flex items-center">
                <LogIn className="mr-2 w-4 h-4 text-secondary" />
                Login
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/post/article">
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
