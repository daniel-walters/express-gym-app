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

export function checkPasswordConfirmation(password, passwordConfirm) {
    return password === passwordConfirm;
}