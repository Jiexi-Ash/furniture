import MainLayout from "@/components/layout/MainLayout";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReturnsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col py-12 w-full lg:max-w-[1336px] mx-auto container px-4 xl:px-0 min-h-[80vh]">
        <h1 className="text-2xl font-bold tracking-wide uppercase">
          Delivery for online purchases
        </h1>

        <p className="text-xs lg:text-sm leading-6 tracking-wide font-light mt-6 w-full">
          We know how eager you are to get your products and we are eager to get
          them to you in the quickest time and at the most affordable cost. Due
          to the nature and size of our products, a delivery cost has to be
          involved and we have worked closely with our delivery partners to
          bring you the most affordable delivery rates possible. Once we receive
          your order, it is processed immediately and we will deliver your
          products within 1-3 days in Gauteng and around 3-7 days for the rest
          of the country.
        </p>

        <div className="w-full flex space-x-4 mt-6">
          <Tabs
            className="w-[400px] md:w-full flex flex-col lg:flex-row space-x-8 "
            defaultValue="Dates"
          >
            <TabsList className="grid lg:w-[400px] grid-cols-2 lg:grid-cols-1 gap-2">
              <TabsTrigger
                className="flex items-start justify-start text-sm lg:text-lg"
                value="Dates"
              >
                Delivery dates
              </TabsTrigger>
              <TabsTrigger
                className="flex items-start justify-start text-sm lg:text-lg"
                value="Prices"
              >
                Delivery prices
              </TabsTrigger>
            </TabsList>
            <TabsContent className="flex-1" value="Dates">
              <div className="flex flex-col">
                <h2 className="font-bold text-base md:text-lg lg:text-xl mt-8">
                  Delivery Dates
                </h2>
                <p className="text-xs lg:text-sm leading-6 lg:leading-8 tracking-wide font-light mt-8">
                  We will contact you once your order and delivery address is
                  received. We will confirm availability and delivery cost. We
                  will endeavor to deliver goods within the advised time
                  periods, but goods are subject to availability and delay in
                  the delivery of goods is frequently in the hands of a third
                  party and sometimes outside our control.
                  <br />
                  <br />
                  Carriers cannot specify an exact hour of delivery. Any dates
                  we specify for the delivery of goods are approximations only
                  and we shall not be liable for any losses, costs, damages,
                  charges, or expenses caused by any delay in the delivery of
                  the goods. Our failure to meet approximate delivery dates will
                  not be grounds for you to cancel the sale. Some orders may be
                  delivered in more than one drop.
                  <br />
                  <br />
                  We will only deliver goods to the address on the order and
                  goods will not be left without a signature. You are required
                  to make all the necessary arrangements to take delivery of the
                  goods whenever they are tendered for delivery. If you are not
                  at home on the date that has been agreed and the delivery
                  agent cannot contact you, we reserve the right to charge you
                  for the re-delivery
                </p>
              </div>
            </TabsContent>
            <TabsContent className="flex-1" value="Prices">
              <div className="flex flex-col">
                <h2 className="font-bold text-base md:text-lg lg:text-xl mt-8">
                  Fees
                </h2>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th
                              scope="col"
                              className="border-r px-6 py-4 dark:border-neutral-500"
                            ></th>
                            <th
                              scope="col"
                              className="border-r px-6 py-4 text-xs"
                            >
                              Shipping fee for orders under R9 999
                            </th>
                            <th
                              scope="col"
                              className="border-r px-6 py-4 text-xs"
                            >
                              Shipping fee for orders over R10 000 but below R28
                              999
                            </th>
                            <th
                              scope="col"
                              className="border-r px-6 py-4 text-xs"
                            >
                              Shipping fee for orders over R28 999
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                              Shipping within Gauteng
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                              R500
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                              R300
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              FREE
                            </td>
                          </tr>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                              Shipping Outside Gauteng
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                              R700
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                              R300
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              FREE
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
