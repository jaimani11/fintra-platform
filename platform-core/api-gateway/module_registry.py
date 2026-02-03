from dataclasses import dataclass

@dataclass
class Module:
    key: str
    name: str
    description: str
    billable: bool = True


MODULES = {
    "accounting": Module("accounting", "Accounting", "General ledger & reporting"),
    "payroll": Module("payroll", "Payroll", "Payroll runs & filings"),
    "budgeting": Module("budgeting", "Budgeting", "Planning & forecasts"),
    "sales_tax": Module("sales_tax", "Sales Tax", "Tax calculation & filing"),
    "commissions": Module("commissions", "Sales Commissions", "Incentives & payouts"),
    "expenses": Module("expenses", "Expenses", "Expense reporting"),
}
