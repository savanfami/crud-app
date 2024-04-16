import React, { useState } from "react";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";



const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formdata");
    
    setLoading(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !formData.name &&
      !formData.email &&
      !formData.password &&
      !formData.gender
    ) {
      setLoading(false);
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.name || formData.name.length < 3) {
      setLoading(false);
      toast.error("Please enter a valid name");
      return;
    }

    if (formData.name.includes(" ")) {
      setLoading(false);
      toast.error("Name cannot contain spaces");
      return;
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      setLoading(false);
      toast.error("Please enter a valid email");
      return;
    }

    if (!formData.password) {
      setLoading(false);
      toast.error("Please fill the password field");
      return;
    }

   

    if (formData.password.length < 6) {
      setLoading(false);
      toast.warning("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const{message}=await response.json()

      if (response.ok) {
        console.log("signup successfull");
        toast.success(message)
        navigate('/')
      }else if(response.status===409){
        setLoading(false)
        toast.error(message)
      } 
      
      else  {
        console.log("signup failed")
      }
    } catch (error) {
      console.error("error", error);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="px-5 xl:px-0">
        <div className="">
          <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
            <h3 className="text-headingColor text-center text-[22px] leading-9 font-bold mb-10">
              Create <span className="text-primaryColor">Account</span> 👨🏻‍💻
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
                />
              </div>
              <div className="flex items-center justify-between mb-5">
                <label className="text-headingColor font-bold txet-[16px] leading-7">
                  Role :
                  <select
                    value={formData.role}
                    onChange={handleChange}
                    name="role"
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-3">
                {/* {selectedFile && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={previewURL}
                    alt="preview"
                    className="w-full  h-full rounded-full p-2"
                  />
                </figure>
              )} */}
              </div>
              <div className="mt-7">
              <button
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                type="submit"
              >
                {loading ? (
                  <PulseLoader color="#ffffff" size={10} />
                ) : (
                  "Register Now"
                )}
              </button>
              </div>
              <p className="text-textColor mt-5 text-center">
                Already have an account?{" "}
                <Link to="/" className="text-primaryColor font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
