import members from '../../external_db/members.json';

export function checkIfUserIsAMember(membership_number) {
    const { members: externalMembers } = members;
    const member = externalMembers.find((member) => {
        const { membership_number: extMemNum, isStaff } = member;
        return (extMemNum === membership_number);
    });

    return !!member;
}