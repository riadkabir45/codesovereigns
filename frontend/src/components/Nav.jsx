import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem as OriginalNavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { NavLink as OriginalNavLink } from "react-router";
import styled from "styled-components";


const NavigationMenuItem = styled(OriginalNavigationMenuItem)`
    display: flex;
`;

const NavLink = styled(OriginalNavLink)`
    display: flex;
`;

function Nav() {
    return (
        <div className="h-fit">
            <div className="flex xxs:text-2xl xs:text-4xl sm:text-5xl text-slate-700 items-center justify-between px-10 py-5">
                <i className="nf nf-fa-laptop"></i>
                    <NavigationMenu className="hidden md:block">
                        <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavLink to="/" ><NavigationMenuTrigger>Home</NavigationMenuTrigger></NavLink>
                            <NavigationMenuContent>
                            <NavigationMenuLink>
                                <div className="w-50 h-30 m-10 whitespace-nowrap text-xl text-center">
                                    <span>Yipeeeee!</span>
                                </div>
                            </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <a href="/docs" className={navigationMenuTriggerStyle()}>
                                Documentation
                            </a>
                        </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                <div className="items-center flex gap-x-6">
                    <i className="nf nf-fa-search"></i>
                    <i className="nf nf-md-account_circle"></i>
                    <i className="nf nf-fa-bag_shopping relative">
                        <Badge className={"absolute left-1/2 -top-1/4 text-xs"}>0</Badge>
                    </i>
                    <i className="nf nf-md-signal -rotate-90 md:hidden"></i>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Nav;