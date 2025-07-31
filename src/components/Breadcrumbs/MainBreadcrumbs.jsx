import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import React from "react";
import { Link } from "react-router";

const MainBreadcrumbs = ({ pathname }) => {
  const pathSegments = pathname.split("/").filter(Boolean);
  return (
    <Breadcrumbs underline="hover">
      <BreadcrumbItem>
        <Link to={"/"}>Home</Link>
      </BreadcrumbItem>
      {pathSegments.map((path, i) => (
        <BreadcrumbItem className="capitalize" key={i + path}>
          {path}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default MainBreadcrumbs;
