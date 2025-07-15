import React, { useState } from "react";
import { Form, Input, Checkbox, Button, addToast } from "@heroui/react";
import { auth } from "../configs/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function AuthForm({ close }) {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (isSignUp) {
      if (password.length < 6) {
        return setErrors({ password: "Password must be 6 characters or more" });
      } else if ((password.match(/[A-Z]/g) || []).length < 1) {
        return setErrors({
          password: "Password needs at least 1 uppercase letter",
        });
      } else if ((password.match(/[^a-z]/gi) || []).length < 1) {
        return setErrors({ password: "Password needs at least 1 symbol" });
      } else {
        setErrors({ password: null });
      }
    }

    if (data.terms !== "true" && isSignUp) {
      setErrors((prev) => ({ ...prev, terms: "Please accept the terms" }));
      return;
    } else {
      delete data.terms;
    }
    setErrors({});

    async function handleRegister() {
      try {
        const userRegister = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        console.log(userRegister);
        addToast({
          title: "Sign Up",
          description: "Sign Up Successfully",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
        setTimeout(() => {
          close();
        }, 300);
      } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
        let message;

        switch (errorCode) {
          case "auth/email-already-in-use":
            message = "Email Already Registered";
            break;

          default:
            message = "Something went wrong. Please try again.";
        }

        setErrorMessage(message);
      }
    }
    async function handleLogin() {
      try {
        const userRegister = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        addToast({
          title: "Sign In",
          description: "Sign In Successfully",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
        setTimeout(() => {
          close();
        }, 300);
        console.log(userRegister);
      } catch (error) {
        const errorCode = error.code;
        console.log(error);
        let message;

        switch (errorCode) {
          case "auth/invalid-credential":
            message = "Invalid Email or Password";
            break;

          default:
            message = "Something went wrong. Please try again.";
        }

        setErrorMessage(message);
      }
    }
    isSignUp && handleRegister();
    !isSignUp && handleLogin();
  };

  return (
    <>
      <h2 className="text-3xl">{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <Form
        className="w-full justify-center items-center space-y-4"
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 w-full">
          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your email";
              }

              if (validationDetails.typeMismatch) {
                return "Please enter a valid email address";
              }
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <div className="relative">
            <Input
              isRequired
              errorMessage={errors.password}
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type={showPass ? "text" : "password"}
              value={password}
              onValueChange={setPassword}
              onChange={() =>
                setErrors((prev) => ({ ...prev, password: null }))
              }
            />
            <div
              onClick={() => setShowPass((prev) => !prev)}
              className="z-9 cursor-pointer absolute top-1/2 transform translate-1/2  right-4"
            >
              {showPass ? <VscEyeClosed /> : <VscEye />}
            </div>
          </div>
          {isSignUp && (
            <>
              <Checkbox
                isRequired
                classNames={{
                  label: "text-small",
                }}
                className="leading-none"
                isInvalid={!!errors.terms}
                name="terms"
                radius="sm"
                size="sm"
                validationBehavior="aria"
                value="true"
                onValueChange={() =>
                  setErrors((prev) => ({ ...prev, terms: undefined }))
                }
              >
                I agree to the terms and conditions<br></br>
                {errors.terms && (
                  <span className="text-danger text-xs">*{errors.terms}</span>
                )}
              </Checkbox>
            </>
          )}
          {errorMessage && (
            <p className="text-danger text-xs">*{errorMessage}</p>
          )}

          <div className="flex gap-4">
            <Button className="w-full" color="primary" type="submit">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </div>
          <div className="flex gap-4 text-sm justify-center">
            <p>
              {!isSignUp
                ? "Don’t have an account? "
                : "Already have an account? "}
              <span
                className="cursor-pointer font-bold hover:underline"
                onClick={() => {
                  setIsSignUp((prev) => !prev),
                    setErrors({}),
                    setErrorMessage("");
                }}
              >
                {!isSignUp ? "Sign Up" : "Sign In"}
              </span>
            </p>
          </div>
        </div>
      </Form>
    </>
  );
}
