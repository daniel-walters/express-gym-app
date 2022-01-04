import externalMembers from '../../external_db/members.js';
import Profile from '../db/models/profileSchema.js';

export const checkIfUserIsAStaff = (number) => {
    const member = externalMembers.find(existingMember => existingMember.membershipNumber === number);
    return member.isStaff
}


export async function getProfileByUid(uid){
    let profile = await Profile.findOne({userId: uid})
    return profile
}

export async function updateProfileByUid(uid, details){
    const updatedProfileDetails = {
            userId: details.userId,
            firstName: details.firstName,
            lastName: details.lastName,
            description: details.description,
            isStaff: details.isStaff,
            weight: details.weight,
            checkedIn: details.checkedIn,
            workouts: details.workouts,
    }
    
    let updatedProfile = await Profile.findOneAndUpdate({userId: uid}, updatedProfileDetails, { returnOriginal: false })
    return updatedProfile

}