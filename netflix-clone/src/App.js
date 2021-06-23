import React, { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
//  Redux is like a global state where information needed all over the application can be stored at one place.
// We can containerize our data storage for easier accessibility.
function App() {
  //const user = useSelector(selectUser);
  // This allows us to get the user that exists/currently logged in and use it for variou spurposes like getting payloads.
  const user = useSelector(selectUser);

  console.log(user);

  // React Hook. We dispatch either a login or a logout action.
  const dispatch = useDispatch();

  // Need to remember that the user is logged in so that he isn't logged out whenever I refresh.

  useEffect(() => {
    // Store it locally on the browser that I am logged in.
    // WHen the listener, detects that an user is logged in. Then
    // we fire the user into the state so that it can be accessed everywhere.

    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // If user exists, Logged in
        console.log(userAuth);
        // We have to pass in a payload object with the login containing user info.
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        // Resetting the user back to null.
        dispatch(logout());
      }
    });

    // Clean up for useEffect.
    // If the component ever unmounts, we dont want to duplicate the on AuthStateChanged listerner, instead detach old one and
    // attach new one
    return unsubscribe;
  }, [dispatch]);
  return (
    <div>
      {/* Switch decides what components to render. 
            Router is whatever address we are currently 
            on and then decided according to the switch  */}

      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/profile">
              <ProfileScreen />
            </Route>

            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
