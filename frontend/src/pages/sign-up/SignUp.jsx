import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSignUp from "../../hooks/useSignUp";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [gender, setGender] = useState(null);

  const { signUp, loading } = useSignUp();

  const handleFormSubmit = handleSubmit(async (data) => {
    data.gender = gender;
    await signUp(data);
  });

  return (
    <div className="h-screen p-4 flex justify-center items-center text-white">
      <div className="bg-white p-10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
        <h1 className="text-3xl p-5">Login ChatApp</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="lable p-2">
              <span>Name</span>
            </label>
            <input
              type="text"
              placeholder="enter user"
              className="w-full input input-bordered h-13"
              name="name"
              {...register("name", { required: "this field is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="lable p-2">
              <span>User Name</span>
            </label>
            <input
              type="text"
              placeholder="enter user name"
              className="w-full input input-bordered h-13"
              name="userName"
              {...register("userName", { required: "this field is required" })}
            />
            {errors.userName && (
              <span className="text-red-500 text-sm">
                {errors.userName.message}
              </span>
            )}
          </div>
          <div>
            <label className="lable p-2">
              <span>Password</span>
            </label>
            <input
              type="password"
              placeholder="enter password"
              className="w-full input input-bordered h-13"
              name="password"
              {...register("password", {
                required: "this field is required",
                minLength: {
                  value: 6,
                  message: "enter minimum 6 charectors ",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <label className="lable p-2">
              <span> Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="enter confirm password"
              className="w-full input input-bordered h-13"
              name="confirmPassword"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "this field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          {/* //Gender  */}

          <div className="flex">
            <div className="form-control">
              <label className={`label gap-2 cursor-pointer`}>
                <span className="label-text">Male</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900 checkbox-error"
                  value={"male"}
                  name="gender"
                  onChange={() => setGender("male")}
                  onClick={() => setGender("male")}
                  checked={gender === "male"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className={`label gap-2 cursor-pointer `}>
                <span className="label-text">Female</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900 checkbox-accent"
                  value={"female"}
                  name="gender"
                  onChange={() => setGender("female")}
                  onClick={() => setGender("female")}
                  checked={gender === "female"}
                />
              </label>
            </div>
          </div>

          <Link
            to={"/sign-in"}
            className=" hover:text-blue-600 mt-4 inline-block"
          >
            Already have an accout ?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-green-200 text-black hover:bg-green-300"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
