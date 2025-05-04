// "use client";
// import React, { useState, useEffect } from "react";
// import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
// import { quicksand, robotosand } from "@/font";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { Checkbox, notification } from "antd";
// import IconDivider from "../../../public/icon/divider.svg";
// import IconGoogle from "../../../public/icon/icongg.svg";
// import Image from "next/image";
// import Link from "next/link";
// import { apiService } from "@/services/api.service";
// import { ENDPOINT } from "@/enums/endpoint.enum";
// import { loadGapiInsideDOM, loadAuth2 } from "gapi-script";

// interface LoginResponse {
//   jwt: string;
//   user: any;
// }

// const paths = [
//   { label: "Trang chủ", link: "/" },
//   { label: "Tài khoản", link: "#" },
// ];
// import { Input, Button, Space } from "antd";
// const Page = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [remember, setRemember] = useState(true);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [gapi, setGapi] = useState<any>(null);

//   const login = async (identifier: string, password: string) => {
//     try {
//       const response: LoginResponse = await apiService.post(ENDPOINT.LOGIN, {
//         identifier,
//         password,
//       });
//       return response;
//     } catch (error) {
//       throw new Error("Đăng nhập thất bại, vui lòng thử lại");
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await login(email, password); // Gọi API đăng nhập
//       if (response.jwt) {
//         // Lưu thông tin đăng nhập nếu ghi nhớ đăng nhập được chọn
//         if (remember) {
//           localStorage.setItem("jwt", response.jwt);
//           localStorage.setItem("userId", response.user.id);
//         } else {
//           sessionStorage.setItem("jwt", response.jwt);
//           sessionStorage.setItem("userId", response.user.id);
//         }

//         // Hiển thị thông báo thành công và chuyển hướng đến trang khác
//         notification.success({
//           message: "Đăng nhập thành công",
//           description: "Chào mừng bạn trở lại!",
//         });

