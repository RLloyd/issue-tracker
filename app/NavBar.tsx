'use client';

import { CaretDownIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from 'classnames';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiPivotaltracker } from "react-icons/si";

const NavBar = () => {
   const currentPath = usePathname();
   // console.log(currentPath);
   const {status, data: session } = useSession();

   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues List", href: "/issues/list" },
   ]
	return (

      <nav className='gd-testX border-b mb-5 px-5 py-3' >
         <Container>
            <Flex justify="between" className="gd-testx">
               <Flex align="center" gap="3" className="gd-testx">

                  {/* Logo */}
                  <Link href="/">
                     <SiPivotaltracker className="w-8 h-8" />
                  </Link>

                  {/* Menu List */}
                  <ul className="gd-testx flex space-x-4 font-medium uppercase">
                     { links.map(link =>
                        <li key={link.href}>
                           <Link
                              className={ classnames({
                                 'text-red-500' : link.href === currentPath,
                                 'text-zinc-500' : link.href !== currentPath,
                                 'hover:text-zinc-900 transition-color' : true
                              })}
                              href={link.href}>{link.label}
                           </Link>
                        </li>)}
                        {/* <Link key={id} className="styles" href={link} */}
                  </ul>

               </Flex>

               {/* Login & Logout button: add dynamically */}

               {/* <Flex align="center"> */}
               <Box>
                  {status === "authenticated" && (
                     <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                           {/* <Button variant="soft">
                              Options
                              <CaretDownIcon />
                           </Button> */}
                           <Text>
                              <Avatar
                                 src={session.user!.image!}
                                 fallback="GD"
                                 size="3"
                                 radius="full"
                                 variant="solid"
                                 className="cursor-pointer"
                                 />
                           </Text>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content>
                           <DropdownMenu.Label>
                              <Text size="4">
                                 {session.user!.email}
                              </Text>
                           </DropdownMenu.Label>

                           <DropdownMenu.Item>
                              <Link href="/api/auth/signout">Log Out</Link>
                           </DropdownMenu.Item>
                        </DropdownMenu.Content>

                     </DropdownMenu.Root>
                  )}
                  {status === "unauthenticated" && ( <Link href="/api/auth/signin">LogIn</Link>)}
               </Box>
            </Flex>
         </Container>
		</nav>
   )
}
export default NavBar;