def can_access_module(org_license, module_key: str) -> bool:
    return module_key in org_license.enabled_modules
