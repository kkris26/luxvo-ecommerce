import React, { useContext, useState } from "react";
import { Form, Input, Checkbox, Button, addToast } from "@heroui/react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function AuthForm({ close, isSignUp, setIsSignUp }) {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { signUp, signIn } = useContext(AuthContext);

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
      } else {
        setErrors({ password: null });
      }
    }

    if (data.terms !== "true" && isSignUp) {
      setErrors((prev) => ({ ...prev, terms: "please accept the terms" }));
      return;
    } else {
      delete data.terms;
    }
    setErrors({});

    async function handleRegister() {
      try {
        setLoading(true);
        await signUp(data.fullName, data.imgURL, data.email, data.password);

        setTimeout(() => {
          close();
        }, 300);
      } catch (error) {
        setLoading(false);
        const errorCode = error.code;
        console.log(errorCode);
        let message;

        switch (errorCode) {
          case "auth/email-already-in-use":
            message = "Email already registered";
            break;

          default:
            message = "Something went wrong. Please try again.";
        }

        setErrorMessage(message);
      }
    }
    async function handleLogin() {
      try {
        setLoading(true);
        await signIn(data.email, data.password);
        setTimeout(() => {
          close();
        }, 300);
      } catch (error) {
        setLoading(false);
        const errorCode = error.code;
        console.log(error);
        let message;

        switch (errorCode) {
          case "auth/invalid-credential":
            message = "Invalid email or password";
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
          {isSignUp && (
            <>
              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Please enter your full name";
                  }

                  return errors.name;
                }}
                label="Full Name"
                labelPlacement="outside"
                name="fullName"
                placeholder="Enter your full name"
              />
              <Input
                // isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Please enter your image URL";
                  }
                  if (validationDetails.typeMismatch) {
                    return "Please enter a valid URL";
                  }

                  return errors.name;
                }}
                label="Image URL"
                labelPlacement="outside"
                name="imgURL"
                placeholder="Enter your image URL"
                type="url"
              />
            </>
          )}
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
          <Input
            isRequired
            endContent={
              <div
                className="cursor-pointer"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <VscEyeClosed /> : <VscEye />}
              </div>
            }
            errorMessage={errors.password}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={showPass ? "text" : "password"}
            value={password}
            onValueChange={setPassword}
            onChange={() => setErrors((prev) => ({ ...prev, password: null }))}
          />

          {isSignUp && (
            <div className="flex">
              <Checkbox
                isRequired
                isInvalid={!!errors.terms}
                name="terms"
                radius="full"
                size="sm"
                validationBehavior="aria"
                value="true"
                onValueChange={() =>
                  setErrors((prev) => ({ ...prev, terms: undefined }))
                }
              />
              <p
                className={`${
                  errors.terms ? "text-danger" : ""
                } leading-4 text-sm`}
              >
                I agree to the{" "}
                <Link
                  onClick={close}
                  className="underline"
                  to={"/terms-and-conditions"}
                >
                  terms and conditions
                </Link>
              </p>
            </div>
          )}
          {errorMessage && (
            <p className="text-danger text-xs">*{errorMessage}</p>
          )}

          <div className="flex gap-4">
            <Button
              isLoading={isLoading}
              className="w-full"
              color="primary"
              type="submit"
            >
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
