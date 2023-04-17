export const useGetValueFromLocalStorage = (item: string) => {
  // const token =
  //   (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
  //   "";

  const value =
    (typeof window !== "undefined" && window.localStorage.getItem(item)) || "";

  return { value };
};
