import React from "react";
import MainLogo from "../Logo/MainLogo";
import { Divider } from "@heroui/react";

const MainFooter = () => {
  const footerSections = [
    {
      title: "Services",
      links: ["Branding", "Design", "Marketing", "Advertisement"],
    },
    {
      title: "Company",
      links: ["About us", "Contact", "Jobs", "Press kit"],
    },
    {
      title: "Legal",
      links: ["Terms of use", "Privacy policy", "Cookie policy"],
    },
  ];
  return (
    <>
      {/* <Divider /> */}
      <footer className=" bg-default-50 text-gray-800 ">
        <div className=" px-4 max-w-7xl m-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <MainLogo />
            <p className="text-sm mt-2 font-light leading-relaxed">
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h6 className="text-lg font-light mb-2">{section.title}</h6>
              <ul className="space-y-1 text-sm">
                {section.links.map((link) => (
                  <li key={link} className="font-light">
                    <a href="#" className=" transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Divider />
        <div className="flex justify-center py-3">
          <p className="text-xs font-light">
            Copyright © {new Date().getFullYear()} - All right reserved by LUXVO
            Industries Ltd
          </p>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
