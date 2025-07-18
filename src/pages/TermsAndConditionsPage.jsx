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
          src="https://img.freepik.com/free-photo/portrait-fashionable-interracial-young-couple-sitting-outdoor_23-2148151954.jpg?t=st=1752649556~exp=1752653156~hmac=493539afae9a53d9994d1a27fae2b13aaa96f65bdbcc1a545550d9b8e79285a9&w=2000"
          alt=""
          srcset=""
          className="inset-0 absolute w-full h-full object-cover object-top -z-1"
        />
        <div className="bg-black/30 inset-0 w-full h-full absolute"></div>
        <div className="flex flex-col w-140 gap-2 z-1 px-4 md:px-0">
          <h1 className="text-2xl md:text-3xl text-center">
            Terms and Conditions
          </h1>
          <p className="text-center text-sm ">
            These Terms and Conditions govern your use of our website and
            services. Please read them carefully before proceeding.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-5  md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0  md:gap-6 ">
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
              <AccordionItem
                key={String(index)}
                title={section.title}
                className={
                  index === 0 ? "border-t-1 border-divider md:border-none" : ""
                }
              >
                <div className="text-sm text-gray-600 leading-relaxed">
                  {section.content}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="text-xs text-default-800 underline underline-offset-4 text-center mt-4 md:mt-10">
          Last updated: July 15, 2025
        </p>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
