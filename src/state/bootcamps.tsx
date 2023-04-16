import { atom } from "jotai";

export type BootcampsType = {
  zipcode: string | number;
  milesFrom: string | number;
  rating: string;
  budget: string;
};

export type BootcampsPageType = number;

export const bootcampsAtom = atom<BootcampsType>({
  zipcode: "",
  milesFrom: "",
  rating: "",
  budget: "",
});

export const bootcampsPage = atom<BootcampsPageType>(1);
