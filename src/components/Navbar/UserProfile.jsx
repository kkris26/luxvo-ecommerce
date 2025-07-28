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
import { ModalContext } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";
import LinkWrapper from "../Wrapper/LinkWrapper";

export default function UserProfile() {
  const { userLogin, userProfile, userProfileImg, userFullName } =
    useContext(AuthContext);
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
          src={userProfileImg}
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
            textValue={userFullName}
          >
            <User
              avatarProps={{
                size: "sm",
                src: userProfileImg,
              }}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              description={userLogin.email}
              name={<span className="capitalize">{userFullName}</span>}
            />
          </DropdownItem>
          <DropdownItem key="dashboard" textValue="dashboard">
            <LinkWrapper className="w-full flex " path={"/admin"}>
              Dashboard
            </LinkWrapper>
          </DropdownItem>
          <DropdownItem key="settings" textValue="settings">
            <LinkWrapper className="w-full flex" path={"/user"}>
              Settings
            </LinkWrapper>
          </DropdownItem>
          <DropdownItem key="new_project" textValue="new_project">
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
