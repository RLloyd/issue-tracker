'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import classnames from 'classnames';
import { Box, Card, Container, Flex, Grid, Theme } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

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
               <Flex align="center">
                  {status === "authenticated" && ( <Link href="api/auth/signout">Log Out</Link>)}
                  {status === "unauthenticated" && ( <Link href="api/auth/signin">LogIn</Link>)}
                  {/* this will give Error: [next-auth]: `useSession` must be wrapped in a <SessionProvider /> */}
               </Flex>
            </Flex>
         </Container>
		</nav>

      // Original version
      // {/* <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-fuchsia-50"> */}
		// <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      //    {/* Logo */}
      //    <Link href="/"><SiPivotaltracker className="w-8 h-8" /></Link>
      //    {/* Menu List */}
		// 	<ul className="flex space-x-6">
      //       { links.map(link =>
      //          <Link key={link.href}
      //             className={ classnames({
      //                'text-red-900' : link.href === currentPath,
      //                'text-zinc-500' : link.href !== currentPath,
      //                'hover:text-zinc-800 transition-color' : true
      //             })}
      //             href={link.href}> {link.label} </Link> )}
      //          {/* <Link key={id} className="styles" href={link} */}
		// 	</ul>
		// </nav>
	);
};

export default NavBar;
