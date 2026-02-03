# Fintra Platform Architecture

Fintra is a multi-tenant platform.

Key principles:
- Users can belong to multiple organizations
- Licensing is enforced at the organization level
- Modules are enabled per organization
- All modules connect through the platform gateway

AgencyOS (AI Chief of Staff) sits ABOVE modules
and never bypasses licensing or permissions.
