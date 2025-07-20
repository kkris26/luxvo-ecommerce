import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import { HiMenuAlt4 } from "react-icons/hi";
import { Link } from "react-router";

const MenuDropdown = ({ tabMenus }) => {
  const dropDownMenu = [
    ...tabMenus,
    { key: "homepage", name: "Homepage", path: "/" },
  ];
  return (
    <div className="lg:hidden">
      <Dropdown>
        <DropdownTrigger>
          <HiMenuAlt4 className="text-3xl" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={dropDownMenu}>
          {(item) => (
            <DropdownItem textValue={item.key} key={item.key} className="">
              <Link className="flex w-full " to={item.path}>
                {item.name}
              </Link>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MenuDropdown;
