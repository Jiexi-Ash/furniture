import { mainNavItem } from "@/types";

export const navData = [
    {
      title: "Shop",
      href: "/products",
      items: [
        {
          title: "All Products",
          href: "/products",
        },
        {
          title: "Deals",
          href: "/products/deals",
        },
      ],
    },
    {
      title: "Living Room",
      href: "/products/living-room",
      items: [
        {
          title: "Coffee Tables",
          href: "/products/living-room/coffee-tables",
        },
        {
          title: "Plasma Stands",
          href: "/products/living-room/plasma-stands",
        },
        {
          title: "Lounge Sets",
          href: "/products/living-room/lounge-sets",
        },
        {
          title: "Chairs",
          href: "/products/living-room/chairs",
        },
      ],
    },
    {
      title: "Dining Room",
        href: "/products/dining-room",
      items: [
        {
          title: "Dining Tables",
          href: "/products/dining-room/dining-tables",
        },
        {
          title: "Dining Chairs",
          href: "/products/dining-room/dining-chairs",
        },
        {
          title: "Dining Sets",
          href: "/products/dining-room/dining-sets",
        },
        {
          title: "Sideboards",
          href: "/products/dining-room/sideboards",
        },
      ],
    },
    {
      title: "Bedroom",
        href: "/products/bedroom",
      items: [
        {
          title: "Bedroom Suites",
          href: "/products/bedroom/bedroom-suites",
        },
        {
          title: "Beds",
          href: "/products/bedroom/beds",
        },
        {
          title: "Chest of Drawers",
          href: "/products/bedroom/chest-of-drawers",
        },
        {
          title: "Pedestals",
          href: "/products/bedroom/pedestals",
        },
      ],
    },
    {
      title: "Office",
        href: "/products/office",
      items: [
        {
          title: "Office Chairs",
          href: "/products/office/office-chairs",
        },
        {
          title: "Office Desks",
          href: "/products/office/office-desks",
        },
        {
          title: "Bookcases",
          href: "/products/office/bookcases",
        },
        {
          title: "Filing Cabinets",
          href: "/products/office/filing-cabinets",
        },
      ],
    },
  ] satisfies mainNavItem[];


  export const termsAndConditions = [
    {
      title: "General",
    },
    {
      title: "Use of the Website",
    },
    {
      title: "Delivery",
    },
    {
      title: "Cancellations",
    },
    {
      title: "Returns",
    },
  ]