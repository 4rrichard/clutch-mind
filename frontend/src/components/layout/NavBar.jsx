import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { UserCircle } from "lucide-react";

const menuItems = ["Item one", "Item Two", "Item Three"];

function NavBar() {
    return (
        <header className="w-full absolute top-0 left-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
            <div className="max-w-6xl mx-auto w-full px-6 py-3 flex items-center justify-between text-primary">
                <NavigationMenu className="bg-transparent shadow-none">
                    <NavigationMenuList className="flex gap-4">
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item}>
                                <NavigationMenuLink className="cursor-pointer">
                                    {item}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* RIGHT: user icon */}
                <button className="p-1 rounded-full hover:bg-white/10 transition">
                    <UserCircle />
                </button>
            </div>
        </header>
    );
}

export default NavBar;
