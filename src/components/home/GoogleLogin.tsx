// GoogleLogin.tsx
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { loadGapiInsideDOM, loadAuth2 } from "gapi-script";

const GoogleLogin = () => {
  const [gapi, setGapi] = useState<any>(null);

  useEffect(() => {
    const loadGapi = async () => {
      const newGapi = await loadGapiInsideDOM();
      setGapi(newGapi);
    };
    loadGapi();
  }, []);

  const attachSignin = (element: HTMLElement | null, auth2: any) => {
    if (element) {
      auth2.attachClickHandler(
        element,
        {},
        (googleUser: any) => {
          const idToken = googleUser.getAuthResponse().id_token;
          sendTokenToStrapi(idToken);
        },
        (error: any) => {
          console.log(JSON.stringify(error));
        }
      );
    }
  };

  const sendTokenToStrapi = (idToken: string) => {
    fetch(
      `${process.env.NEXT_PUBLIC_URL_BE}/strapi-google-auth-with-token/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: idToken,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User data:", data);

        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          localStorage.setItem("userId", data.user.id);
          console.log("JWT saved in localStorage");
        }

        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
        notification.error({
          message: "Đăng nhập thất bại",
          description: error.message || "Vui lòng thử lại",
        });
      });
  };

  const handleLoginClick = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;

      sendTokenToStrapi(idToken);
    });
  };

  useEffect(() => {
    if (!gapi) return;

    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        ""
      );
      if (!auth2.isSignedIn.get()) {
        attachSignin(document.getElementById("customBtn"), auth2);
      }
    };

    setAuth2();
  }, [gapi]);

  return (
    <button
      id="customBtn"
      onClick={handleLoginClick} // Gắn hàm handleLoginClick vào sự kiện click
      className="w-full py-4 border border-solid border-[#D0D5DD] text-[#ffffff] text-[16px] font-medium rounded-[8px] flex items-center justify-center gap-2"
    >
      <div>
        <img
          src="/icon/icongg.svg"
          width={24}
          height={24}
          alt="login with google"
        />
      </div>
      <span className="text-[16px] text-[#1D242D] font-medium">
        Đăng nhập với Google
      </span>
    </button>
  );
};

export default GoogleLogin;
