import externalMembers from '../../external_db/members.js'

/**
 * checkIfUserIsAMember
 * @param membershipNumber The membership number entered in the sign up form
 * * Returns Object with 2 properties: isMember, isStaff
 * * isStaff will be null if isMember is false
 */
export function checkIfUserIsAMember(request, response, next) {
    const { membershipNumber } = request.body;
    const member = externalMembers.find((member) => {
        const { membershipNumber: extMemNum } = member;
        return (extMemNum == membershipNumber);
    });
    if (member) {
        next();
    } else {
        response.status(401).json({error: "Cannot find membership number in our database"});
    }
}

/**
 * checkPasswordConfirmation
 * @param password what the user sends in 'password' field
 * @param passwordConfirm what the user sends in 'password confirmation' field
 * * Returns true or false depending on if passwords are equal
 */
export function checkPasswordConfirmation(request, response, next) {
    const { password, passwordConfirm } = request.body;
    if (password === passwordConfirm) {
        next();
    } else {
        response.status(401).json({error: "Passwords need to be the same"});
    }
}

/**
 * validatePasswordSecurity
 * @param password what the user sends in 'password' field
 * * Returns true or false depending on if password matches the regex
 * ? Secure enough or add special character enforcement? 
 */
export function validatePasswordSecurity(request, response, next) {
    const { password } = request.body;
    const matcher = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    if (matcher.test(password)) {
        next();
    } else {
        response.status(401).json({error: "Password must contain at least one lowercase letter, uppercase letter, number, and must not contain any special characters"});
    }
}
