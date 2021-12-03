import externalMembers from '../../external_db/members.js'

/**
 * checkIfUserIsAMember
 * @param membershipNumber The membership number entered in the sign up form
 * * Returns Object with 2 properties: isMember, isStaff
 * * isStaff will be null if isMember is false
 */
export function checkIfUserIsAMember(membershipNumber) {
    const member = externalMembers.find((member) => {
        const { membershipNumber: extMemNum } = member;
        return (extMemNum === membershipNumber);
    });

    return {
        isMember: !!member,
        isStaff: member ? member.isStaff : null
    }
}

/**
 * checkPasswordConfirmation
 * @param password what the user sends in 'password' field
 * @param passwordConfirm what the user sends in 'password confirmation' field
 * * Returns true or false depending on if passwords are equal
 */
export function checkPasswordConfirmation(password, passwordConfirm) {
    return password === passwordConfirm;
}

/**
 * validatePasswordSecurity
 * @param password what the user sends in 'password' field
 * * Returns true or false depending on if password matches the regex
 * ? Secure enough or add special character enforcement? 
 */
export function validatePasswordSecurity(password) {
    const matcher = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    return matcher.test(password);
}