import { checkIfUserIsAMember, checkPasswordConfirmation, validatePasswordSecurity } from "../../src/Users/userMiddleware.js";

const mockNext = () => {
    const next = jest.fn();
    return next;
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

let request = {body: {}};
let response;
let next;

beforeEach(() => {
    response = mockResponse();
    next = mockNext();
});

describe('checkIfUserIsAMember', () => {
    describe('user is a member', () => {
        test('calls next', () => {
            request.body = {membershipNumber: 1234};
    
            checkIfUserIsAMember(request, response, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('user is not a member', () => {
        beforeAll(() => {
            request.body = {membershipNumber: 0};
        });

        beforeEach(() => {
            checkIfUserIsAMember(request, response, next);
        })

        test('next is not called', () => {      
            expect(next).not.toHaveBeenCalled();
        });

        // test('responds with status 401', () => {
        //     expect(response.status).toHaveBeenCalledWith(401);
        // });

        test('responds with correct error message', () => {
            expect(response.json).toHaveBeenCalledWith({error: "Cannot find membership number in our database"});
        });
    });
});


describe('checkPasswordConfirmation', () => {
    describe('passwords match', () => {
        test('calls next', () => {
            request.body = {password: "passWord1", passwordConfirm: "passWord1"};

            checkPasswordConfirmation(request, response, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('passwords do not match', () => {
        beforeAll(() => {
            request.body = {password: "passWord1", passwordConfirm: "passWord2"};
        });

        beforeEach(() => {
            checkPasswordConfirmation(request, response, next);
        });

        test('next is not called', () => {      
            expect(next).not.toHaveBeenCalled();
        });

        // test('responds with status 401', () => {
        //     expect(response.status).toHaveBeenCalledWith(401);
        // });

        test('responds with correct error message', () => {
            expect(response.json).toHaveBeenCalledWith({error: "Passwords need to be the same"});
        });
    });
});


describe('validatePasswordSecurity', () => {
    describe('password passes checks', () => {
        test('calls next', () => {
            request.body = {password: "passWord1"};

            validatePasswordSecurity(request, response, next);
            expect(next).toHaveBeenCalled();
        });
   });

    describe('password does not pass checks', () => {
        test('next is not called', () => {      
            request.body = {password: "password"};

            validatePasswordSecurity(request, response, next);
            expect(next).not.toHaveBeenCalled();
        });

        // test('responds with status 401', () => {
        //     request.body = {password: "password"};

        //     validatePasswordSecurity(request, response, next);
        //     expect(response.status).toHaveBeenCalledWith(401);
        // });

        test('responds with correct error message', () => {
            request.body = {password: "password"};

            validatePasswordSecurity(request, response, next);
            expect(response.json).toHaveBeenCalledWith({error: "Password must contain a mix of letters and numbers and be at least 6 characters long."});
        });

        test('responds with error message if under 5 chars', () => {
            request.body = {password: "paW1"};

            validatePasswordSecurity(request, response, next);
            expect(response.json).toHaveBeenCalledWith({error: "Password must contain a mix of letters and numbers and be at least 6 characters long."});
        });

        test('responds with error message if no lowercase letters', () => {
            request.body = {password: "PASSWORD1"};

            validatePasswordSecurity(request, response, next);
            expect(response.json).toHaveBeenCalledWith({error: "Password must contain a mix of letters and numbers and be at least 6 characters long."});
        });

        test('responds with error message if no numbers', () => {
            request.body = {password: "passWord"};

            validatePasswordSecurity(request, response, next);
            expect(response.json).toHaveBeenCalledWith({error: "Password must contain a mix of letters and numbers and be at least 6 characters long."});
        });

        test('responds with error message if it includes special characters', () => {
            request.body = {password: "passWord1%"};

            validatePasswordSecurity(request, response, next);
            expect(response.json).toHaveBeenCalledWith({error: "Password must contain a mix of letters and numbers and be at least 6 characters long."});
        });
    });
});