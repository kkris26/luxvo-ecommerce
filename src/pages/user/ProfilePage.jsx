import {
  addToast,
  Avatar,
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Form } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import db from "../../db/db";
import { doc, setDoc } from "firebase/firestore";
const user = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+99 7865 677 53",
  //   dob: "1990-01-01",
  gender: "male",
  address: "123 Main Street, Luxville",
  avatar: "https://i.pravatar.cc/150?u=john",
};

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
  const { userLogin } = useContext(AuthContext);
  const profileUser = userLogin.profile;
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
    setNewDataUser(profileUser);
  }, [profileUser]);

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
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };
  console.log({ newDataUser });

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
                src={newDataUser?.imgUrl}
                className="cursor-pointer w-20 h-auto aspect-square"
              />
              <div className="flex flex-col gap-3">
                <h4>Profile Picture</h4>
                <Button size="sm" variant="flat">
                  Change
                </Button>
              </div>
            </div>
          </div>
          <Button
            isDisabled={!newDataUser}
            isLoading={isLoading}
            className="w-fit"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ProfilePage;
