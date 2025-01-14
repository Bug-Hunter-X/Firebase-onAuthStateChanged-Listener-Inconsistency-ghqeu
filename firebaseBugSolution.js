To address this, we add a check within `onAuthStateChanged` to verify the token with the server. If the token is invalid or expired, we explicitly sign out the user. This ensures that the application reflects the latest authentication status.

```javascript
import { getAuth, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const idToken = await user.getIdToken(true);
      // Send token to server and verify its validity.
      const response = await fetch('/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      });

      if (!response.ok) {
        // Token is invalid. Sign out the user.
        await signOut(auth);
        console.log('User signed out due to invalid token.');
      } else {
        // Token is valid. Proceed with the application.
        console.log('User authenticated:', user);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      await signOut(auth);
      console.log('User signed out due to token verification error.');
    }
  } else {
    console.log('User signed out.');
  }
});
```