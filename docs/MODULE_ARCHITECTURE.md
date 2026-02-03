# Module Architecture

Each Fintra module:
- is an independent service
- owns its domain logic
- exposes APIs via contracts
- emits signals (not actions)

AgencyOS consumes signals and prepares decisions.

This allows:
- parallel student teams
- independent deployment
- modular licensing
