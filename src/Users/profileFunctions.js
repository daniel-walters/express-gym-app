import externalMembers from '../../external_db/members.js'

export const checkIfUserIsAStaff = (number) => {
    const member = externalMembers.find(existingMember => existingMember.membershipNumber === number);
    return member.isStaff
}