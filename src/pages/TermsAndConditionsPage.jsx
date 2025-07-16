import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";

const TermsAndConditionsPage = () => {
  const tncItem = [
    {
      title: "1. Use of the Website",
      content:
        "You must be at least 13 years old to use this website. You agree not to use the website for any illegal or unauthorized purpose.",
    },
    {
      title: "2. User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.",
    },
    {
      title: "3. Intellectual Property",
      content:
        "All content on this website, including text, graphics, logos, and images, is the property of this site and is protected by applicable copyright and trademark laws.",
    },
    {
      title: "4. Termination",
      content:
        "We reserve the right to terminate your access to the website at any time, without notice, for any reason whatsoever.",
    },
    {
      title: "5. Changes to Terms",
      content:
        "We may update these terms from time to time. Continued use of the website after any changes shall constitute your consent to such changes.",
    },
    {
      title: "6. Contact Us",
      content: (
        <>
          If you have any questions about these Terms and Conditions, you can
          contact us at: <br />
          <a
            href="mailto:support@example.com"
            className="underline text-blue-600"
          >
            support@example.com
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="h-100 relative w-full overflow-hidden flex items-center justify-center text-white">
        <img
          src="https://img.freepik.com/free-photo/young-girl-talor-fitting-dress-dummy_1220-7465.jpghttps://img.freepik.com/free-photo/interior-clothing-store-with-stylish-merchandise-racks-fashionable-brand-design-casual-wear-modern-boutique-empty-fashion-showroom-shopping-centre-with-elegant-merchandise_482257-65537.jpg"
          alt=""
          srcset=""
          className="inset-0 absolute w-full h-full object-cover object-center -z-1"
        />
        <div className="bg-black/20 inset-0 w-full h-full absolute"></div>
        <div className="flex flex-col w-200 gap-2 z-1">
          <h1 className="text-3xl text-center">Terms and Conditions</h1>
          <p className="text-center text-sm">
            These Terms and Conditions govern your use of our website and
            services. By accessing or using our platform, you agree to be bound
            by these terms. Please read them carefully before proceeding.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto  py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2  md:gap-6 ">
          <Accordion defaultSelectedKeys={"0"}>
            {tncItem.slice(0, 3).map((section, index) => (
              <AccordionItem key={String(index)} sele title={section.title}>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {section.content}
                </div>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion defaultSelectedKeys={"0"}>
            {tncItem.slice(3, 6).map((section, index) => (
              <AccordionItem key={String(index)} title={section.title}>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {section.content}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="text-xs text-default-800 underline underline-offset-4 text-center mt-10">
          Last updated: July 15, 2025
        </p>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
