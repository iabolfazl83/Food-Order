import Modal from "./UI/Modal.jsx";
import {useAppContext} from "../context/AppContext.jsx";
import Button from "./UI/Button.jsx";

export default function Checkout({visible, onClose, onSubmit}) {
  const {getCartTotal} = useAppContext();

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <Modal visible={visible}>
      <div>
        <h2>Checkout</h2>
        <p>Total Amount: ${getCartTotal()}</p>
        <form onSubmit={handleFormSubmit}>
          <div className="control">
            <label>Full Name</label>
            <input required/>
          </div>
          <div className="control">
            <label>E-Mail Address</label>
            <input type="email" required/>
          </div>
          <div className="control">
            <label>Street</label>
            <input required/>
          </div>
          <div className="control-row">
            <div className="control">
              <label>Postal Code</label>
              <input type="number" required/>
            </div>
            <div className="control">
              <label>City</label>
              <input required/>
            </div>
          </div>
          <div className="modal-actions">
            <Button type="button" textOnly onClick={() => {
              onClose();
            }}>Close
            </Button>
            <Button type="submit">Submit Order</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}