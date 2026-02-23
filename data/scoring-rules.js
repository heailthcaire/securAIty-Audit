window.SECUREASSESS_SCORING = {
  meta: {
    version: "1.0",
    description: "Scoring engine configuration for SecureAssess"
  },
  maturityLevels: [
    { id: "critical", label: "Critical", min: 0, max: 20, color: "#ef4444", description: "Severe gaps exist. Immediate action required." },
    { id: "at_risk", label: "At Risk", min: 21, max: 40, color: "#f97316", description: "Significant vulnerabilities present. High priority remediation needed." },
    { id: "developing", label: "Developing", min: 41, max: 60, color: "#eab308", description: "Some controls in place but major gaps remain." },
    { id: "managed", label: "Managed", min: 61, max: 80, color: "#22c55e", description: "Good security posture with room for optimization." },
    { id: "optimized", label: "Optimized", min: 81, max: 100, color: "#06b6d4", description: "Strong, mature security program. Continuous improvement focus." }
  ],
  idkPenalty: {
    enabled: true,
    scoreValue: 10,
    description: "Questions answered 'I don't know' are treated as gaps and scored low."
  },
  industryWeightOverrides: {
    healthcare: { identify: 1.2, protect: 1.1, respond: 1.2 },
    finance: { identify: 1.3, protect: 1.2, detect: 1.2, respond: 1.1 },
    government: { identify: 1.3, protect: 1.1, respond: 1.2 },
    retail: { protect: 1.2, detect: 1.1 },
    technology: { protect: 1.1, detect: 1.1, networking: 1.1 },
    education: { identify: 1.1, protect: 1.1 }
  },
  sizeWeightOverrides: {
    "1-25": { identify: 0.9, physical: 0.8 },
    "2001+": { detect: 1.2, respond: 1.2, networking: 1.1 }
  },
  industryBenchmarks: {
    healthcare: { identify: 52, detect: 45, protect: 55, networking: 48, physical: 60, respond: 40 },
    finance: { identify: 65, detect: 60, protect: 68, networking: 62, physical: 65, respond: 58 },
    government: { identify: 55, detect: 48, protect: 58, networking: 52, physical: 62, respond: 45 },
    education: { identify: 38, detect: 30, protect: 40, networking: 35, physical: 45, respond: 28 },
    retail: { identify: 42, detect: 38, protect: 45, networking: 40, physical: 50, respond: 32 },
    manufacturing: { identify: 40, detect: 35, protect: 42, networking: 38, physical: 55, respond: 30 },
    technology: { identify: 60, detect: 55, protect: 62, networking: 58, physical: 45, respond: 50 },
    legal: { identify: 45, detect: 38, protect: 48, networking: 42, physical: 55, respond: 35 },
    energy: { identify: 50, detect: 45, protect: 52, networking: 48, physical: 58, respond: 42 },
    nonprofit: { identify: 32, detect: 25, protect: 35, networking: 30, physical: 40, respond: 22 },
    other: { identify: 42, detect: 38, protect: 44, networking: 40, physical: 48, respond: 34 }
  }
};
