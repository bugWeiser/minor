# 🏆 Final Submission Manifest: Bugweiser (Hack-A-Sprint 2026)

This document satisfies the mandatory GitHub submission requirements for the final presentation.

---

## ⚖️ 1. Legal Content Sourcing
*How Bugweiser ensures compliance with academic and information laws.*

| Source Category | Specific Section / Law | Purpose in Platform |
| :--- | :--- | :--- |
| **Academic Governance** | **UGC Act, 1956 (Sec. 12)** | Governing source for all "Institutional Notices" and minimum standards. |
| **Information Access** | **RTI Act, 2005 (Sec. 4)** | Mandate for proactive disclosure of information by public institutions. |
| **Student Rights** | **AICTE Grievance Redressal (2012)** | Logic for the "Student Complaint/Grievance" module workflow. |
| **Data Privacy** | **DPDP Act, 2023** | Compliance logic for student data profiling and tag-based filtering. |

---

## 🤖 2. LLM Prompt Templates
*The following templates are used by our 'Bugweiser Metrix' engine to process raw data.*

### **A. Notice Summarization (The 'TL;DR' Engine)**
```markdown
[ROLE]: Academic Information Officer
[TASK]: Summarize the following university notice into 3 bullet points.
[TONE]: Professional, Action-oriented.
[INPUT]: {{raw_notice_text}}
[OUTPUT FORMAT]: 
- Event Date/Deadline
- Primary Action Required
- Contact Person/Department
```

### **B. Syllabus to Task Conversion**
```markdown
[TASK]: Identify all 'Submission Deadlines' and 'Project Milestones' in the text below.
[FORMAT]: JSON array with keys: title, dueDate, priority.
[INPUT]: {{syllabi_extract}}
```

---

## 📝 3. Sample RTI & Complaint Templates
*Templates integrated into the "Student Rights" module for one-click generation.*

### **A. RTI: Exam Copy Re-evaluation Request**
> **To:** Public Information Officer, [University Name]  
> **Subject:** Request for information under RTI Act, 2005.  
> **Body:** I request to inspect/copy my evaluated answer sheet for [Subject Code] - [Sem]. I am enclosing the RTI fee of ₹10 via [Payment Method].

### **B. Complaint: Library Accessibility Issue**
> **To:** The Register/Grievance Cell  
> **Issue:** Malfunctioning HVAC in Central Library North Wing.  
> **Priority:** Level 2 (Operational Blocker).

---

## 📁 4. Legal Aid Directory Data Format
*Schema used to store local university legal aid and counseling contacts.*

```json
{
  "resource_id": "GRIEV-001",
  "name": "Students' Grievance Redressal Committee",
  "contact": "nodal-officer@university.edu",
  "legal_domain": "Academic/Administrative Disputes",
  "location": "Administrative Block, Level 2",
  "availability": "Mon-Fri (10:00 - 16:00)"
}
```

---

## 🖼️ 5. Bilingual UI & Screenshots
*The platform supports English and Hindi to ensure accessibility for all staff and students.*

- **Dashboard:** English (Standard) / Hindi (Regional Support)
- **Alt Text:** Every image placeholder contains descriptive alt-text for screen readers.
- **[View Screenshots Folder](./docs/screenshots)** (Placeholder: Ensure you upload your `.png` files here).

---

## ⚠️ 6. Mandatory Disclaimer Text
*Visible at every stage of the application (located in the Global Footer).*

> **Disclaimer:** This platform is a supplementary communication tool. While we strive for accuracy, students are advised to cross-verify all critical deadlines and notices with the official Physical Notice Board or University Registrar’s Office. The developers are not liable for missed deadlines due to technical discrepancies.

---

## 📄 7. jsPDF Generated Document Sample
*How notices are exported for offline use.*

The system uses `jsPDF` and `jspdf-autotable` to generate official PDFs.
- **Header:** University Logo + Bugweiser Verification QR
- **Content:** Formatted notice body with "Digital Signature" placeholder.
- **Footer:** Date of Generation + IP Hash for integrity verification.

---
**Team:** [bugWeiser]  
**Challenge ID:** [WD-E01]  
**Repository:** [https://github.com/bugWeiser/minor](https://github.com/bugWeiser/minor)
