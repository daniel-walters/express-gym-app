import members from '../../external_db/members.json';

//Returns member object with {membership_number, isStaff} if member exists in external db. 
//Otherwise returns null
export function checkIfUserIsAMember(membership_number) {
    const { members: externalMembers } = members;
    const member = externalMembers.find((member) => {
        const { membership_number: extMemNum } = member;
        return (extMemNum === membership_number);
    });

    return {
        isMember: !!member,
        isStaff: member ? member.isStaff : null
    }
}