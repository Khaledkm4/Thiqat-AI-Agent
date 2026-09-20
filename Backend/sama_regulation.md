# Mock SAMA Regulation — Secure Transfer Authorization

**Reference:** DEMO-SAMA-2026-001  
**Status:** Hackathon demonstration fixture only — not an official SAMA publication.

All outward bank-transfer requests must:

1. Require a non-empty transaction identifier for auditability.
2. Require explicit customer authorization before submission.
3. Reject non-positive transfer amounts.
4. Write an immutable audit event containing the transaction identifier and authorization result before the transfer is sent.

If these requirements cannot be implemented safely inside the reviewed file alone,
the change must be escalated for human compliance review.
