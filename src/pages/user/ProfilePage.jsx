import {
  addToast,
  Avatar,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Form } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import db from "../../db/db";
import { doc, setDoc } from "firebase/firestore";
import FileUpload from "../../components/FileUpload/FileUpload";

const profileFields = [
  { name: "fullName", label: "Full Name", valueKey: "fullName" },
  { name: "email", label: "Email", valueKey: "email" },
  { name: "phone", label: "Phone Number", valueKey: "phone" },
  { name: "dob", label: "Date of Birth", valueKey: "dob" },
  { name: "gender", label: "Gender", valueKey: "gender" },
  { name: "postalCode", label: "Postal Code", valueKey: "postalCode" },
  { name: "address", label: "Address", valueKey: "address" },
];

const genders = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

const ProfilePage = () => {
  const {
    userLogin,
    userProfile,
    userProfileImg,
    userFullName,
    handleGetProfileUser,
  } = useContext(AuthContext);
  const [editableField, setEditableField] = useState(null);
  const [newDataUser, setNewDataUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const handleInputChange = (fieldName, newValue) => {
    setNewDataUser((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  useEffect(() => {
    setNewDataUser({ ...userProfile, fullName: userFullName });
  }, [userProfile, userFullName]);

  const handleEdit = () => {
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  const userId = userLogin.uid;

  const updateUserProfile = async () => {
    setIsLoading(true);
    try {
      const profileRef = doc(db, "users", userId, "profile", "main");
      await setDoc(profileRef, newDataUser, { merge: true });
      addToast({
        title: "Success",
        description: "Update Data Successfully",
        timeout: 3000,
        size: "sm",
        color: "success",
        radius: "sm",
        shouldShowTimeoutProgress: true,
      });
      setEditableField(null);
      setIsLoading(false);
      return handleGetProfileUser(userId);
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };

  return (
    <>
      <h1 className="text-2xl">My Profile</h1>
      <div className="flex w-full my-5 sm:my-10 gap-10">
        <Form
          className="w-full flex flex-col gap-10"
          onSubmit={updateUserProfile}
        >
          <div className="grid w-full sm:grid-cols-2 md:grid-cols-3  gap-4 sm:gap-x-5 sm:gap-y-10">
            {profileFields.map((field) =>
              field.name !== "address" ? (
                field.name !== "gender" ? (
                  <Input
                    ref={editableField === field.name ? inputRef : null}
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing) {
                        return "Please fill out this field.";
                      }

                      if (validationDetails.typeMismatch) {
                        return "Please enter a valid email address";
                      }
                    }}
                    key={field.name}
                    isRequired={field.name === "fullName"}
                    label={field.label}
                    name={field.name}
                    disabled={editableField !== field.name}
                    labelPlacement="outside"
                    variant="underlined"
                    isDisabled={field.name === "email"}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    value={
                      field.name === "email"
                        ? userLogin?.email || ""
                        : newDataUser?.[field.valueKey] || ""
                    }
                    type="text"
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    endContent={
                      <MdEdit
                        className="cursor-pointer"
                        onClick={() => (
                          setEditableField(field.name), handleEdit()
                        )}
                      />
                    }
                  />
                ) : (
                  <Select
                    className=""
                    key={field.name}
                    items={genders}
                    variant="underlined"
                    label="Gender"
                    labelPlacement="outside"
                    placeholder="Select gender"
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    defaultSelectedKeys={[newDataUser?.gender]}
                    selectedKeys={[newDataUser?.gender]}
                  >
                    {(genders) => (
                      <SelectItem key={genders.key}>{genders.label}</SelectItem>
                    )}
                  </Select>
                )
              ) : (
                <Textarea
                  ref={editableField === field.name ? inputRef : null}
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "Please fill out this field.";
                    }

                    if (validationDetails.typeMismatch) {
                      return "Please enter a valid email address";
                    }
                  }}
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  disabled={editableField !== field.name}
                  labelPlacement="outside"
                  variant="underlined"
                  isDisabled={field.name === "email"}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  value={
                    field.name === "email"
                      ? userLogin.email
                      : newDataUser?.[field.valueKey] || ""
                  }
                  type="text"
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  endContent={
                    <MdEdit
                      className="cursor-pointer"
                      onClick={() => (
                        setEditableField(field.name), handleEdit()
                      )}
                    />
                  }
                />
              )
            )}
            <div className="flex  items-center gap-5">
              <Avatar
                isBordered
                size="lg"
                src={userProfileImg}
                className="cursor-pointer w-20 h-auto aspect-square"
              />
              <div className="flex flex-col gap-3">
                <h4>Profile Picture</h4>
                <FileUpload type={"profile"} userId={userId} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <Divider className="block sm:hidden bg-divider/60" />
            <Button
              isDisabled={!newDataUser}
              isLoading={isLoading}
              className="sm:w-fit w-full"
              color="primary"
              type="submit"
            >
              Save Change
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ProfilePage;
