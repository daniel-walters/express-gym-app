import firebaseAdmin from 'firebase-admin';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export function initializeAppClient() {
    initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));
}

export async function signUpUser(userDetails) {
    const { email, password } = userDetails;

    return firebaseAdmin.auth().createUser({
        email,
        password,
        emailVerified: true
    }).then(async (userRecord) => {
        let defaultUserClaims = firebaseAdmin.auth().setCustomUserClaims(
            userRecord.uid, 
            {admin: false, regularUser: true}
        ).then(() => {
            console.log("Set default claims to the new user");
        });

        return userRecord;
    }).catch(error => {
        console.log(`Internal sign-up function error is:\n${error}`);
        return {error};
    });
}

export async function signInUser(userDetails) {
    const { email, password } = userDetails;
    const firebaseClientAuth = getAuth();

    const signInResult = signInWithEmailAndPassword(
        firebaseClientAuth,
        email,
        password
    ).then(async (userCredential) => {
        const userIdToken = await firebaseClientAuth.currentUser.getIdTokenResult(false);
        return {
            idToken: userIdToken.token,
            refreshToken: userCredential.user.refreshToken,
            email: userCredential.user.email,
            emailVerified: userCredential.user.emailVerified,
            uid: userCredential.user.uid
        }
    }).catch(error => {
        console.log(`Internal sign-up function error is:\n${error}`);
        return {error};
    });

    return signInResult;
}