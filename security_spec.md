# Security Specification: newStudents2027

## 1. Data Invariants
- `studentCode`, `lastName`, `firstName`, `gender`, `values`, and `createdAt` are mandatory for any student document.
- Only verified users (`request.auth.token.email_verified == true`) or admins (`request.auth.token.email == 'bmc21ict@gmail.com'`) can create, update, or delete student records.
- The `createdAt` timestamp is strictly immutable and must match the server timestamp `request.time` at creation time.
- The `updatedAt` timestamp must match the server timestamp `request.time` at update time.
- The `values` list must have between 1 and 70 string values (corresponding to the student profile columns).
- Arbitrary ghost fields (e.g., `role`, `isAdmin`, `isVerified`) are strictly blocked on write.
- Document IDs must conform to `isValidId` (`size <= 128` and matching `^[a-zA-Z0-9_\-]+$`).

## 2. The "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. **Unauthenticated Student Creation**: Anonymous/unauthenticated user tries to create a student.
2. **Ghost Field Injection**: Adding unauthorized field `isAdmin: true` into student payload.
3. **Missing Mandatory Field**: Student payload missing `studentCode`.
4. **Invalid Student Code Format / Size Exceeded**: `studentCode` exceeds 50 characters or is not a string.
5. **Client Fake Timestamp on Create**: Client supplies custom past/future `createdAt` instead of `request.time`.
6. **Immutable Field Tampering on Update**: Trying to overwrite original `createdAt`.
7. **Unverified Email User Write**: User with `email_verified == false` attempts to write student record.
8. **Malicious Document ID**: ID containing path traversal `../../admin` or invalid characters.
9. **Oversized String Injection (Denial of Wallet)**: Injecting 2MB payload into `firstName`.
10. **Array Overflow Attack**: Sending `values` array containing > 100 elements.
11. **Client Fake Timestamp on Update**: Client attempts update without setting `updatedAt == request.time`.
12. **Unauthorized Record Deletion**: Unauthenticated actor attempts to delete `/students/{studentId}`.

## 3. Test Runner
See `firestore.rules.test.ts`.
