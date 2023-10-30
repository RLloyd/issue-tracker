import Link from "next/link";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";

const NavBar = () => {
   const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues" },
   ]
	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-fuchsia-50">
			<Link href="/">
				<SiPivotaltracker className="w-8 h-8" />
			</Link>
			<ul className="flex space-x-6">
            { links.map(link => <Link
               key={link.href}
               className="text-zinc-500 hover:text-zinc-800 transition-color"
               href={link.href}> {link.label} </Link> )}
			</ul>
		</nav>
	);
};

export default NavBar;
