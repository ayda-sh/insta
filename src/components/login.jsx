import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { client } from "../../lib/axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
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
    try {
      const response = await client.post("/user/login", user);

      console.log("called", response.data.data.username);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("token", response.data.data.username);
      console.log(response);
      toast.success("User successfully logged in.", {
        type: "success",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        type: "error",
      });

      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password. Please try again.", {
          type: "error",
        });
      } else {
        toast.error("An error occurred. Please try again later.", {
          type: "error",
        });
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center mb-11 my-10 items-center gap-5">
      <img className="w-[400px]" src="public/Group 91.png" alt="" />
      <div className="w-[400px] border border-[#dbdbdb] justify-center flex flex-col px-8 pb-8">
        <div className="flex items-end justify-center">
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
            <label className="input input-bordered flex items-center gap-2 mt-3 bg-[#fafafa]">
              <input
                {...register("username")}
                type="text"
                className="grow"
                placeholder="Username"
              />
              {errors.username && (
                <span className="text-error">{errors.username.message}</span>
              )}
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-3 bg-[#fafafa]">
              <input
                {...register("password")}
                type="password"
                className="grow"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
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
