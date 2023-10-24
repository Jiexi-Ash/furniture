"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type item = {
  name: string;
};
type Order = {
  orderId: number;
  status: string;
  customer: string;
  orderDate: Date;
  items: item[];
  total: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      switch (status) {
        case "PAYMENT_RECEIVED":
          return <p className="text-green-500">Payment Received</p>;
        case "PENDING":
          return <p className="text-yellow-500">Pending</p>;
        case "PROCESSING":
          return <p className="text-yellow-500">Processing</p>;
        case "SHIPPED":
          return <p className="text-blue-500">Shipped</p>;
        case "DELIVERED":
          return <p className="text-green-500">Delivered</p>;
        case "CANCELLED":
          return <p className="text-red-500">Cancelled</p>;
        default:
          return <p className="text-yellow-500">Pending</p>;
      }
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const getDate = row.getValue("orderDate") as Date;
      // format date to month day, year
      const formateDate = new Date(getDate);
      const date = formateDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue("items") as item[];
      return (
        <div className="">
          {items.map((item) => {
            return (
              <div className="flex flex-col space-y-1" key={item.name}>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const price = row.getValue("total") as number;
      return <p>R{price.toFixed(2)}</p>;
    },
  },
];
