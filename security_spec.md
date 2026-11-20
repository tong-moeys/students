# Security Specification: newStudents2027

## 1. Data Invariants
- `studentCode`, `lastName`, `firstName`, `gender`, `values`, and `createdAt` are mandatory for any student document.
- `name`, `academicYear`, and `createdAt` are mandatory for any `classes/{classId}` document; optional metadata (`gradeLevel`, `teacherName`, `teacherEmail`, `qrToken`, `room`, `note`) is strictly length-bounded.
- `studentId`, `className`, `academicYear`, `monthKey`, `subjectScores` (exact list of 16 subject items), and `createdAt` are mandatory for any `scores/{scoreId}` document; numeric totals, averages, absence counts, optional `remark` (`<= 200` chars), and optional `teacherEmail` (`<= 150` chars) are strictly bounded.
- Tiered Identity RBAC:
  - **School Admins** (`moeystong@gmail.com`, `bmc21ict@gmail.com` with `email_verified == true`) have full read/write access across all classes, students, and scores, and are the only actors allowed to create, modify, or delete `classes` documents or reassign `teacherEmail`.
  - **Assigned Homeroom Teachers** (verified Google users whose `request.auth.token.email.lower()` matches `resource.data.teacherEmail`) can list, read, create, update, and delete ONLY `students` and `scores` documents belonging to their assigned `teacherEmail`, and cannot modify `teacherEmail` or mutate `classes` documents.
- `isVerifiedUser()` strictly requires `request.auth != null`, non-empty email, and `request.auth.token.email_verified == true`.
- `createdAt` and `createdBy` are strictly immutable on update, and `affectedKeys().hasOnly(...)` blocks ghost-field injection.
- Document IDs must conform to `isValidId` (`size <= 128` and matching `^[a-zA-Z0-9_\-]+$`).

## 2. The "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. **Unauthenticated Student Creation**: Anonymous/unauthenticated user tries to create a student.
2. **Ghost Field Injection**: Adding unauthorized field `isAdmin: true` into student payload.
3. **Missing Mandatory Field**: Student payload missing `studentCode`.
4. **Oversized teacherEmail / qrToken Injection**: `teacherEmail > 150` or `qrToken > 64` characters.
5. **Cross-Class Student Read/List**: Non-admin teacher queries `students` without matching `teacherEmail == auth.email` or reads another teacher's student.
6. **Teacher Escalation via Class Mutation**: Non-admin teacher attempts to update `/classes/{classId}` to assign themselves as `teacherEmail`.
7. **Teacher Reassigning Ownership**: Non-admin teacher attempts to change `teacherEmail` on an existing `/students/{studentId}` or `/scores/{scoreId}`.
8. **Email Spoofing Attack**: User with matching admin email but `email_verified == false` attempts read/write.
9. **Oversized String Injection (Denial of Wallet)**: Injecting oversized string into `firstName` or `values`.
10. **Array Overflow Attack**: Sending `values` array containing > 95 elements.
11. **Immutable Field Tampering on Update**: Trying to overwrite original `createdAt` or `createdBy`.
12. **Malicious Document ID**: ID containing path traversal `../../admin` or invalid characters.

## 3. Test Runner
See `firestore.rules.test.ts`.
