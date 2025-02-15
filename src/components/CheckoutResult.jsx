import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";

export default function CheckoutResult({visible, onClose}) {
  return (
    <Modal visible={visible}>
      <div>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <div className="modal-actions">
          <Button onClick={() => {
            onClose();
          }}>Okay
          </Button>
        </div>
      </div>
    </Modal>
  )
}