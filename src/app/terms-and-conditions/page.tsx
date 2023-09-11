import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MainLayout from "@/components/layout/MainLayout";
import { termsAndConditions } from "@/config/site";

export default function TermsAndCondition() {
  return (
    <MainLayout>
      <div className="flex flex-col py-12 w-full lg:max-w-[1336px] mx-auto container px-6 xl:px-0 lg:min-h-[80vh]">
        <h1 className="text-2xl font-bold tracking-wide">
          Terms and Conditions
        </h1>
        <div className="w-full flex space-x-4 mt-6">
          <Tabs
            className="w-full flex flex-col  space-x-0 lg:flex-row lg:space-x-8"
            defaultValue="General"
          >
            <TabsList className="grid w-full lg:w-[400px] grid-cols-1 gap-2">
              {termsAndConditions.map((item, index) => (
                <TabsTrigger
                  key={item.title}
                  className="flex items-start justify-start text-xs lg:text-lg"
                  value={item.title}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-[150px] lg:mt-0 w-full">
              <TabsContent className="flex-1" value="General">
                <div className="flex flex-col">
                  <h2 className="font-bold text-base lg:text-xl">General</h2>
                  <p className="text-xs lg:text-sm  leading-6 lg:leading-8 tracking-wide font-extralight mt-8">
                    This website is owned and operated by GLAMTEE BEAUTY LOUNGE
                    (Pty) Ltd, registration number 2019/077219/07
                    <br />
                    <br />
                    By using this website, you acknowledge that you have read
                    and understood these Terms and agree to be bound by them.
                    <br />
                    <br />
                    If you have any questions regarding our website, the Terms
                    and Conditions or about products, please contact us as soon
                    as possible. These Terms and Conditions (“the Terms and
                    Conditions”) govern your (“the User”, “Customer”, “You”) use
                    of the Willow Interior Design (“Provider”, “we”, “the
                    Company”, “us”, “our”) website located at the domain name
                    www.willowinteriordesigns.co.za (“the Website”).
                    <br />
                    <br />
                    {'"Products"'} and {'“Furniture"'} shall mean all items
                    including services presently being sold by Willow Interior
                    Designs Online and In Store including but not limited to
                    furniture, household accessories, décor products. In any
                    event, these Terms and Conditions govern the supply of any
                    product ordered by you on the website.
                    <br />
                    <br />
                    By ordering a product, you agree to be legally bound by
                    these Terms and Conditions.
                  </p>
                </div>
              </TabsContent>
              <TabsContent className="flex-1" value="Use of the Website">
                <div className="flex flex-col">
                  <h2 className="font-bold text-base lg:text-xl">General</h2>
                  <p className=" text-xs lg:text-sm  leading-6 lg:leading-8 tracking-wide font-light mt-8">
                    Your use of this site indicates your acceptance of these
                    terms and your agreement to follow and be bound by them. You
                    may only use this website for lawful purposes and you
                    warrant that you will not, other than for your personal and
                    non-commercial use, store on your computer, or print copies
                    of extracts from this website.
                    <br />
                    <br />
                    Use of the information in any manner which infringes any
                    copyright or proprietary interests of Willow Interior
                    Designs is prohibited.
                    <br />
                    <br />
                    The User may not access, display, use, download, and/or
                    otherwise copy or distribute the Content obtained on the
                    website for marketing and other purposes without the consent
                    of the Provider. The unauthorised use, copying,
                    reproduction, variation, modification or distribution of the
                    content of this website, the uploading of any unlawful or
                    damaging information or viral software, or the creation of
                    any links to our website from any other site whatsoever, is
                    strictly prohibited.
                    <br />
                    <br />
                    You are prohibited from posting or transmitting, utilizing
                    reviews, comments, suggestions, ideas, questions or other
                    information through the Website, any content which is,
                    unlawful, harmful, threatening, abusive, harassing,
                    defamatory, vulgar, obscene, sexually explicit, profane or
                    hateful, or racially, ethnically or otherwise objectionable
                    content of any kind.
                    <br />
                    <br />
                    Should you place on or submit to the Website any such
                    harmful content or should you breach any clause in these
                    Terms and Conditions, Willow Interior Designs may
                    immediately terminate and/or suspend your access to all or
                    parts of the Website, without any further notice to you.
                    <br />
                    <br />
                    You are responsible for maintaining the confidentiality and
                    security of your User Name and Password for access to the
                    Website and you accept full liability for all activities
                    that occur on or related to the Website under your User
                    Name.
                    <br />
                    <br />
                    <span className="font-bold mr-2">You may not:</span>
                    impersonate another User or any third party; and Provide
                    false information to gain access to the Website.
                  </p>
                </div>
              </TabsContent>
              <TabsContent className="flex-1" value="Delivery">
                <div className="flex flex-col">
                  <h2 className="font-bold text-base lg:text-xl">Delivery</h2>
                  <p className=" text-xs lg:text-sm  leading-6 lg:leading-8 tracking-wide font-light mt-8">
                    We know how eager you are to get your products and we are
                    eager to get them to you in the quickest time and at the
                    most affordable cost. Due to the nature and size of our
                    products, a delivery cost has to be involved and we have
                    worked closely with our delivery partners to bring you the
                    most affordable delivery rates possible. Once we receive
                    your order, it is processed immediately and we will deliver
                    your products within 1-3 days in Gauteng and around 3-7 days
                    for the rest of the country.
                  </p>
                </div>
              </TabsContent>
              <TabsContent className="flex-1" value="Cancellations">
                <div className="flex flex-col">
                  <h2 className="font-bold text-base lg:text-xl">
                    Cancellations
                  </h2>
                  <p className=" text-xs lg:text-sm  leading-6 lg:leading-8 tracking-wide font-light mt-8">
                    You may in certain instances cancel your order. You can
                    cancel your order before it is dispatched for delivery call
                    us or email us to do so. If you cancel an order and the
                    goods have already left our warehouse, you will be liable
                    for the delivery fee and a cancellation fee of 10% of the
                    price of the goods. We can only process refunds once we have
                    confirmed that the goods have been returned to our
                    warehouse. If cancellation of an order is initiated by us,
                    no cancellation fees will be payable.
                  </p>
                </div>
              </TabsContent>
              <TabsContent className="flex-1" value="Returns">
                <div className="flex flex-col">
                  <h2 className="font-bold text-base lg:text-xl">Returns</h2>
                  <div className="flex flex-col">
                    <p className=" text-xs lg:text-sm  leading-6 lg:leading-8 tracking-wide font-light mt-8">
                      We would like to make your customer experience as pleasant
                      as possible. If you are experiencing problems with any
                      products and would like to return them, please read the
                      returns policy below and choose the option that best suits
                      your situation.
                    </p>
                    <p className="flex flex-col text-sm leading-8 tracking-wide font-light ">
                      <span className="font-bold my-8">
                        Returning products that are not defective
                      </span>
                      <>
                        If for any reason you wish to return your product/s, you
                        (the customer) may do so within 7 days of the products
                        being collected by you or delivered to you, provided the
                        product/s have not been used, are complete, in their
                        original condition, and sealed in the original
                        packaging. To log a return online, please email us at
                        info@willowinteriordesigns.co.za and attach pictures of
                        the items you wish to return/exchange and give a reason
                        for the return/exchange. Once submitted, we will review
                        the request within 48hours & will contact you to make
                        any necessary arrangements Should you require
                        assistance, please contact us at
                        <span className="font-bold">+27814182535</span>
                      </>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
