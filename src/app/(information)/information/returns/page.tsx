import MainLayout from "@/components/layout/MainLayout";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReturnsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col py-12 w-full lg:max-w-[1336px] mx-auto container px-6 xl:px-0 min-h-[80vh]">
        <h1 className="text-2xl font-bold tracking-wide">Returns</h1>

        <div className="w-full flex space-x-4 mt-6">
          <Tabs
            className="w-full flex flex-col lg:flex-row  lg:space-x-8"
            defaultValue="Non-defective"
          >
            <TabsList className="grid w-full lg:w-[400px] grid-cols-1 gap-2">
              <TabsTrigger
                className="flex items-start justify-start text-xs lg:text-lg"
                value="Non-defective"
              >
                Non-defective returns
              </TabsTrigger>
            </TabsList>
            <div className="mt-[60px] lg:mt-0 w-full">
              <TabsContent className="flex-1" value="Non-defective">
                <div className="flex flex-col">
                  <h2 className="font-bold text-base lg:text-xl">
                    Returning products that are not defective
                  </h2>
                  <p className=" text-xs lg:text-sm  leading-6 lg:leading-8 tracking-wide font-light mt-8">
                    If for any reason you wish to return your product/s, you
                    (the customer) may do so within 7 days of the products being
                    collected by you or delivered to you, provided the product/s
                    have not been used, are complete, in their original
                    condition, and sealed in the original packaging. To log a
                    return online, please email us at
                    info@willowinteriordesigns.co.za and attach pictures of the
                    items you wish to return/exchange and give a reason for the
                    return/exchange. Once submitted, we will review the request
                    within 48hours & will contact you to make any necessary
                    arrangements Should you require assistance, please contact
                    us at <span className="font-bold">+27814182535</span>
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
