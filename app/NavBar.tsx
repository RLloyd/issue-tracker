'use client';

import { Skeleton } from "@/app/components";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from 'classnames';
import delay from "delay";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiPivotaltracker } from "react-icons/si";

const NavBar = () => {
	return (
      <nav className='gd-testX border-b mb-5 px-5 py-3' >
         <Container>
            <Flex justify="between" className="gd-testx">
               <Flex align="center" gap="3" className="gd-testx">
                  {/* Logo */}
                  <Link href="/">
                     <SiPivotaltracker className="w-8 h-8" />
                  </Link>
                  {/* Menu List: NavLinks Component */}
                  <NavLinks />
               </Flex>
               {/* Status Component */}
               <AuthStatus />
            </Flex>
         </Container>
		</nav>
   )
}

const NavLinks = () => {
   const currentPath = usePathname();
   // console.log(currentPath);
   /*-= MENU =-*/
   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues List", href: "/issues/list" },
      { label: "Third Menu 404", href: "/X" },
   ]

   return (
      <ul className="gd-testx flex space-x-4 font-medium uppercase">
         { links.map(link =>
            <li key={link.href}>
               <Link href={link.href}
                  // className={ classnames({
                  //    'text-red-500' : link.href === currentPath,
                  //    'text-cyan-500' : link.href !== currentPath,
                  //    'hover:text-purple-500 transition-color' : true })}
                  className={ classnames({
                     "nav-link": true,
                     "!text-red-500" : link.href === currentPath })} //!important | currentPath=selected menu
                     >{link.label}
               </Link>

               {/* href sample only <Link href="/issues/new">New Issue</Link> */}
               {/* className={ classnames({
                  'text-red-500' : link.href === currentPath,
                  'text-zinc-500' : link.href !== currentPath,
                  'hover:text-zinc-900 transition-color' : true })} */}

            </li>)}
            {/* <Link key={id} className="styles" href={link} */}
      </ul>
   )
}

const AuthStatus = () => {
   const {status, data: session } = useSession();

   // if null
   if (status === "loading")
      return <Skeleton width="6rem" height="30px"/>

   // if unauthenticated
   if (status === "unauthenticated")
      return (
         <Text>
            <Link href="/api/auth/signin" className="nav-link text-xs"> LOGIN
               <Avatar
                  src="https://unsplash.com/photos/a-christmas-wreath-on-a-window-sill-O0e934b8JBs"
                  fallback="GD"
                  size="3"
                  radius="full"
                  variant="solid"
                  className="cursor-pointer gd-avatar-border ml-4"
                  referrerPolicy="no-referrer" //if avatar don't load. bit flaky. check "next.config.js"
               />
            </Link>
         </Text>
      )

   //else
   return (
      <Box>
         {status === "authenticated" && (
            <DropdownMenu.Root>
               <DropdownMenu.Trigger>
                  <Text>
                     <Text size="1" mr="4">profile</Text>
                     <Avatar
                        src={session.user!.image!}
                        fallback="GD"
                        size="3"
                        radius="full"
                        variant="solid"
                        className="cursor-pointer gd-avatar-border"
                        referrerPolicy="no-referrer" //if avatar don't load. bit flaky. check "next.config.js"
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
                     {/* <Button className="gd-test"> */}
                        <Link href="/api/auth/signout">Log Out</Link>
                     {/* </Button> */}
                  </DropdownMenu.Item>
               </DropdownMenu.Content>

            </DropdownMenu.Root>
         )}
      </Box>
   )
}

export default NavBar;