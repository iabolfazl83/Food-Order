import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

export default function Dialog({children, visible, onClose, className = ""}) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;

    if (visible) {
      modal.showModal();
    }

    return () => modal.close()
  }, [visible]);

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.querySelector("#modal")
  );
}