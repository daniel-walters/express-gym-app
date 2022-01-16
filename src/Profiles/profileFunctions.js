import externalMembers from "../../external_db/members.js";
import Profile from "../db/models/profileSchema.js";

export const checkIfUserIsAStaff = (number) => {
  const member = externalMembers.find(
    (existingMember) => existingMember.membershipNumber === number
  );
  return member.isStaff;
};

export async function getProfileByUid(uid) {
  let profile = await Profile.findOne({ userId: uid }).populate({
    path: "workouts.exercises.exerciseId",
    select: ["name"],
  });
  return profile;
}

export async function getStaffProfiles() {
  const staffProfiles = await Profile.find({ isStaff: true })
  return staffProfiles
}

export async function updateProfileByUid(uid, details) {
  const updatedProfileDetails = {
    userId: details.userId,
    firstName: details.firstName,
    lastName: details.lastName,
    description: details.description,
    isStaff: details.isStaff,
    weight: details.weight,
    checkedIn: details.checkedIn,
    workouts: details.workouts,
    email: details.email,
    photo: details.photo,
  };

  let updatedProfile = await Profile.findOneAndUpdate(
    { userId: uid },
    updatedProfileDetails,
    { returnOriginal: false }
  ).populate({ path: "workouts.exercises.exerciseId", select: ["name"] });
  console.log("update profile returning", updatedProfile);
  return updatedProfile;
}

export async function deleteProfile(uid) {
  try {
    const profile = await Profile.findOneAndDelete({userId: uid});
    return profile;
  } catch (e) {
    return e;
  }
}
