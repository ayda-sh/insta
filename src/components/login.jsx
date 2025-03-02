import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router-dom";
import { client } from "../../lib/axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const submitLoginForm = async (user) => {
    console.log(user);

    try {
      const response = await client.post("/user/login", user);
      console.log(response);
      
      // const { status } = response;
      localStorage.setItem("token", response.data.accessToken);
      toast.success("User successfully logged in.", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
      
      toast.error(error.message, {
        type: "error",
      });
    }
  };

  return (
    <div className="container mx-auto flex justify-center mb-11 my-10 items-center gap-5">
       <img className="w-[400px]" src="public/Group 91.png" alt="" />
      <div className="w-[400px] border border-[#dbdbdb] justify-center flex flex-col px-8 pb-8">
       
        <div className="flex items-end justify-center">
          <h1 className="text-black text-5xl font-semibold"></h1>
          <img
            src="public/Instagram-Wordmark-Black-Logo.wine.svg"
            className="w-[200px]"
            alt=""
          />
          <img className="w-[100]" src="src/assets/Group 2015.png" alt="" />
        </div>
        <div className="mt-4 justify-center flex">
          <form
            onSubmit={handleSubmit(submitLoginForm)}
            className="justify-center flex flex-col"
          >
            <label className="input input-bordered flex items-center gap-2  bg-[#fafafa]">
              <input
                {...register("email")}
                type="text"
                className="grow w-[100px]"
                placeholder="Phone number, username Email"
              />
              {errors?.email ? (
                <span className="text-error">{errors.email.message}</span>
              ) : null}
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-3 bg-[#fafafa]">
              <input
                {...register("password")}
                type="password"
                className="grow"
                placeholder="password"
              />
              {errors?.password ? (
                <span className="text-error">{errors.password.message}</span>
              ) : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 opacity-70 w-[100px]"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            <button
              className="bg-[#4cb5f9] rounded px-7 py-2 mt-7 text-white"
              type="submit"
            >
              LOG IN
            </button>
          </form>
        </div>
        <div className="flex justify-center mt-4">
          <p className="text-black">
            Don't have an account?
            <span className="text-[#4cb5f9]">
              <NavLink to="/signup">Sign Up</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
