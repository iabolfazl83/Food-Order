import {useRef} from "react";

export default function Modal({children, visible}) {
  const dialog = useRef();

  const close = () => {
    dialog.current.close();
  }

  return (
    <dialog className="modal" ref={dialog} open={visible}>
      {children(close)}
    </dialog>
  );
}