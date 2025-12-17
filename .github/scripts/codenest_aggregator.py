#!/usr/bin/env python3
"""
CodeNest Audit Aggregator
Consolidates security findings from 84 repositories before output
"""

import os
import json
import hashlib
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any

class CodeNestAggregator:
    def __init__(self, repos: List[str], codenest_api_url: str = None):
        self.repos = repos
        self.codenest_api_url = codenest_api_url or os.getenv("CODENEST_API_URL")
        self.audit_cache_dir = Path(".audit-cache")
        self.reports_dir = Path(".codenest-reports")
        self.reports_dir.mkdir(exist_ok=True)
    
    def generate_finding_hash(self, repo: str, finding: Dict[str, Any]) -> str:
        """Generate deterministic hash for deduplication"""
        hash_input = f"{repo}:{finding.get('type')}:{finding.get('file')}"
        return hashlib.sha256(hash_input.encode()).hexdigest()[:16]
    
    def collect_audits(self) -> Dict[str, Any]:
        """Collect all audit results from .audit-cache/"""
        aggregated = {
            "timestamp": datetime.utcnow().isoformat(),
            "repos_scanned": len(self.repos),
            "findings": [],
            "summary": {
                "total": 0,
                "by_severity": {
                    "critical": 0,
                    "high": 0,
                    "medium": 0,
                    "low": 0
                },
                "by_type": {
                    "secret_scanning": 0,
                    "large_files": 0,
                    "merge_conflicts": 0,
                    "yaml_errors": 0,
                    "type_errors": 0,
                    "lint_errors": 0
                }
            }
        }
        
        # Check if audit cache directory exists
        if not self.audit_cache_dir.exists():
            print(f"⚠️  Audit cache directory not found: {self.audit_cache_dir}")
            return aggregated
        
        # Collect findings from each repository
        for repo in self.repos:
            repo_cache_file = self.audit_cache_dir / f"{repo.replace('/', '_')}.json"
            
            if repo_cache_file.exists():
                try:
                    with open(repo_cache_file, 'r') as f:
                        repo_findings = json.load(f)
                        
                        for finding in repo_findings.get("findings", []):
                            finding_hash = self.generate_finding_hash(repo, finding)
                            
                            # Add finding with deduplication hash
                            aggregated["findings"].append({
                                "hash": finding_hash,
                                "repo": repo,
                                "type": finding.get("type"),
                                "severity": finding.get("severity", "low"),
                                "file": finding.get("file"),
                                "details": finding.get("details")
                            })
                            
                            # Update summary counters
                            aggregated["summary"]["total"] += 1
                            severity = finding.get("severity", "low")
                            finding_type = finding.get("type", "unknown")
                            
                            if severity in aggregated["summary"]["by_severity"]:
                                aggregated["summary"]["by_severity"][severity] += 1
                            
                            if finding_type in aggregated["summary"]["by_type"]:
                                aggregated["summary"]["by_type"][finding_type] += 1
                                
                except Exception as e:
                    print(f"⚠️  Failed to process {repo_cache_file}: {e}")
        
        return aggregated
    
    def upload_to_codenest(self, audit_data: Dict[str, Any]):
        """Upload consolidated audit to CodeNest API"""
        if not self.codenest_api_url:
            print("⚠️  CodeNest API URL not configured, saving locally only")
            return
        
        try:
            import requests
            response = requests.post(
                f"{self.codenest_api_url}/api/audits/upload",
                json=audit_data,
                timeout=30
            )
            response.raise_for_status()
            print(f"✅ Audit uploaded to CodeNest: {response.status_code}")
        except ImportError:
            print("⚠️  requests library not available, skipping upload")
        except Exception as e:
            print(f"⚠️  Failed to upload to CodeNest: {e}")
    
    def run(self):
        """Execute aggregation workflow"""
        print("🐝 Queen Bee Audit Aggregation Starting...")
        print(f"📊 Scanning {len(self.repos)} repositories...")
        
        audit_data = self.collect_audits()
        
        # Save locally
        timestamp = datetime.utcnow().strftime('%Y%m%d-%H%M%S')
        report_file = self.reports_dir / f"audit-{timestamp}.json"
        
        with open(report_file, 'w') as f:
            json.dump(audit_data, f, indent=2)
        
        print(f"✅ Audit saved: {report_file}")
        print(f"📈 Total findings: {audit_data['summary']['total']}")
        print(f"   Critical: {audit_data['summary']['by_severity']['critical']}")
        print(f"   High: {audit_data['summary']['by_severity']['high']}")
        print(f"   Medium: {audit_data['summary']['by_severity']['medium']}")
        print(f"   Low: {audit_data['summary']['by_severity']['low']}")
        
        # Upload to CodeNest
        self.upload_to_codenest(audit_data)
        
        print("🐝 Queen Bee Audit Aggregation Complete!")

if __name__ == "__main__":
    # Placeholder repo list - would be loaded from configuration
    # For now, using a subset for demonstration
    repos = [f"org/repo-{i}" for i in range(1, 85)]
    
    aggregator = CodeNestAggregator(repos)
    aggregator.run()
