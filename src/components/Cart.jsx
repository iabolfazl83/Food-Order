import {useContext, useEffect, useRef} from "react";
import {appContext} from "../context/AppContext.jsx";

export function Cart() {
  const dialog = useRef();
  const {open, setOpen} = useContext(appContext);

  useEffect(() => {
    console.log("FUCK YOU NIGGA")
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open])

  return (
    <dialog className="modal" ref={dialog}>
      <h2>Your Cart</h2>
      <ul>
        <li></li>
      </ul>

      <div className="modal-actions">
        <button className="text-button" onClick={() => setOpen(false)}>Close</button>
        <button className="text-button">Go to Checkout</button>
      </div>
    </dialog>
  );
}