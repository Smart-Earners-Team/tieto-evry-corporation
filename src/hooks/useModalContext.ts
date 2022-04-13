import { useContext } from "react";
import { ModalContext } from "../components/Modal/ModalContext";

const useModalContext = () => useContext(ModalContext);
export default useModalContext;
