import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NEXT_URL } from "@/config/config";
import { bootcampsAtom, bootcampsPage } from "@/state/bootcamps";

export const useLayout = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [bootcampAtom, setBootcampsAtom] = useAtom(bootcampsAtom);
  const [page, setPage] = useAtom(bootcampsPage);
  const [error, setError] = useState<string | undefined>(undefined);
  const browseBootcampClickHandler = () => {
    setBootcampsAtom({ zipcode: "", milesFrom: "", rating: "", budget: "" });
    setPage(1);
  };
  const [accountNavOpened, setAccountNavOpened] = useState(false);

  const handleClickOutsideAccountNav = (
    event: MouseEvent<Document>,
    accountNav: HTMLElement | null,
    accountNavToggle: HTMLElement | null,
    setAccountNavOpened: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const isClickInsideAccountNav =
      accountNav?.contains(event.target as Node) ||
      accountNavToggle?.contains(event.target as Node);

    if (!isClickInsideAccountNav) {
      setAccountNavOpened(false);
    }
  };

  //   useEffect(() => {
  //     function handleOutsideClick(event: any) {
  //       const accountNav = document.querySelector(".dropdown-menu");
  //       const accountNavToggle = document.querySelector(".account-nav-toggle");
  //       handleClickOutsideAccountNav(
  //         event as MouseEvent<Document>,
  //         accountNav as HTMLElement | null,
  //         accountNavToggle as HTMLElement | null,
  //         setAccountNavOpened
  //       );
  //     }
  //     document.addEventListener("click", handleOutsideClick);
  //     return () => {
  //       document.removeEventListener("click", handleOutsideClick);
  //     };
  //   }, [setAccountNavOpened]);

  const accountClickHandler = () => setAccountNavOpened(!accountNavOpened);

  const logoutHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const apiRes = await fetch(`${NEXT_URL}/api/logout`, {});
      const apiData = await apiRes.json();
      if (!apiRes.ok) {
        toast(apiData.error, {
          type: "error",
        });
        return;
      }
      toast("You have been logged out", {
        type: "success",
      });
      await signOut({
        // callbackUrl: "/bootcamps",
        redirect: false,
      });
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userId");
      router.push("/");
    } catch (error) {
      toast("Something went wrong", {
        type: "error",
      });
    }
  };

  const [hamburgerOpened, setHamburgerOpened] = useState(false);

  const onClickHamburgerHandler = () => {
    if (hamburgerOpened) {
      setHamburgerOpened(false);
    } else {
      setHamburgerOpened(true);
    }
  };
  return {
    browseBootcampClickHandler,
    accountClickHandler,
    logoutHandler,
    onClickHamburgerHandler,
    hamburgerOpened,
    handleClickOutsideAccountNav,
    session,
    error,
    accountNavOpened,
    setAccountNavOpened,
  };
};
