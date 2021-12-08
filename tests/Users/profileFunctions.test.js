
import { checkIfUserIsAStaff } from "../../src/Users/profileFunctions";

describe("checkIfUserIsAStaff", () => {
    test("returns a boolean", () => {
        expect(checkIfUserIsAStaff(1111)).toEqual(expect.any(Boolean))
    })

    test("returns true for staff members", () => {
        expect(checkIfUserIsAStaff(1111)).toEqual(true)
    })

    test("returns false for gym members", () => {
        expect(checkIfUserIsAStaff(3333)).toEqual(false)
    })
})