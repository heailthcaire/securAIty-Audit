window.SECUREASSESS_SERVICES = {
  company: {
    name: "CyberSecAndI",
    url: "https://cybersecandi.com/",
    tagline: "Identify. Detect. Protect.",
    description: "Comprehensive cybersecurity services and consulting to protect your organization."
  },
  pillars: [
    {
      id: "identify",
      title: "Identify",
      description: "The foundational pillar upon which a robust defense is built. It's the crucial first step in understanding your organization's digital landscape, pinpointing critical assets, potential vulnerabilities, and the inherent risks they face.",
      services: [
        {
          id: "svc_vciso",
          name: "Virtual CISO",
          description: "Strategic security leadership without the cost of a full-time CISO. Get executive-level cybersecurity guidance, risk management, and board reporting.",
          icon: "👔"
        },
        {
          id: "svc_vuln_assessment",
          name: "Vulnerability Assessment",
          description: "Systematic identification and prioritization of security weaknesses across your infrastructure, applications, and configurations.",
          icon: "🔬"
        },
        {
          id: "svc_pentest",
          name: "Penetration Test",
          description: "Simulated real-world attacks to validate your defenses and uncover vulnerabilities before attackers do.",
          icon: "🎯"
        },
        {
          id: "svc_grc",
          name: "Government Risk Compliance",
          description: "Navigate complex regulatory requirements including CMMC, NIST, HIPAA, PCI DSS, SOX, and state privacy laws.",
          icon: "📋"
        },
        {
          id: "svc_training",
          name: "Security Awareness Training",
          description: "Transform employees from your weakest link into your first line of defense with ongoing training and phishing simulations.",
          icon: "🎓"
        }
      ]
    },
    {
      id: "detect",
      title: "Detect",
      description: "Proactive and continuous monitoring of your systems and networks to identify and flag potential security incidents as they happen. Being vigilant with the right tools to spot suspicious activity before it escalates.",
      services: [
        {
          id: "svc_siem",
          name: "Log Management (SIEM)",
          description: "Centralized security event collection, correlation, and analysis to detect threats across your entire environment.",
          icon: "📊"
        },
        {
          id: "svc_ml",
          name: "Machine Learning",
          description: "AI-powered threat detection that identifies novel attacks and anomalies that signature-based tools miss.",
          icon: "🤖"
        },
        {
          id: "svc_ids",
          name: "Intrusion Detection & Prevention",
          description: "Network monitoring to detect and block malicious traffic, unauthorized access attempts, and suspicious activity.",
          icon: "🚧"
        },
        {
          id: "svc_soc",
          name: "SOC as a Service",
          description: "24/7 security operations center monitoring, threat detection, and incident triage by expert analysts.",
          icon: "👁"
        },
        {
          id: "svc_ueba",
          name: "UEBA",
          description: "User and Entity Behavior Analytics to detect insider threats, compromised accounts, and anomalous activity patterns.",
          icon: "📈"
        }
      ]
    },
    {
      id: "protect",
      title: "Protect",
      description: "Safeguarding systems, networks, and data from unauthorized access, use, disclosure, disruption, modification, or destruction. Building a multi-layered defense that anticipates and thwarts potential attacks.",
      services: [
        {
          id: "svc_firewall",
          name: "Managed Firewall",
          description: "Enterprise-grade firewall deployment, configuration, monitoring, and management for complete perimeter protection.",
          icon: "🧱"
        },
        {
          id: "svc_webapp",
          name: "Web App Security",
          description: "Protect web applications from OWASP Top 10 threats with WAF deployment and secure development practices.",
          icon: "🌐"
        },
        {
          id: "svc_email",
          name: "Email Security",
          description: "Advanced email protection against phishing, BEC, malware, and spam with sandboxing and link analysis.",
          icon: "📧"
        },
        {
          id: "svc_endpoint",
          name: "Endpoint Protection",
          description: "Next-gen EDR/XDR deployment and management for comprehensive endpoint threat detection and response.",
          icon: "💻"
        },
        {
          id: "svc_cloud_firewall",
          name: "Managed Cloud Firewall",
          description: "Cloud-native security controls, configuration management, and compliance monitoring for AWS, Azure, and GCP.",
          icon: "☁"
        },
        {
          id: "svc_dlp",
          name: "Data Loss Prevention",
          description: "Monitor and prevent unauthorized data transfers across email, endpoints, and cloud to protect sensitive information.",
          icon: "🔒"
        },
        {
          id: "svc_zerotrust",
          name: "Zero-Trust Framework",
          description: "Design and implement zero-trust architecture: verify every user, validate every device, limit access to what's needed.",
          icon: "🛡"
        },
        {
          id: "svc_patching",
          name: "Patch Management",
          description: "Automated, SLA-driven patch management to ensure systems stay current and vulnerabilities are remediated fast.",
          icon: "🔧"
        },
        {
          id: "svc_iam",
          name: "Identity & Access Management",
          description: "Centralized identity management with SSO, MFA, least-privilege access, and privileged access management.",
          icon: "🔑"
        }
      ]
    },
    {
      id: "networking",
      title: "Advanced Networking",
      description: "Going beyond basic connectivity to build a resilient, intelligent, and proactive defense system for your entire digital infrastructure. Meticulously securing every pathway and access point.",
      services: [
        {
          id: "svc_firewall_prem",
          name: "Firewall (Prem/Web)",
          description: "On-premises and web application firewall deployment, hardening, and ongoing management.",
          icon: "🧱"
        },
        {
          id: "svc_endpoint_net",
          name: "Endpoint Security",
          description: "Comprehensive endpoint hardening and protection integrated with network security controls.",
          icon: "💻"
        },
        {
          id: "svc_network_assessment",
          name: "Network Security Assessment",
          description: "Thorough assessment of network architecture, configurations, segmentation, and access controls.",
          icon: "🔍"
        },
        {
          id: "svc_zerotrust_net",
          name: "Zero Trust",
          description: "Zero-trust network access (ZTNA) implementation replacing legacy VPN with modern, granular access controls.",
          icon: "🛡"
        }
      ]
    },
    {
      id: "physical",
      title: "Physical",
      description: "Protecting physical assets — buildings, equipment, and people — from unauthorized access, damage, or theft. A foundational layer of comprehensive cybersecurity.",
      services: [
        {
          id: "svc_cameras",
          name: "Cameras & Video Surveillance",
          description: "Professional camera systems with monitoring, recording, retention, and remote access.",
          icon: "📹"
        },
        {
          id: "svc_access_control",
          name: "Access Control & Access Cards",
          description: "Badge-based and biometric access control systems with logging and integration with IT security.",
          icon: "🪪"
        }
      ]
    },
    {
      id: "respond",
      title: "Respond",
      description: "The critical phase where your organization actively addresses and neutralizes detected security incidents, minimizing impact and preventing future occurrences.",
      services: [
        {
          id: "svc_ir",
          name: "Incident Response",
          description: "Rapid incident response with experienced professionals to contain, investigate, and remediate security breaches.",
          icon: "🚨"
        },
        {
          id: "svc_containment",
          name: "Containment",
          description: "Swift isolation and containment of compromised systems to prevent lateral movement and limit damage.",
          icon: "🔐"
        },
        {
          id: "svc_restore",
          name: "Eradication & Restore",
          description: "Complete removal of threats and secure restoration of systems to normal operations.",
          icon: "♻"
        },
        {
          id: "svc_automation",
          name: "Automation",
          description: "Security automation and orchestration to accelerate detection, response, and recovery workflows.",
          icon: "⚡"
        }
      ]
    }
  ]
};
