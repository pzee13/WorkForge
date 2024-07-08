import React, { useState } from "react";
import Navbar from "../../../component/provider/navbar/Navbar";
import Footer from "../../../component/user/footer/Footer";
import "../../user/profile/Profile.css"
import landImage from "../../../assets/images/LandingUser/fotor-ai-2024051614220.jpg";
import { MdModeEdit } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineMail} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProviderProfileMutation } from "../../../slices/providerApiSlice";
import { RootState } from "../../../app/store";
import { MyError ,UpdateUser } from "../../../utils/validations/commonVaild"
import { validationForUserUpdate } from "../../..//utils/validations/yupValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { setProviderCredentials } from "../../../slices/authSlice";



import Spinner from '../../../component/user/loader/Spinner'


function Profile() {

  const {providerInfo} =useSelector((state:RootState)=> state.auth);




  const [updateProvider] = useUpdateProviderProfileMutation();
  const dispatch = useDispatch()
 


  const initialValues: UpdateUser= {
    name:providerInfo?.name,
    mobile: providerInfo?.mobile,
  }


  const {values,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues:initialValues,
    validationSchema:validationForUserUpdate,
    onSubmit: async (values) => {
      try{
        const _id = providerInfo?._id;
        const {name,mobile} =  values;
        const res= await updateProvider({_id,name,mobile}).unwrap();
        dispatch(setProviderCredentials({...res.user}));
        toast.success(res.message)
      } catch (err){
        toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      }
    }
  })




 
  




  return (
    <div className="bg-secondary">
      <Navbar />
      <div className="relative ">
        <img
          src='../../../assets/images/copernico-TSYQ5stQVjg-unsplash.jpg'
          alt=""
          className="pt-20 h-56 w-full bg-dark-greens "
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-8">
          <h1 className="text-3xl font-extrabold text-white mt-5">
            <span className="bg-secondary  px-5 py-2 rounded-lg">MY</span>
          </h1>
          <h1 className="text-3xl font-extrabold  text-white mt-3">
            PROFILE
          </h1>
        </div>
      </div>






      <div className="h-full max-[400px]:p-2 w-full flex items-center flex-col justify-center">
        <div className="w-full p-4 md:px-12  md:py-4 lg:py-16 flex max-md:flex-col sm:w-[80%] items-start shadow-xl text-white rounded-3xl">
       
         
            <div className="flex-grow bg-pale-green w-full sm:w-[80%] p-4 ">
          <form action="" onSubmit={handleSubmit}>
          
          
            <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <div className=" shadow-xl p-3 flex rounded-lg ">
                <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                  <IoPersonSharp size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-dark-green">Name</p>
                  <input
                    name="name"
                    value={values.name}
                    placeholder={providerInfo?.name}
                    type="text"
                    onChange={handleChange}
                    className="mt-1 w-full  bg-secondary text-dark-green  outline-none"
                  />
                  {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )}
                </div>
              </div>
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                  <MdOutlineMail size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-dark-green">Email Address</p>
                  <p className="mt-1 w-full text-dark-green bg-secondary  outline-none">
                    {providerInfo?.email}
                  </p>
                </div>
              </div>
              <div className=" shadow-xl p-3 flex rounded-lg">
                <div className=" flex justify-center items-center w-12 h-12 rounded-lg">
                  <FaMobileAlt size={26} color="#3BE48B" />
                </div>
                <div className="ml-5">
                  <p className="font-medium text-dark-green">Mobile</p>
                  <input
                    name="mobile"
                    value={values.mobile}
                    placeholder={providerInfo?.mobile}
                    onChange={handleChange}
                    type="text"
                    className="mt-1 w-full text-dark-green bg-secondary  focus:border-black outline-none"
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="text-red-500">{errors.mobile}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full">
            <div className="flex justify-end w-1/2">
                <button className="bg-tertiary rounded-md mt-4 bg-dark-greens  shadow-md w-28 h-10 font-medium">Save</button>
            </div>
           </div>
          
          </form> 
          </div> 
        </div>
      </div>






   

      <Footer />
    </div>
  );
}

export default Profile;
