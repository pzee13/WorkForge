import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import {resetPasswordValidation} from '../../../utils/validations/yupValidation'
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { useValidateAccesssTokenMutation, useResetPasswordMutation } from '../../../slices/userApiSlice';


export function ResetPassword() {
    const [userId, setUserId] = useState<string>('');
    const [resetPassword] = useResetPasswordMutation();
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params.token)
    const navigate = useNavigate();
    const [validateToken] = useValidateAccesssTokenMutation()
    console.log("hai",validateToken);

    useEffect(() => {
        const fetchTokenValidation = async () => {
            console.log("haiiiiiiiiiiiii")
            console.log("params",params.token)
            if (params.token) {
                try {
                    const response = await validateToken({ token:params.token }).unwrap();
                    console.log("response",response)  
                    if (response.success) {
                        console.log(response.success)
                        setUserId(response.user);
                    } else {
                        toast.error(response.message);
                        navigate('/login'); // Redirect to the forgot password page
                    }
                } catch (error) {
                    toast.error('Token validation failed');
                    // navigate('/login'); // Redirect to the forgot password page
                }
            }
        };

        fetchTokenValidation();
    }, [dispatch, navigate, params.token, validateToken]);

    async function handleResetPassword(userId: string, newPassword: string) {
        try {
            const response = await resetPassword({ id: userId, password: newPassword }).unwrap();
            if (response.success) {
                toast.success('Password reset successful!');
                navigate('/login');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to reset password');
        }
    }

    return (
        <div className="h-[100vh] flex items-center justify-center">
            {userId ? (
                <div className="login-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[550px] md:rounded-[50px] overflow-hidden">
                    <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                        <Formik
                            initialValues={{ newPassword: '', confirmPassword: '' }}
                            validationSchema={resetPasswordValidation}
                            onSubmit={(values, { setSubmitting }) => {
                                handleResetPassword(userId, values.newPassword);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col w-[80%] items-center md:items-start mt-12 md:mt-20">
                                    <h1 className="heading font-semibold text-3xl font-gillroy">SetSpace Reset Password</h1>
                                    <p className="text-sm py-5">Enter your new password below to regain access to your account.</p>
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="newPassword" className="text-sm font-semibold">New Password</label>
                                        <Field type="password" name="newPassword" className="w-full h-14 rounded-lg px-5 outline-none" />
                                        <ErrorMessage name="newPassword" component="div" className="error text-red-600 text-sm" />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</label>
                                        <Field type="password" name="confirmPassword" className="w-full h-14 rounded-lg px-5 outline-none" />
                                        <ErrorMessage name="confirmPassword" component="div" className="error text-red-600 text-sm" />
                                    </div>
                                    <div className="py-2 flex items-center justify-center w-full">
                                        <button type="submit" className="w-[200px] px-5 py-2 rounded-md bg-[#1b2931] text-white font-semibold" disabled={isSubmitting}>
                                            {isSubmitting ? 'Resetting...' : 'Reset'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div
                        className="image-container h-[250px] md:h-full md:flex-1 flex justify-center items-center"
                        style={{ backgroundImage: `url(${"/src/assets/images/fotor2.jpg"})`, backgroundSize: "contain" }}
                    ></div>
                </div>
            ) : (
                <div>
                    <img src="/src/assets/images/404.png" alt="" height={"500px"} width={"500px"} />
                    <p className='text-2xl font-semibold text-center text-[#BA68C8]'>Sorry! Link has expired</p>
                </div>
            )}
        </div>
    );
}
