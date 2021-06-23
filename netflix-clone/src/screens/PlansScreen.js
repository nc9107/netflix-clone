import React, { useState, useEffect } from "react";
import db from "../firebase";
import "./PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

//The payment is processed in Stripe. The etnesion is connecting Firestore to Stripe.
// So once the payment is processed in stripe, the extension kicks in and detects that the webhook
// fired off and populate the firestore data base with the plan information.

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            // Gives us a timestamp back
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        //  product doc is all the products trhat currently exist in the
        // databases
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  // Whenever a user wants to checkout/buy something, we start a
  // Stripe CheckoutSession. Stripe does processing and provides us with a link
  // for the user to be redirected to a payment form.
  //  There are two different kinds of urls because we need fall backs for if the
  // user cancels payment or completes it.
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    // Stripe notices that the user starts a new checkout session.
    // Stripe generates a new checkout session and redirects the user
    //towards the checkout page
    docRef.onSnapshot(async (snap) => {
      // ES6 destructuring
      // Publishable test key
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to customer and
        // inspect your Cloud Function logs in the Firebase Console.

        alert(`An error occured: ${error.message}`);
      }
      // sessionId came from snapshot.
      if (sessionId) {
        // We have a session so let's redirect to Checkout
        //Init Stripe
        const stripe = await loadStripe(
          "pk_test_51J4rbiCGpyc2YD8xlIXaoTzhzzSkRRFYT4ui7ZYftyuI7nbPMGUfrd2P7L1ut6Xiy40hD6c8PwIMM6MKDJG7Pjrg00GGquAye2"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Reneral date:
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {/*Will return a key-value pairs in an array.  */}
      {Object.entries(products).map(([productId, productData]) => {
        /*TODO: add some logic to check if user's subscritption is 
     active.  */
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen_plan-disabled"
            } plansScreen_plan`}
          >
            <div className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
