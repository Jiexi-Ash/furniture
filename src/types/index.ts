type NavItem = {
    title: string;
    href: string;
}

export type mainNavItem = NavItem & {
    items?: NavItem[];
}