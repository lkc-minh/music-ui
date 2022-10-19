import { useRef } from "react";
import { createPortal } from "react-dom";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import "./Modal.scss";

function Modal({ children, open, setOpen }) {
    const ref = useRef();
    useOnClickOutside(ref, () => setOpen(false));

    return createPortal(
        <div className={open ? "Modal show-modal" : "Modal "}>
            <div className="Modal__content" ref={ref}>
                {children}
            </div>
        </div>,
        document.getElementById("root-modal"),
    );
}

export default Modal;
