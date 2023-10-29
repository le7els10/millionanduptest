import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from ".."
import { StoreInterface } from "../redux/interfaces/StoreInterface"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreInterface> = useSelector