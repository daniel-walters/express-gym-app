import { checkIfUserIsAMember } from "../../src/Users/userServices.js";

describe('checkIfUserIsAMember', () => {
    //Returns an Object
    test('Returns an object', () => {
        expect(typeof(checkIfUserIsAMember(1111))).toBe('object');
    });
    
    test('Existing staff member returns object with isMember: true, isStaff: true', () => {
        expect(checkIfUserIsAMember(1111).isMember).toEqual(true);
        expect(checkIfUserIsAMember(1111).isStaff).toEqual(true);
    });

    test('Existing regular member returns object with isMember: true, isStaff: false', () => {
        expect(checkIfUserIsAMember(3333).isMember).toEqual(true);
        expect(checkIfUserIsAMember(3333).isStaff).toEqual(false);
    })
    
    test('Non-Existing member returns object with isMember: false, isStaff: null', () => {
        expect(checkIfUserIsAMember(0).isMember).toEqual(false);
        expect(checkIfUserIsAMember(0).isStaff).toBeNull();
    });
});