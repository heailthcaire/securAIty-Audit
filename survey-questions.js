window.SECUREASSESS_QUESTIONS = {
  meta: {
    version: "1.0",
    totalEstimatedMinutes: 12,
    description: "Cybersecurity readiness assessment aligned to CyberSecAndI service pillars"
  },
  companyProfile: {
    id: "profile",
    title: "Company Profile",
    description: "Tell us about your organization so we can tailor the assessment.",
    questions: [
      {
        id: "cp_industry",
        text: "What industry is your organization in?",
        type: "single_select",
        options: [
          { value: "healthcare", label: "Healthcare" },
          { value: "finance", label: "Finance / Banking" },
          { value: "government", label: "Government / Public Sector" },
          { value: "education", label: "Education" },
          { value: "retail", label: "Retail / E-Commerce" },
          { value: "manufacturing", label: "Manufacturing" },
          { value: "technology", label: "Technology / SaaS" },
          { value: "legal", label: "Legal" },
          { value: "energy", label: "Energy / Utilities" },
          { value: "nonprofit", label: "Nonprofit" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "cp_size",
        text: "How many employees does your organization have?",
        type: "single_select",
        options: [
          { value: "1-25", label: "1–25" },
          { value: "26-100", label: "26–100" },
          { value: "101-500", label: "101–500" },
          { value: "501-2000", label: "501–2,000" },
          { value: "2001+", label: "2,001+" }
        ]
      },
      {
        id: "cp_work_model",
        text: "What is your work model?",
        type: "single_select",
        options: [
          { value: "office", label: "Fully on-site / office" },
          { value: "hybrid", label: "Hybrid (mix of remote and on-site)" },
          { value: "remote", label: "Fully remote" }
        ]
      },
      {
        id: "cp_regulations",
        text: "Which regulations or compliance frameworks apply to your organization?",
        type: "multi_select",
        options: [
          { value: "hipaa", label: "HIPAA" },
          { value: "pci", label: "PCI DSS" },
          { value: "sox", label: "SOX" },
          { value: "cmmc", label: "CMMC / DFARS" },
          { value: "gdpr", label: "GDPR" },
          { value: "ferpa", label: "FERPA" },
          { value: "nist", label: "NIST 800-171" },
          { value: "statereg", label: "State Privacy Laws (CCPA, etc.)" },
          { value: "none", label: "None / Not sure" }
        ]
      },
      {
        id: "cp_secteam",
        text: "Do you have dedicated cybersecurity staff?",
        type: "single_select",
        options: [
          { value: "none", label: "No dedicated security staff" },
          { value: "parttime", label: "IT staff handles security part-time" },
          { value: "small", label: "1–3 dedicated security staff" },
          { value: "team", label: "4+ person security team" },
          { value: "outsourced", label: "Outsourced / managed security" }
        ]
      },
      {
        id: "cp_budget",
        text: "What is your approximate annual IT/security budget?",
        type: "single_select",
        options: [
          { value: "under50k", label: "Under $50,000" },
          { value: "50k-200k", label: "$50,000 – $200,000" },
          { value: "200k-1m", label: "$200,000 – $1M" },
          { value: "1m+", label: "Over $1M" },
          { value: "unknown", label: "I don't know" }
        ]
      }
    ]
  },
  pillars: [
    {
      id: "identify",
      title: "Identify",
      icon: "🔍",
      description: "Understanding your digital landscape, assets, vulnerabilities, and risks.",
      questions: [
        {
          id: "id_asset_inventory",
          text: "Do you maintain a complete inventory of all hardware and software assets?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "yes_automated", label: "Yes, automated and up-to-date", score: 100 },
            { value: "yes_manual", label: "Yes, but manually maintained", score: 65 },
            { value: "partial", label: "Partial inventory only", score: 35 },
            { value: "no", label: "No", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF ID.AM-1"
        },
        {
          id: "id_risk_assessment",
          text: "How often do you conduct formal risk assessments?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "quarterly", label: "Quarterly or more", score: 100 },
            { value: "annual", label: "Annually", score: 70 },
            { value: "adhoc", label: "Ad-hoc / when issues arise", score: 30 },
            { value: "never", label: "Never", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF ID.RA-1"
        },
        {
          id: "id_vuln_scanning",
          text: "Do you perform regular vulnerability scanning of your systems?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "continuous", label: "Continuous / automated scanning", score: 100 },
            { value: "monthly", label: "Monthly scans", score: 75 },
            { value: "quarterly", label: "Quarterly scans", score: 50 },
            { value: "annual", label: "Annual scans only", score: 25 },
            { value: "no", label: "No vulnerability scanning", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 7"
        },
        {
          id: "id_pentest",
          text: "When was your last penetration test conducted?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "6months", label: "Within the last 6 months", score: 100 },
            { value: "1year", label: "Within the last year", score: 70 },
            { value: "2years", label: "1–2 years ago", score: 35 },
            { value: "never", label: "Never", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF ID.RA-5"
        },
        {
          id: "id_security_leader",
          text: "Do you have a CISO or virtual CISO providing security leadership?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "ciso", label: "Yes, a full-time CISO", score: 100 },
            { value: "vciso", label: "Yes, a virtual CISO (vCISO)", score: 85 },
            { value: "itlead", label: "IT director handles security strategy", score: 40 },
            { value: "none", label: "No dedicated security leadership", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF ID.GV-1"
        },
        {
          id: "id_compliance",
          text: "How would you describe your compliance posture with applicable regulations?",
          type: "single_select",
          weight: 8,
          conditionalOn: { field: "cp_regulations", notEqual: ["none"] },
          options: [
            { value: "certified", label: "Certified / fully compliant with audits", score: 100 },
            { value: "progressing", label: "Actively working toward compliance", score: 60 },
            { value: "early", label: "Early stages, gaps exist", score: 30 },
            { value: "noncompliant", label: "Not compliant", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF ID.GV-3"
        },
        {
          id: "id_awareness",
          text: "Do employees receive regular cybersecurity awareness training?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "ongoing", label: "Yes, ongoing with phishing simulations", score: 100 },
            { value: "annual", label: "Yes, annual training", score: 60 },
            { value: "onboarding", label: "Only during onboarding", score: 25 },
            { value: "no", label: "No formal training", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 14"
        }
      ]
    },
    {
      id: "detect",
      title: "Detect",
      icon: "📡",
      description: "Monitoring systems and networks to identify threats as they happen.",
      questions: [
        {
          id: "dt_siem",
          text: "Do you have a SIEM (Security Information and Event Management) solution?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "managed", label: "Yes, managed 24/7 with alerting", score: 100 },
            { value: "inhouse", label: "Yes, managed in-house", score: 70 },
            { value: "basic", label: "Basic log collection but no SIEM", score: 30 },
            { value: "no", label: "No log management", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF DE.CM-1"
        },
        {
          id: "dt_ids",
          text: "Do you have intrusion detection or prevention systems (IDS/IPS)?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "both", label: "Yes, both IDS and IPS", score: 100 },
            { value: "ids_only", label: "IDS only (detection)", score: 60 },
            { value: "firewall_only", label: "Firewall with basic detection", score: 30 },
            { value: "no", label: "No intrusion detection", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 13"
        },
        {
          id: "dt_monitoring",
          text: "What is your monitoring coverage?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "247soc", label: "24/7 SOC monitoring", score: 100 },
            { value: "business_hours", label: "Business hours monitoring", score: 50 },
            { value: "alerts_only", label: "Automated alerts only, no active monitoring", score: 25 },
            { value: "none", label: "No active monitoring", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF DE.CM-7"
        },
        {
          id: "dt_behavior",
          text: "Do you use behavioral analytics (UEBA) to detect anomalous user activity?",
          type: "single_select",
          weight: 6,
          options: [
            { value: "yes", label: "Yes, fully deployed", score: 100 },
            { value: "partial", label: "Partially deployed", score: 50 },
            { value: "no", label: "No", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF DE.AE-1"
        },
        {
          id: "dt_threat_intel",
          text: "Do you subscribe to or consume threat intelligence feeds?",
          type: "single_select",
          weight: 5,
          options: [
            { value: "integrated", label: "Yes, integrated into our SIEM/tools", score: 100 },
            { value: "manual", label: "Yes, reviewed manually", score: 55 },
            { value: "no", label: "No", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF DE.CM-8"
        },
        {
          id: "dt_ml",
          text: "Are machine learning or AI-driven tools part of your detection strategy?",
          type: "single_select",
          weight: 5,
          options: [
            { value: "yes", label: "Yes, actively used", score: 100 },
            { value: "evaluating", label: "Evaluating / piloting", score: 45 },
            { value: "no", label: "No", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF DE.AE-5"
        }
      ]
    },
    {
      id: "protect",
      title: "Protect",
      icon: "🛡",
      description: "Safeguarding systems, networks, and data from unauthorized access and attacks.",
      questions: [
        {
          id: "pr_firewall",
          text: "What is the state of your firewall protection?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "ngfw_managed", label: "Next-gen firewall, managed and monitored", score: 100 },
            { value: "ngfw", label: "Next-gen firewall, self-managed", score: 70 },
            { value: "basic", label: "Basic firewall / ISP-provided", score: 30 },
            { value: "none", label: "No firewall", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 9"
        },
        {
          id: "pr_email",
          text: "Do you have email security beyond the default provider settings?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "advanced", label: "Yes, advanced email security gateway with sandboxing", score: 100 },
            { value: "basic", label: "Yes, basic spam/phishing filter add-on", score: 55 },
            { value: "default", label: "Default provider settings only (M365, Google)", score: 20 },
            { value: "none", label: "No email security", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 9"
        },
        {
          id: "pr_endpoint",
          text: "What endpoint protection do you use?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "edr", label: "EDR / XDR solution (e.g., CrowdStrike, SentinelOne)", score: 100 },
            { value: "managed_av", label: "Managed antivirus with monitoring", score: 65 },
            { value: "basic_av", label: "Basic antivirus (e.g., Windows Defender defaults)", score: 30 },
            { value: "none", label: "No endpoint protection", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 10"
        },
        {
          id: "pr_mfa",
          text: "Is multi-factor authentication (MFA) enforced across all critical systems?",
          type: "single_select",
          weight: 10,
          options: [
            { value: "all", label: "Yes, enforced on all systems", score: 100 },
            { value: "most", label: "Yes, on most critical systems", score: 70 },
            { value: "some", label: "Only on some systems", score: 35 },
            { value: "no", label: "No MFA", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 6"
        },
        {
          id: "pr_dlp",
          text: "Do you have data loss prevention (DLP) controls in place?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "comprehensive", label: "Yes, comprehensive DLP across endpoints, email, and cloud", score: 100 },
            { value: "partial", label: "Partial DLP (email only or endpoint only)", score: 50 },
            { value: "no", label: "No DLP controls", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 3"
        },
        {
          id: "pr_zerotrust",
          text: "Have you adopted a zero-trust security framework?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "implemented", label: "Yes, fully implemented", score: 100 },
            { value: "partial", label: "Partially implemented", score: 55 },
            { value: "planning", label: "Planning / evaluating", score: 20 },
            { value: "no", label: "No", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST SP 800-207"
        },
        {
          id: "pr_patching",
          text: "How do you handle software patching and updates?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "automated", label: "Automated patch management with SLA", score: 100 },
            { value: "scheduled", label: "Scheduled manual patching (monthly)", score: 65 },
            { value: "adhoc", label: "Ad-hoc patching when we remember", score: 25 },
            { value: "no", label: "No formal patching process", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 7"
        },
        {
          id: "pr_cloud",
          text: "If you use cloud services, how is cloud security managed?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "cspm", label: "Cloud security posture management (CSPM) tool in place", score: 100 },
            { value: "manual", label: "Manual configuration reviews", score: 50 },
            { value: "defaults", label: "Cloud provider defaults only", score: 20 },
            { value: "nocloud", label: "We don't use cloud services", score: null },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 3"
        },
        {
          id: "pr_iam",
          text: "How do you manage identity and access (IAM)?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "centralized", label: "Centralized IAM with least-privilege enforcement", score: 100 },
            { value: "ad", label: "Active Directory / SSO with some policies", score: 65 },
            { value: "manual", label: "Manual account management, shared passwords exist", score: 20 },
            { value: "none", label: "No formal IAM", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 5"
        },
        {
          id: "pr_webapp",
          text: "Do you have web application security measures (WAF, secure coding practices)?",
          type: "single_select",
          weight: 7,
          conditionalOn: { field: "cp_industry", includesAny: ["technology", "retail", "finance", "healthcare", "education"] },
          options: [
            { value: "waf_sast", label: "WAF + secure code reviews / SAST", score: 100 },
            { value: "waf", label: "WAF only", score: 55 },
            { value: "basic", label: "Basic HTTPS / SSL only", score: 20 },
            { value: "none", label: "No web app security", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 16"
        }
      ]
    },
    {
      id: "networking",
      title: "Advanced Networking",
      icon: "🌐",
      description: "Securing every pathway and access point within and outside your network.",
      questions: [
        {
          id: "net_segmentation",
          text: "Is your network segmented to isolate critical systems?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "micro", label: "Yes, micro-segmentation implemented", score: 100 },
            { value: "vlans", label: "Yes, VLANs separate major zones", score: 65 },
            { value: "flat", label: "Mostly flat network", score: 15 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 12"
        },
        {
          id: "net_vpn",
          text: "How do remote employees connect to internal resources?",
          type: "single_select",
          weight: 7,
          conditionalOn: { field: "cp_work_model", notEqual: ["office"] },
          options: [
            { value: "ztna", label: "Zero Trust Network Access (ZTNA / SASE)", score: 100 },
            { value: "vpn", label: "Traditional VPN", score: 60 },
            { value: "direct", label: "Direct internet access to cloud apps only", score: 40 },
            { value: "open", label: "No secure remote access solution", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST SP 800-207"
        },
        {
          id: "net_wifi",
          text: "How is your wireless network secured?",
          type: "single_select",
          weight: 6,
          conditionalOn: { field: "cp_work_model", notEqual: ["remote"] },
          options: [
            { value: "enterprise", label: "WPA3-Enterprise with RADIUS / 802.1X", score: 100 },
            { value: "wpa2_separate", label: "WPA2 with separate guest network", score: 65 },
            { value: "wpa2_shared", label: "WPA2 with shared password", score: 30 },
            { value: "open", label: "Open or weakly secured", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 12"
        },
        {
          id: "net_assessment",
          text: "When was your last network security assessment?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "6months", label: "Within the last 6 months", score: 100 },
            { value: "1year", label: "Within the last year", score: 65 },
            { value: "older", label: "Over a year ago", score: 25 },
            { value: "never", label: "Never", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 12"
        },
        {
          id: "net_dns",
          text: "Do you use DNS filtering or secure DNS to block malicious domains?",
          type: "single_select",
          weight: 6,
          options: [
            { value: "yes", label: "Yes", score: 100 },
            { value: "partial", label: "On some networks only", score: 50 },
            { value: "no", label: "No", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 9"
        }
      ]
    },
    {
      id: "physical",
      title: "Physical",
      icon: "🏢",
      description: "Protecting physical assets, buildings, equipment, and people.",
      skipCondition: { field: "cp_work_model", equals: "remote" },
      questions: [
        {
          id: "ph_access_control",
          text: "How is physical access to your facilities controlled?",
          type: "single_select",
          weight: 8,
          options: [
            { value: "badge_bio", label: "Badge + biometric access with logging", score: 100 },
            { value: "badge", label: "Badge / key card access", score: 70 },
            { value: "key_lock", label: "Traditional key and lock", score: 30 },
            { value: "open", label: "No controlled access", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF PR.AC-2"
        },
        {
          id: "ph_cameras",
          text: "Do you have video surveillance covering critical areas?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "monitored", label: "Yes, monitored cameras with retention", score: 100 },
            { value: "recorded", label: "Yes, recorded but not actively monitored", score: 60 },
            { value: "partial", label: "Cameras in some areas only", score: 30 },
            { value: "none", label: "No cameras", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF PR.AC-2"
        },
        {
          id: "ph_server_room",
          text: "Is your server room / data closet physically secured?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "full", label: "Yes, locked with access logs and environmental monitoring", score: 100 },
            { value: "locked", label: "Yes, locked but no logging", score: 55 },
            { value: "unlocked", label: "Not consistently locked", score: 10 },
            { value: "na", label: "N/A — fully cloud / no on-prem servers", score: null },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF PR.AC-2"
        },
        {
          id: "ph_visitor",
          text: "Do you have a visitor management process?",
          type: "single_select",
          weight: 5,
          options: [
            { value: "digital", label: "Yes, digital check-in with badge and escort policy", score: 100 },
            { value: "logbook", label: "Yes, sign-in logbook", score: 50 },
            { value: "none", label: "No formal visitor process", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF PR.AC-2"
        }
      ]
    },
    {
      id: "respond",
      title: "Respond",
      icon: "🚨",
      description: "Addressing and neutralizing detected security incidents swiftly.",
      questions: [
        {
          id: "rs_ir_plan",
          text: "Do you have a documented incident response plan?",
          type: "single_select",
          weight: 10,
          options: [
            { value: "tested", label: "Yes, documented and tested regularly", score: 100 },
            { value: "documented", label: "Yes, documented but not tested", score: 55 },
            { value: "informal", label: "Informal / undocumented process", score: 20 },
            { value: "none", label: "No incident response plan", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF RS.RP-1"
        },
        {
          id: "rs_tabletop",
          text: "How often do you conduct tabletop exercises or IR drills?",
          type: "single_select",
          weight: 7,
          options: [
            { value: "quarterly", label: "Quarterly or more", score: 100 },
            { value: "annual", label: "Annually", score: 65 },
            { value: "once", label: "Done it once", score: 25 },
            { value: "never", label: "Never", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF RS.RP-1"
        },
        {
          id: "rs_containment",
          text: "Can you isolate a compromised system from your network within minutes?",
          type: "single_select",
          weight: 9,
          options: [
            { value: "automated", label: "Yes, automated isolation capability", score: 100 },
            { value: "manual_fast", label: "Yes, manual but within 30 minutes", score: 65 },
            { value: "slow", label: "It would take hours", score: 25 },
            { value: "no", label: "No isolation capability", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF RS.MI-1"
        },
        {
          id: "rs_backup",
          text: "Do you have tested backup and disaster recovery procedures?",
          type: "single_select",
          weight: 10,
          options: [
            { value: "tested_321", label: "3-2-1 backup strategy, tested regularly", score: 100 },
            { value: "backups_tested", label: "Regular backups, tested occasionally", score: 70 },
            { value: "backups_untested", label: "Backups exist but never tested", score: 35 },
            { value: "no", label: "No reliable backups", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "CIS Control 11"
        },
        {
          id: "rs_retainer",
          text: "Do you have an incident response retainer with a security firm?",
          type: "single_select",
          weight: 6,
          options: [
            { value: "yes", label: "Yes", score: 100 },
            { value: "identified", label: "No retainer, but we have a firm identified", score: 40 },
            { value: "no", label: "No", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF RS.CO-1"
        },
        {
          id: "rs_automation",
          text: "Do you use any security automation or orchestration (SOAR)?",
          type: "single_select",
          weight: 5,
          options: [
            { value: "soar", label: "Yes, SOAR platform deployed", score: 100 },
            { value: "scripts", label: "Some automated scripts / playbooks", score: 50 },
            { value: "manual", label: "Everything is manual", score: 0 },
            { value: "idk", label: "I don't know", score: -1 }
          ],
          frameworkRef: "NIST CSF RS.MI-2"
        }
      ]
    }
  ]
};
