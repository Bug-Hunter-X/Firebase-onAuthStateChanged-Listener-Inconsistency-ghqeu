# Firebase onAuthStateChanged Listener Inconsistency

This repository demonstrates a subtle bug in Firebase's authentication system where the `onAuthStateChanged` listener might fail to reflect server-side changes to user authentication status. This can happen if a user's session is invalidated on the server, for instance, due to account deletion or changes to authentication providers.  The client-side SDK might not immediately recognize the change.

The `firebaseBug.js` file contains code that illustrates this issue.  `firebaseBugSolution.js` shows a potential solution using a combination of `onAuthStateChanged` and explicit checks against the Firebase server using the `getIdToken()` method.