"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const menuItems = ["Daily", "Weekly"];

const HeaderContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const active = useMemo(() => {
    return pathname.split("/")[1];
  }, [pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Navbar
      onMenuOpenChange={handleMenuToggle}
      className="bg-white bg-opacity-0 backdrop-blur-md"
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">HOROSKOP</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={active === "daily"}>
          <Link color="foreground" href="/daily">
            Daily
          </Link>
        </NavbarItem>
        <NavbarItem isActive={active === "weekly"}>
          <Link href="/weekly" color="foreground">
            Weekly
          </Link>
        </NavbarItem>
      </NavbarContent>
      {/* <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={active === item.toLowerCase() ? "primary" : "foreground"}
              className="w-full"
              href={`/${item.toLowerCase()}`}
              onClick={handleMenuToggle}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default HeaderContainer;
