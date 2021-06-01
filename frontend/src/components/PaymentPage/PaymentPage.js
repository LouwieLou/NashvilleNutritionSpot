// name: PaymentPage.js
// description: Payment Form on the cart page.
// This allows the user to enter in their credit card info
// and then submit it to allow Square to charge their card
// and record the transaction.

// import React
import React, { useState } from 'react';

// for making API requests from react 
import axios from "axios"
import {Input, Form, Header, Label, Table, Message} from "semantic-ui-react"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

// for UI styling
import "./PaymentPage.css"

// UI styling buttons provided by Square
import {
  SquarePaymentForm,
  ApplePayButton,
  CreditCardCVVInput,
  CreditCardExpirationDateInput,
  CreditCardNumberInput,
  CreditCardPostalCodeInput,
  CreditCardSubmitButton,
  GooglePayButton,
  MasterpassButton,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import moment from "moment";

// for extracting data from the store to try to find the total price
import { useSelector } from "react-redux"

// square keys 
const APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID;
const LOCATION_ID = process.env.REACT_APP_LOCATION_ID;

// returns a payment form you can enter your cedit card info in
// this will confirm the payment and record the transaction.
const PaymentPage = () => {


  const now = new Date()


  const thirtyMinsFromNow = moment(now).add(30, 'm').toDate();
  const remainder = 15 - (thirtyMinsFromNow.getMinutes() % 15);
  const roundedTMFN = moment(thirtyMinsFromNow).add(remainder, "m").toDate();

  // for error messages
  const [errorMessages, setErrorMessages] = useState([]);
  const [startTime, setStartTime] = useState(roundedTMFN);

  const [orderStatus, setOrderStatus] = useState({success: null, failure: false});

  const [state, setState] = useState({"firstName": null, "lastName": null, "pickupTime": roundedTMFN,
  "streetAddress": null, "city": null, "state": null, "apt": null,
    "note": null, "email": null, "zip": null, "phone": null
  });
  // once the person enters their credit card info in, we generate a nonce. Then,
  // we generate a buyerVerification token from the nonce.
  function cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken) {
    if (state.firstName === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "name",
          message: "First Name Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "name",
          message: "First Name Missing",
          type: "VALIDATION_ERROR"
        })
      } 

    }  
    if (state.lastName === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "last-name",
          message: "Last Name Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "last-name",
          message: "Last Name Missing",
          type: "VALIDATION_ERROR"
        })
      } 
    } 
    if (state.pickupTime === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "pickup-time",
          message: "Pickup Time Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "pickup-time",
          message: "Pickup Time Missing",
          type: "VALIDATION_ERROR"
        })
      }
    } 
    if (state.streetAddress === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "streetAddress",
          message: "Street Address Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "streetAddress",
          message: "Street Address Missing",
          type: "VALIDATION_ERROR"
        })
      }
    } 
    if (state.city === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "city",
          message: "City Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "city",
          message: "City Missing",
          type: "VALIDATION_ERROR"
        })
      }
    }  
    if (state.state === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "state",
          message: "State Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "state",
          message: "State Missing",
          type: "VALIDATION_ERROR"
        })
      }
    } 
    if (state.zip === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "Zip",
          message: "Zip Code Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "Zip",
          message: "Zip Code Missing",
          type: "VALIDATION_ERROR"
        })
      }
    }
    if (state.email === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "email",
          message: "Email Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "email",
          message: "Email Missing",
          type: "VALIDATION_ERROR"
        })
      }
    }
    if (state.phone === null) {
      if (errors === null) {
        errors = []
        errors.push({
          field: "phone",
          message: "Phone Number Missing",
          type: "VALIDATION_ERROR"
        })
      } else {
        errors.push({
          field: "phone",
          message: "Phone Number Missing",
          type: "VALIDATION_ERROR"
        })
      }
    }
    
    
    if (errors) {
      setErrorMessages(errors.map(error => error.message));
      return;
    }

    // clear error messages if none.
    setErrorMessages([]);

    // send the payment information to the backend server and allow Square to record the 
    // transaction

    axios.post(`${process.env.REACT_APP_API_URL}/create-pay`, {nonce: nonce, 
      buyerVerificationToken: buyerVerificationToken,
      firstName: state.firstName,
      lastName: state.lastName,
      pickupTime: state.pickupTime,
      expireTime: moment(state.pickupTime).add(1, "h").toDate(),
      streetAddress: state.streetAddress,
      apt: state.apt,
      note: state.note,
      city: state.city,
      state: state.state,
      email: state.email, 
      zip: state.zip,
      phone: state.phone,
      amount: totalPrice, 
      orderItems: orderItems
    }, 
      {withCredentials: true})
    .then((res) => {
        if (res.status === 200) {
          console.log("Payment successful")
          setOrderStatus((prevState) => ({
            ...prevState,
            success: true,
          }))
        } 
    })
    .catch((error) => {
      setOrderStatus((prevState) => ({
        ...prevState,
        failure: true,
      }))
      throw error;
    })

  }

  const handleChange = (e) => {
    const {id, value} = e.target
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const filterPassedTime = time => {
    const currentTime = new Date(roundedTMFN)
    const selectedTime = new Date(time);
    

    return ((currentTime.getTime() <= selectedTime.getTime()) || (currentTime.getHours() === 
    selectedTime.getHours() && currentTime.getMinutes() === selectedTime.getMinutes())) && (
      selectedTime.getHours() > 6 & selectedTime.getHours() <= 20);
  }

  // create the payment Request for the square payment,
  // this is also a place to enter all of the payment merchant/shipping data
  // as well as a more accurate list of items paid for
  function createPaymentRequest() {
    return {
      requestShippingAddress: false,
      requestBillingInfo: true,
      currencyCode: 'USD',
      countryCode: 'US',
      total: {
        label: 'MERCHANT NAME',
        amount: String(totalPrice),
        pending: false,
      },
      // TODO: enter more specific items in the lineItems
      // use the redux store.
      lineItems: [
        {
          label: 'Subtotal',
          amount: String(totalPrice),
          pending: false,
        },
      ],
    };
  }

  // random person verification details for testing.
  function createVerificationDetails() {
    return {
      amount: String(totalPrice),
      currencyCode: 'USD',
      intent: 'CHARGE',
      billingContact: {
        familyName: state.lastName,
        givenName: state.firstName,
        email: state.email,
        country: "US",
        city: state.city,
        addressLines: [state.streetAddress],
        postalCode: state.zip,
        phone: state.phone,
      },
    };
  }

  function postalCode() {
    const postalCode = '12345'; // your logic here
    return postalCode;
  }

  function focusField() {
    return 'cardNumber';
  }

  // for loading, when the items are not able to be displayed yet
  const loadingView = <div className="sq-wallet-loading"></div>;
  const unavailableApple = (
    <div className="sq-wallet-unavailable">Apple pay unavailable. Open safari on desktop or mobile to use.</div>
  );
  const unavailableGoogle = <div className="sq-wallet-unavailable">Google pay unavailable.</div>;
  const unavailableMasterpass = <div className="sq-wallet-unavailable">Masterpass unavailable.</div>;

  // calculates the total price of the order
  const { totalPrice, orderItems } = useSelector(state => ({
    totalPrice: state.total,
    orderItems: state.addedItems
  }))

  return (
    <div className="group-form">
      <Form>
      <Form.Group widths="equal">
    <div className="input-form">
      <Form.Field>
        <Header as="h3" dividing> Billing/Contact Information </Header>
        <div className="field">
          <label>Name<span className="asterisk">*</span></label>
          <Form.Group widths="equal">
          <Form.Input placeholder="First Name" id="firstName" required onChange={handleChange} />
          <Form.Input placeholder="Last Name" id="lastName" required onChange={handleChange} />
          </Form.Group>
        </div>

        <div className="field">
          <div className="field">

          <label>Billing Address<span className="asterisk">*</span></label>
            <Form.Group>
            <Form.Field width={12}>
              <Form.Input type="text" name="shipping[address]" id="streetAddress" 
              required placeholder="Street Address" onChange={handleChange}/>
            </Form.Field>
            <p></p>

            <Form.Field width={4}>
              <Form.Input type="text" name="shipping[address-2]" id="apt" placeholder="Apt #" onChange={handleChange}/>
            </Form.Field>
          </Form.Group>
          </div>
          <p></p>
          <div className="field">
          <label>City/State/Zip<span className="asterisk">*</span></label>
          <Form.Group>
            <Form.Field width={8}>
              <Form.Input type="text" name="city" required id="city" placeholder="Nashville" onChange={handleChange} />
            </Form.Field>
            <Form.Field width={3}>
              <Form.Input type="text" name="state" required id="state" placeholder="TN" onChange={handleChange}/>
            </Form.Field>
            <Form.Field width={5}>
              <Form.Input type="text" name="state" required id="zip" placeholder="Zip Code" onChange={handleChange}/>
            </Form.Field>
          </Form.Group>
          </div>
          <p></p>

        </div>
              
        <div className="field">
          <p></p>
          <Form.Field>
            <label>E-mail<span className="asterisk">*</span> (for receipt)</label>
          <Form.Input placeholder="Email" type="email" id="email" required onChange={handleChange}>
          </Form.Input>
          </Form.Field>
          <p /> <p />
          <Form.Field>
            <label>Phone Number<span className="asterisk">*</span> (to notify you when your order's ready)</label>
          <Form.Input placeholder="Phone" type="phone" id="phone" required onChange={handleChange}>
          </Form.Input>
          </Form.Field>
          <p />
          <Form.Field>
            <label>Order Notes</label>
            <Form.Input placeholder="Notes" id="note" onChange={handleChange}>
            </Form.Input>
          </Form.Field>
          <p />

          <Form.Field>
          <label>Desired Pickup Time<span className="asterisk">*</span></label>
            <DatePicker
              selected={startTime}
              onChange={date => setStartTime(date)}
              showTimeSelect
              filterTime={filterPassedTime}
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Form.Field>
        </div>


      </Form.Field>
    </div>


    
    <div className="payment-form">
      <Form.Field>
      <Header as="h3" dividing> Order Summary </Header>
      <div>
        <Table basic unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> 
                Item
              </Table.HeaderCell>
              <Table.HeaderCell> 
                Quantity
              </Table.HeaderCell>
              <Table.HeaderCell> 
                Price
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {orderItems.map(item => {
            return(
            <Table.Row>
              <Table.Cell>
              {item.item_name}
              </Table.Cell>
              <Table.Cell>
              {item.quantity}
              </Table.Cell>
              <Table.Cell>
              ${item.price}
              </Table.Cell>
            </Table.Row>
            )
          })}
          {(orderItems.length === 0)? null :
          <>
            <Table.Row>
              <Table.Cell>
              </Table.Cell>
              <Table.Cell as="">
                Subtotal:
              </Table.Cell>
              <Table.Cell>
                ${totalPrice}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
              </Table.Cell>
              <Table.Cell>
                <strong>Total (with sales tax):</strong>
              </Table.Cell>
              <Table.Cell active>
                <strong>${(1.07 * totalPrice).toFixed(2)}</strong>
              </Table.Cell>
            </Table.Row>
            </>
          }
            </Table.Body>
        </Table>
    </div>
      <Header as="h3" dividing> Payment Information </Header>
      {/* Enter the payment info, click pay, then square will generate a nonce based on your
      payment info, then verify the payment info and generate a token, then send all of that
      to the backend server to record the transaction */ }
      <SquarePaymentForm
        sandbox={true}
        applicationId={APPLICATION_ID}
        locationId={LOCATION_ID}
        cardNonceResponseReceived={cardNonceResponseReceived}
        createPaymentRequest={createPaymentRequest}
        createVerificationDetails={createVerificationDetails}
        postalCode={postalCode}
        focusField={focusField}
      >
        {/* Just for show only, use the credit card number input*/}
        {/* <ApplePayButton loadingView={loadingView} unavailableView={unavailableApple} />
        <GooglePayButton loadingView={loadingView} unavailableView={unavailableGoogle} />
        <MasterpassButton loadingView={loadingView} unavailableView={unavailableMasterpass} /> */}

        {/* Divider between show elements and real elements */}
        {/* <div className="sq-divider">
          <span className="sq-divider-label">Or</span>
          <hr className="sq-divider-hr" />
        </div> */}

        {/* Credit card number enter */}
        {/* Enter test data if the Square account is in sandbox mode. 
        The test data is: CC Number: 4111 1111 1111 1111 */}
        <fieldset className="sq-fieldset">
          <CreditCardNumberInput />

          {/* Test date can be any in the future in sandbox mode */}
          <div className="sq-form-third">
            <CreditCardExpirationDateInput />
          </div>

          {/* Can be any 5 numbers in sandbox mode */}
          <div className="sq-form-third">
            <CreditCardPostalCodeInput />
          </div>

          {/* Make this 111 to test in sandbox mode. */}
          <div className="sq-form-third">
            <CreditCardCVVInput />
          </div>
        </fieldset>

        {/* Pay button */}
        { orderStatus.success ? <Message positive header="Order Success!" content="Your order will be ready soon!" /> :
        <CreditCardSubmitButton>Complete Order and Pay ${(totalPrice + 0.07 * totalPrice).toFixed(2)}</CreditCardSubmitButton> 
        }
        {
          orderStatus.failure && <Message negative header="Order Failed" content="Do you have items in your cart?" />
        }

        {/* Error messages display, if any */}
        <div className="sq-error-message">
          {errorMessages.map(errorMessage => (
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          ))}
        </div>

      </SquarePaymentForm>
      </Form.Field>
    </div>
    </Form.Group>
    </Form>
    </div>
  );
};

export default PaymentPage;