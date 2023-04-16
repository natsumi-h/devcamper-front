import { atom } from "jotai";

export type UserType = string;

export const userAtom = atom<UserType>("");
