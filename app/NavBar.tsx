'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import classnames from 'classnames';
import { Box, Card, Flex, Grid, Theme } from "@radix-ui/themes";

const NavBar = () => {
   const currentPath = usePathname();
   // console.log(currentPath);

   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues List", href: "/issues/list" },
   ]
	return (
      // Layout: RadixUI & Tailwind version
      // <Box className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Box height='9' className='gd-testX' >
         <Flex gap='4' align='center' className="px-5 h-14 border-b gd-testX">

            {/* Logo */}
            <Link href="/"><SiPivotaltracker className="w-8 h-8" /></Link>

            {/* Menu List */}
            <ul className="flex space-x-4 font-medium uppercase">
               { links.map(link =>
                  <Link key={link.href}
                  className={ classnames({
                     'text-red-500' : link.href === currentPath,
                     'text-zinc-500' : link.href !== currentPath,
                     'hover:text-zinc-900 transition-color' : true
                  })}
                  href={link.href}> {link.label} </Link> )}
                  {/* <Link key={id} className="styles" href={link} */}
            </ul>
         </Flex>
		</Box>

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
