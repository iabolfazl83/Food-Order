import Modal from "./UI/Modal.jsx";
import {useAppContext} from "../context/AppContext.jsx";
import Button from "./UI/Button.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  }
}

export default function Checkout({visible, onClose, onSubmit}) {
  const {getCartTotal, cartItems} = useAppContext();

  const {sendRequest, isLoading, error} = useHttp("http://localhost:3000/orders", requestConfig);

  function handleFormSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    sendRequest(JSON.stringify({
      order: {
        items: cartItems,
        customer: data,
      }
    }));

    if (data && !error) {
      onSubmit();
    }
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={() => {
        onClose();
      }}>Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  )

  if (isLoading) {
    actions = (
      <span>Sending order data...</span>
    )
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <div>
        <form onSubmit={handleFormSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormatter.format(getCartTotal())}</p>
          <Input label="Full Name" id="name"/>
          <Input label="E-Mail Address" id="email" type="email"/>
          <Input label="Street" id="street"/>
          <div className="control-row">
            <Input label="Postal Code" id="postal-code" type="number"/>
            <Input label="City" id="city"/>
          </div>
          {error && <Error title="Failed to submit order." message={error}/>}
          <div className="modal-actions">
            {actions}
          </div>
        </form>
      </div>
    </Modal>
  )
}