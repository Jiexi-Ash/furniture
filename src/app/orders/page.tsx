import SuccessfulOrder from "@/components/orders/SuccessfulOrder";
import { getOrders } from "../_actions/orders";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Orders() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col space-y-6 first-line:w-full min-h-screen  lg:max-w-[1336px] mx-auto container px-4 xl:px-0">
      <SuccessfulOrder />
      <div className="flex flex-col space-y-1 mt-10">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-xs">Review and manage your orders</p>
      </div>

      <div>
        {orders !== null && <DataTable columns={columns} data={orders} />}
      </div>
    </div>
  );
}
