import { NavLink as OriginalNavLink } from "react-router";
import styled from "styled-components";
import categoryData from "./categoryData";
import { toTitleCase, GenericName } from "./genericFunctions";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem as OriginalNavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Cart from "./Cart";
import { useSelector } from "react-redux";

const NavigationMenuItem = styled(OriginalNavigationMenuItem)`
  display: flex;
`;

const NavLink = styled(OriginalNavLink)`
  display: flex;
`;

function Nav() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="h-fit">
      <div className="flex xxs:text-2xl xs:text-4xl sm:text-5xl text-slate-700 items-center justify-between px-10 py-5">
        <i className="nf nf-fa-laptop"></i>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavLink to="/" className="text-base font-medium">
              Home
            </NavLink>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Category</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-50 h-30 m-10 whitespace-nowrap text-xl text-center flex flex-col gap-5">
                  {Object.entries(categoryData).map(([category, icon]) => (
                    <NavLink key={icon} to={`/category/${category}`}>
                      <span className="block text-left">
                        {toTitleCase(GenericName(category))}
                      </span>
                    </NavLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <i className="nf nf-md-account_circle"></i>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {!user?.id ? (
                  <div className="w-50 h-30 m-10 whitespace-nowrap text-xl text-center flex flex-col gap-5">
                    <NavLink to="/register">
                      <span className="block text-left">Register</span>
                    </NavLink>
                    <NavLink to="/login">
                      <span className="block text-left">Login</span>
                    </NavLink>
                  </div>
                ) : (
                  <span className="m-10 whitespace-nowrap text-xl text-center flex flex-col gap-5">
                    {user?.name} ({user?.email})
                  </span>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Cart />
      </div>
      <hr />
    </div>
  );
}

export default Nav;
