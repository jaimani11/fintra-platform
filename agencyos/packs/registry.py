from agencyos.packs.cash_collections import CashCollectionsPack
from agencyos.packs.spend_leakage import SpendLeakagePack
from agencyos.packs.month_end_close import MonthEndClosePack
from agencyos.packs.payroll_exceptions import PayrollExceptionsPack
from agencyos.packs.contracts_renewals import ContractsRenewalsPack
from agencyos.packs.ops_compliance import OpsCompliancePack
from agencyos.packs.audit_readiness import AuditReadinessPack
from agencyos.packs.margin_unit_econ import MarginUnitEconomicsPack
from agencyos.packs.inventory_intel import InventoryIntelPack
from agencyos.packs.reputation_recovery import ReputationRecoveryPack

PACKS = [
    CashCollectionsPack(),
    SpendLeakagePack(),
    MonthEndClosePack(),
    PayrollExceptionsPack(),
    ContractsRenewalsPack(),
    OpsCompliancePack(),
    AuditReadinessPack(),
    MarginUnitEconomicsPack(),
    InventoryIntelPack(),
    ReputationRecoveryPack(),
]
