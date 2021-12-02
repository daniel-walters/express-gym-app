import firebaseAdmin from 'firebase-admin';

export async function signUpUser(userDetails) {
    return firebaseAdmin.auth().createUser({
        email: userDetails.email,
        password: userDetails.password,
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