//         window.location.href = "/";
//       }
//     } catch (error: any) {
//       notification.error({
//         message: "Đăng nhập thất bại",
//         description: error.message || "Vui lòng thử lại",
//       });
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadGapi = async () => {
//       const newGapi = await loadGapiInsideDOM();
//       setGapi(newGapi);
//     };
//     loadGapi();
//   }, []);

//   const attachSignin = (element: HTMLElement | null, auth2: any) => {
//     if (element) {
//       auth2.attachClickHandler(
//         element,
//         {},
//         (googleUser: any) => {
//           const idToken = googleUser.getAuthResponse().id_token;
//           sendTokenToStrapi(idToken);
//         },
//         (error: any) => {
//           console.log(JSON.stringify(error));
//         }
//       );
//     }
//   };
//   useEffect(() => {
//     if (!gapi) return;

//     const setAuth2 = async () => {
//       const auth2 = await loadAuth2(
//         gapi,
//         process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
//         ""
//       );
//       if (!auth2.isSignedIn.get()) {
//         attachSignin(document.getElementById("customBtn"), auth2);
//       }
//     };
//     setAuth2();
//   }, [gapi, attachSignin]);

//   const sendTokenToStrapi = (idToken: string) => {
//     // Gửi idToken đến Strapi backend để xác thực
//     fetch(
//       `${process.env.NEXT_PUBLIC_URL_BE}/strapi-google-auth-with-token/auth`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: idToken, // Lấy token từ Google Sign-In
//         }),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("User data:", data);

//         // Lưu JWT vào localStorage
//         if (data.jwt) {
//           localStorage.setItem("jwt", data.jwt);
//           localStorage.setItem("userId", data.user.id);
//           console.log("JWT saved in localStorage");
//         }

//         // Chuyển hướng trang
//         window.location.href = "/";
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   const handleLoginClick = () => {
//     const auth2 = gapi.auth2.getAuthInstance();
//     auth2.signIn().then((googleUser: any) => {
//       const idToken = googleUser.getAuthResponse().id_token;

//       sendTokenToStrapi(idToken);
//     });
//   };

//   return (
//     <div className={`${quicksand.className}  container py-8`}>
//       <BreadcrumbBlack paths={paths} />
//       <div className="flex justify-center">
//         <div className="w-full md:w-[40%]">
//           {" "}
//           <div className="flex flex-col gap-4 pt-8 md:pt-0">
//             <h2 className={`text-[20px] font-bold text-[#000000] text-center`}>
//               ĐĂNG NHẬP
//             </h2>
//             <div>
//               <p className="text-[14px] font-medium pb-2">Email</p>
//               <Input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Nhập email của bạn"
//                 className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
//               />
//             </div>
//             <div>
//               <p className="text-[14px] font-medium pb-2">Mật khẩu</p>
//               <Input.Password
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Nhập mật khẩu của bạn"
//                 iconRender={(visible) =>
//                   visible ? (
//                     <EyeTwoTone className="text-black" />
//                   ) : (
//                     <EyeInvisibleOutlined className="text-black" />
//                   )
//                 }
//                 className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
//               />
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   checked={remember}
//                   onChange={(e) => setRemember(e.target.checked)}
//                   className="custom-checkbox"
//                 />
//                 <label
//                   className={`text-[14px] text-[#344054] font-medium select-none ${quicksand.className}`}
//                 >
//                   Ghi nhớ đăng nhập
//                 </label>
//               </div>
//               <div>
//                 <Link
//                   href="/quen-mat-khau"
//                   className={`${quicksand.className} text-[14px] font-medium`}
//                 >
//                   Quên mật khẩu?
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full py-4 text-[#ffffff] text-[16px] font-medium bg-[#383838] rounded-[8px]"
//               >
//                 Đăng nhập
//               </button>
//             </div>
//             <div>
//               <Image src={IconDivider} className="w-full" alt="icon" />
//             </div>
//             <div>
//               <button
//                 // onClick={handleLoginClick}
//                 className="w-full py-4 border border-solid border-[#D0D5DD] text-[#ffffff] text-[16px] font-medium  rounded-[8px] flex items-center justify-center gap-2"
//               >
//                 <div className="">
//                   <Image
//                     src={IconGoogle}
//                     width={24}
//                     height={24}
//                     alt="login with google"
//                   />
//                 </div>
//                 <span className="text-[16px] text-[#1D242D] font-medium">
//                   Đăng nhập với Google
//                 </span>
//               </button>
//             </div>

//             <div className="flex justify-center items-center gap-2">
//               <span className="text-[#141414] font-normal text-[16px]">
//                 Nếu bạn chưa có tài khoản ?
//               </span>
//               <Link
//                 href="/dang-ki"
//                 className="text-[16px] font-bold text-[#000000]"
//               >
//                 Đăng ký
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbBlack from "@/components/share/BreadcrumbBlack";
import { quicksand, robotosand } from "@/font";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox, notification } from "antd";
import IconDivider from "../../../public/icon/divider.svg";
import Image from "next/image";
import Link from "next/link";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";

// Dynamic import GoogleLogin component
import dynamic from "next/dynamic";
const GoogleLogin = dynamic(() => import("@/components/home/GoogleLogin"), {
  ssr: false,
});

interface LoginResponse {
  jwt: string;
  user: any;
}

const paths = [
  { label: "Trang chủ", link: "/" },
  { label: "Tài khoản", link: "#" },
];
import { Input, Button, Space } from "antd";

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [remember, setRemember] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (identifier: string, password: string) => {
    try {
      const response: LoginResponse = await apiService.post(ENDPOINT.LOGIN, {
        identifier,
        password,
      });
      return response;
    } catch (error) {
      throw new Error("Đăng nhập thất bại, vui lòng thử lại");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password); // Gọi API đăng nhập
      if (response.jwt) {
        // Lưu thông tin đăng nhập nếu ghi nhớ đăng nhập được chọn
        if (remember) {
          localStorage.setItem("jwt", response.jwt);
          localStorage.setItem("userId", response.user.id);
        } else {
          sessionStorage.setItem("jwt", response.jwt);
          sessionStorage.setItem("userId", response.user.id);
        }

        // Hiển thị thông báo thành công và chuyển hướng đến trang khác
        notification.success({
          message: "Đăng nhập thành công",
          description: "Chào mừng bạn trở lại!",
        });

        window.location.href = "/";
      }
    } catch (error: any) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error.message || "Vui lòng thử lại",
      });
      setLoading(false);
    }
  };

  return (
    <div className={`${quicksand.className} container py-8`}>
      <BreadcrumbBlack paths={paths} />
      <div className="flex justify-center">
        <div className="w-full md:w-[40%]">
          <div className="flex flex-col gap-4 pt-8 md:pt-0">
            <h2 className={`text-[20px] font-bold text-[#000000] text-center`}>
              ĐĂNG NHẬP
            </h2>
            <div>
              <p className="text-[14px] font-medium pb-2">Email</p>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium pb-2">Mật khẩu</p>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone className="text-black" />
                  ) : (
                    <EyeInvisibleOutlined className="text-black" />
                  )
                }
                className="h-[44px] bg-[#f5f5f5] px-4 rounded-lg border border-gray-300 focus:border-black focus:shadow-none placeholder:text-[#667085] transition-all duration-200"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="custom-checkbox"
                />
                <label
                  className={`text-[14px] text-[#344054] font-medium select-none ${quicksand.className}`}
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div>
                <Link
                  href="/quen-mat-khau"
                  className={`${quicksand.className} text-[14px] font-medium`}
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 text-[#ffffff] text-[16px] font-medium bg-[#383838] rounded-[8px]"
              >
                Đăng nhập
              </button>
            </div>
            <div>
              <Image src={IconDivider} className="w-full" alt="icon" />
            </div>
            {/* Use GoogleLogin component */}
            <GoogleLogin />

            <div className="flex justify-center items-center gap-2">
              <span className="text-[#141414] font-normal text-[16px]">
                Nếu bạn chưa có tài khoản ?
              </span>
              <Link
                href="/dang-ki"
                className="text-[16px] font-bold text-[#000000]"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
