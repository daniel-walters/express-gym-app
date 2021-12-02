import { checkIfUserIsAMember } from "../../src/Users/userServices.js";

describe('checkIfUserIsAMember', () => {
    test('Returns true if membership number is found in the external database', () => {
        expect(checkIfUserIsAMember(1111)).toEqual(true);
    });
    test('Returns false if membership number is not found in the external database', () => {
        expect(checkIfUserIsAMember(0)).toEqual(false);
    });
});