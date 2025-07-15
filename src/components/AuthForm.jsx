import React, { useState } from "react";
import { Form, Input, Checkbox, Button } from "@heroui/react";

export default function AuthForm() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (isSignUp) {
      if (password.length < 4) {
        setErrors({ password: "Password must be 4 characters or more" });
      } else if ((password.match(/[A-Z]/g) || []).length < 1) {
        setErrors({ password: "Password needs at least 1 uppercase letter" });
      } else if ((password.match(/[^a-z]/gi) || []).length < 1) {
        setErrors({ password: "Password needs at least 1 symbol" });
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

    console.log(data);
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

          <Input
            isRequired
            errorMessage={errors.password}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onValueChange={setPassword}
            onChange={() => setErrors((prev) => ({ ...prev, password: null }))}
          />
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
                onClick={() => setIsSignUp((prev) => !prev)}
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
