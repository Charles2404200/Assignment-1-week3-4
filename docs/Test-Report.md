# Test Report — Login and Team Page Flow and Edge Cases
## 1. Purpose and Scope

This report covers automated tests for the happy-path login flow and edge cases.

**Objective:** confirms (1) end-to-end successful login and redirection to the team page, (2) the sign-in form correctly handles both successful and failed credential submission, and (3) the `TeamMember` card renders its required content correctly across normal and edge-case inputs.

---

## 2. Test Environment

| Item | Detail |
|---|---|
| Test runner | Vitest |
| Component testing | `@testing-library/react`, `@testing-library/user-event` |
| Mocked modules | `next/navigation` (`useRouter`), `@/hooks/useAuth` |
| Route testing | `next/server` (`NextRequest`) against `proxy()` directly, no live server |
| Environment | jsdom |

**Mocking approach:** the sign-in test mocks `useAuth()` entirely rather than hitting real
Firebase, so these tests validate the page's *response to* auth outcomes, not Firebase's
own correctness. The middleware test constructs a `NextRequest` directly and calls `proxy()`
in isolation, without a running Next.js server.

---

## 3. Test Case Summary

| ID | Test file | Test case | Type | Status |
|----|-----------|-----------|------|--------|
| TC-01 | ProxyRedirect | Unauthenticated user hitting `/team` is redirected to `/auth/signin?redirect=/team` with a 307 | Unit (middleware) | Pass |
| TC-02 | SignInPage | Valid credentials → `signInWithEmail` called with correct args, page navigates to `/team` | Integration (component) | Pass |
| TC-03 | SignInPage | Invalid credentials → rejected promise surfaces an alert with "invalid email or password", no navigation occurs | Integration (component) | Pass |
| TC-04 | TeamMember | All required fields (name, initials, nickname, role, interests) render correctly | Unit (component) | Pass |
| TC-05 | TeamMember | Initials render when no profile photo is supplied | Unit (component) | Pass |
| TC-06 | TeamMember | An unusually long interests string still renders in full | Unit (component, edge case) | Pass |

---

## 4. Detailed Test Cases

### TC-01 — Route Authentication for Team Page
**File:** `proxy` (route middleware) test
**Preconditions:** Request to `/team` with no `cookie` header (no session).
**Steps:**
1. Build a `NextRequest` for `http://localhost:3000/team` with no cookie.
2. Call `proxy(request)`.
3. Inspect the response.

**Expected result:**
- HTTP status `307` (temporary redirect).
- `Location` header path is `/auth/signin`.
- `redirect` query param on that location equals `/team` (so the user returns to where
  they were headed after signing in).

---

### TC-02 — Sign In, Valid Credentials
**File:** Sign-in page test, "login with valid credentials and redirects to /team"
**Preconditions:** `useAuth()` mocked so `signInWithEmail` resolves successfully; `useRouter()`
mocked to capture `replace`/`refresh` calls instead of navigating for real.
**Steps:**
1. Render `<SignInPage />`.
2. Type a valid-looking email and password into the respective fields.
3. Click the "Sign in" button.

**Expected result:**
- `signInWithEmail` is called once with the exact email and password typed.
- `router.replace('/team')` is called, confirming a successful login navigates to the
  team page.

---

### TC-03 — Sign In, Invalid Credentials
**File:** Sign-in page test, "login with invalid credentials"
**Preconditions:** `useAuth()` mocked so `signInWithEmail` rejects with `auth/invalid-credential`.
**Steps:**
1. Render `<SignInPage />`.
2. Type an invalid email/password combination.
3. Click "Sign in".

**Expected result:**
- An element with `role="alert"` appears containing text matching
  `/invalid email or password/i`.
- `router.replace` is **not** called — a failed login must not navigate away from the
  sign-in page.

---

### TC-04 — TeamMember Card Renders Required Content
**File:** `TeamMember` component test, "displays all required team member content correctly"
**Preconditions:** Component rendered with a full, normal set of props (`name`, `initials`,
`nickname`, `role`, `interests`, `icon`).
**Expected result:**
- Heading with the member's full name is present.
- Initials text is present.
- Nickname renders wrapped in parentheses, e.g. `(Johns)`.
- Role text is present.
- Interests text is present.

---

### TC-05 — TeamMember Shows Initials Without a Photo
**File:** `TeamMember` component test, "displays initials when a profile photo is missing"
**Expected result:** initials text is present when no photo is supplied.

---

### TC-06 — TeamMember Handles a Long Interests String
**File:** `TeamMember` component test, "displays an unusually long interests blurb correctly"
**Expected result:** a long interests string renders in full without truncation or layout
failure (as verified by `getByText`, which requires an exact match).

---

## 5. Actual Results

Results for frontend tests.

```
Test Files:  5 passed / 5 total
Tests:       15 passed / 15 total
```

---

## 6. Conclusion

For the required tests, there are no failures for both the login happy path and edge test cases.