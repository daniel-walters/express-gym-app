import { checkIfUserIsAMember, checkPasswordConfirmation } from "../../src/Users/userServices.js";

describe('checkIfUserIsAMember', () => {
    test('Returns an object', () => {
        expect(typeof(checkIfUserIsAMember(1111))).toBe('object');
    });

    describe('existing staff member', () => {
        let memberInfo = checkIfUserIsAMember(1111);
        test('Existing staff member returns object with isMember: true, isStaff: true', () => {
            expect(memberInfo.isMember).toEqual(true);
            expect(memberInfo.isStaff).toEqual(true);
        });
    });
    
    describe('existing regular member', () => {
        let memberInfo = checkIfUserIsAMember(3333);
        test('Existing regular member returns object with isMember: true, isStaff: false', () => {
            expect(memberInfo.isMember).toEqual(true);
            expect(memberInfo.isStaff).toEqual(false);
        });
    });
    
    describe('non-existing member', () => {
        let memberInfo = checkIfUserIsAMember(0);
        test('Non-Existing member returns object with isMember: false, isStaff: null', () => {
            expect(memberInfo.isMember).toEqual(false);
            expect(memberInfo.isStaff).toBeNull();
        });
    });
});

describe('checkPasswordConfirmation', () => {
    test('returns true if passwords match', () => {
        expect(checkPasswordConfirmation("apPles1", "apPles1")).toEqual(true);
    });
    
    test('returns false if passwords dont match', () => {
        expect(checkPasswordConfirmation("apPles1", "apPles2")).toEqual(false);
    });
});