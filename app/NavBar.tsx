import Link from "next/link";
import React from "react";
import { SiPivotaltracker } from "react-icons/si";

const NavBar = () => {
	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-fuchsia-50">
			{/* display: flex
          margin: 0, 1rem
          border-bottom: 1px
          margin-bottom: 5px
          padding: 0, 1.25rem
          height: 3.5rem
          align-items: center */}
			<Link href="/">
				<SiPivotaltracker className="w-8 h-8" />
			</Link>
			<ul className="flex space-x-6">
				<li>
					{" "}
					<Link className="text-zinc-500 hover:text-zinc-800 transition-color" href="/">
						Dashboard
					</Link>
				</li>
				<li>
					{" "}
					<Link href="/">Issues</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
