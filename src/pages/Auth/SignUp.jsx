import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../component/Inputes/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import Inputs from './../../component/Inputes/Inputs';
import AuthLayout from './../../component/layout/AuthLayout';
import { validateEmail } from './../../utils/helper';
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        if (!fullName) {
            setError("অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।");
            return;
        }
        if (!validateEmail(email)) {
            setError("অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন।");
            return;
        }
        if (!password) {
            setError("অনুগ্রহ করে পাসওয়ার্ড লিখুন।");
            return;
        }
        setError("");
        //signup API Call

        try {
            setIsLoading(true);

            //upload profile picture if selected
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);

                profileImageUrl = imgUploadRes.imageUrl || ""; // Set to empty string if imageUrl is undefined
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { email, password, fullName, profileImageUrl });
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("কিছু সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <AuthLayout>
            <div>
                <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-black">নতুন অ্যাকাউন্ট তৈরি করুন</h3>
                    <p className="text-xs text-slate-700 mt-[5px] mb-6">
                        নিচে আপনার তথ্য দিয়ে আজই শুরু করুন
                    </p>
                    <form onSubmit={handleSignUp}>
                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Inputs
                                    value={fullName}
                                    onChange={({ target }) => setFullName(target.value)}
                                    label="পূর্ণ নাম"
                                    placeholder="John Doe"
                                    type="text"
                                />
                                <Inputs
                                    value={email}
                                    onChange={({ target }) => setEmail(target.value)}
                                    label="ইমেইল ঠিকানা"
                                    placeholder="john@example.com"
                                    type="text"
                                />
                            <div className="col-span-2">
                                <Inputs
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                    label="পাসওয়ার্ড"
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                                    type="password"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                        <button
                            type="submit"
                            className="btn-primary cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "নিবন্ধন করুন"}
                        </button>
                        <p className="text-[13px] text-slate-800 mt-3 ">
                            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
                            <Link to="/login" className="font-medium text-primary underline">লগইন করুন</Link>
                        </p>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}

export default SignUp;
