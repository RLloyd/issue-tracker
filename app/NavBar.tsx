'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import classnames from 'classnames';

const NavBar = () => {
   const currentPath = usePathname();
   // console.log(currentPath);

   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues" },
   ]
	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-fuchsia-50">

         {/* Logo */}
         <Link href="/"><SiPivotaltracker className="w-8 h-8" /></Link>

         {/* Menu List */}
			<ul className="flex space-x-6">
            { links.map(link =>
               <Link key={link.href}
                  className={ classnames({
                     'text-red-900' : link.href === currentPath,
                     'text-zinc-500' : link.href !== currentPath,
                     'hover:text-zinc-800 transition-color' : true
                  })}
                  href={link.href}> {link.label} </Link> )}
               {/* <Link key={id} className="styles" href={link} */}
			</ul>
		</nav>
	);
};

export default NavBar;
