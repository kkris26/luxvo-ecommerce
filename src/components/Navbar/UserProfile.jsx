import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router";
import { ModalContext } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";

export const PlusIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export default function UserProfile() {
  const { userLogin } = useContext(AuthContext);
  const { setModalOpen } = useContext(ModalContext);
  return (
    <Dropdown
      classNames={{
        base: "before:bg-default-200 rounded-lg", 
        content: "p-0 border-small border-divider bg-background",
      }}
      radius="sm"
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          size="sm"
          src={userLogin?.profile?.imgUrl}
          className="cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className="p-3"
        variant="flat"
        disabledKeys={["profile"]}
        itemClasses={{
          base: ["rounded-sm"],
        }}
      >
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem
            key="profile"
            isReadOnly
            className="h-14 gap-2 opacity-100"
            textValue={userLogin?.profile?.fullName}
          >
            <User
              avatarProps={{
                size: "sm",
                src: userLogin?.profile?.imgUrl,
              }}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              description={userLogin.email}
              name={userLogin?.profile?.fullName}
            />
          </DropdownItem>
          <DropdownItem key="dashboard" textValue="dashboard">
            <Link className="w-full flex " to={"/admin"}>
              Dashboard
            </Link>
          </DropdownItem>
          <DropdownItem key="settings" textValue="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            key="new_project"
            textValue="new_project"
            endContent={<PlusIcon className="text-large" />}
          >
            New Project
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider aria-label="Preferences">
          <DropdownItem
            key="quick_search"
            textValue="quick_search"
            shortcut="⌘K"
          >
            Quick search
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback" textValue="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem
            key={"logout"}
            onPress={() => setModalOpen(true)}
            className="text-danger "
            color="danger"
            textValue="logout"
          >
            <div className="flex justify-between items-center">
              Log Out
              <MdLogout />
            </div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
