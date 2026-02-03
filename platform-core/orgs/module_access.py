class ModuleAccess:
    def __init__(self):
        self.enabled_modules = {}

    def enable(self, org_id: str, module_key: str):
        self.enabled_modules.setdefault(org_id, set()).add(module_key)

    def disable(self, org_id: str, module_key: str):
        self.enabled_modules.get(org_id, set()).discard(module_key)

    def is_enabled(self, org_id: str, module_key: str) -> bool:
        return module_key in self.enabled_modules.get(org_id, set())
