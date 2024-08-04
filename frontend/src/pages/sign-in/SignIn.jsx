import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignIn from "../../hooks/useSignIn";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, loading } = useSignIn();

  const handleFormSubmit = handleSubmit(async (data) => {
    await signIn(data);
  });

  return (
    <>
      <div className="h-screen p-4 flex justify-center items-center text-white ">
        <div className="bg-white p-10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
          <h1 className="text-3xl p-5">Login ChatApp</h1>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label className="lable p-2">
                <span>User Name</span>
              </label>
              <input
                type="text"
                placeholder="enter user"
                name="userName"
                className="w-full input input-bordered h-13"
                {...register("userName", {
                  required: "this feild is required",
                })}
              />
              {errors.userName && (
                <span className="text-red-500">{errors.userName.message}</span>
              )}
            </div>
            <div>
              <label className="lable p-2">
                <span>Password</span>
              </label>
              <input
                type="password"
                placeholder="enter password"
                name="password"
                className="w-full input input-bordered h-13"
                {...register("password", {
                  required: "this feild is required",
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <Link
              to={"/sign-up"}
              className=" hover:text-blue-600 mt-4 inline-block"
            >
              Don't have an accout ?
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
    </>
  );
}

export default SignIn;
