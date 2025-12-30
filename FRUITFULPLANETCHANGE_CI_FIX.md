# FruitfulPlanetChange CI Fix Guide

## Issue Overview

The CI pipeline in the FruitfulPlanetChange repository is failing due to a lockfile mismatch.

**Error:**
```
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json
```

**Root Cause:**
The `jszip` dependency was added to `package.json` but the `pnpm-lock.yaml` file was not regenerated.

## Solution

This issue must be fixed in the FruitfulPlanetChange repository directly. BuildNest cannot fix this as it's a separate repository.

### Steps to Fix (in FruitfulPlanetChange repository)

1. **Clone the FruitfulPlanetChange repository:**
   ```bash
   git clone https://github.com/Fruitful-Global-Planet/FruitfulPlanetChange.git
   cd FruitfulPlanetChange
   ```

2. **Regenerate the lockfile:**
   ```bash
   pnpm install
   ```

3. **Commit the updated lockfile:**
   ```bash
   git add pnpm-lock.yaml
   git commit -m "fix: regenerate pnpm-lock.yaml to include jszip dependency"
   git push
   ```

### Alternative: Update package.json and lockfile together

If you need to add the jszip dependency properly:

1. **Install the dependency:**
   ```bash
   pnpm add jszip@^3.10.1
   ```

2. **Commit both files:**
   ```bash
   git add package.json pnpm-lock.yaml
   git commit -m "feat: add jszip dependency with updated lockfile"
   git push
   ```

## Why BuildNest Cannot Fix This

- BuildNest and FruitfulPlanetChange are separate GitHub repositories
- BuildNest has no access to modify files in FruitfulPlanetChange
- The fix must be applied directly in the FruitfulPlanetChange repository
- This is a repository-specific issue, not a BuildNest issue

## Reference

- **Failing CI Run**: https://github.com/Fruitful-Global-Planet/FruitfulPlanetChange/actions/runs/20245881495/job/58125702503
- **Repository**: https://github.com/Fruitful-Global-Planet/FruitfulPlanetChange

## Integration with Queen Bee

Once the CI is fixed in FruitfulPlanetChange, that repository can be:
1. Added to the 84-repository monitoring list
2. Configured with Queen Bee security hooks
3. Monitored via the Queen Bee Control Room dashboard

The Queen Bee deployment orchestrator can then deploy atomic security hooks to FruitfulPlanetChange as part of the 84-repo distribution strategy.
