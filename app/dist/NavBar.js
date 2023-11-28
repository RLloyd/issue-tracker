'use client';
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var si_1 = require("react-icons/si");
var NavBar = function () {
    var currentPath = navigation_1.usePathname();
    // console.log(currentPath);
    var links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];
    return (react_1["default"].createElement("nav", { className: "flex space-x-6 border-b mb-5 px-5 h-14 items-center bg-fuchsia-50" },
        react_1["default"].createElement(link_1["default"], { href: "/" },
            react_1["default"].createElement(si_1.SiPivotaltracker, { className: "w-8 h-8" })),
        react_1["default"].createElement("ul", { className: "flex space-x-6" }, links.map(function (link) {
            return react_1["default"].createElement(link_1["default"], { key: link.href, className: (link.href === currentPath ? 'text-red-900' : 'text-zinc-500') + "  hover:text-zinc-800 transition-color", href: link.href },
                " ",
                link.label,
                " ");
        }))));
};
exports["default"] = NavBar;
