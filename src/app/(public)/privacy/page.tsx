import { LegalHeader, LegalSection } from '@/components/LegalContent';

export default function PrivacyPage() {
  return (
    <>
      <LegalHeader title="Privacy Policy" lastUpdated="April 06, 2026" />
      
      <LegalSection title="1. Introduction">
        <p>Bugweiser (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides an adaptive communication platform for educational institutions. This Privacy Policy explains how we collect, use, and protect information when you use our student dashboard and administrative tools.</p>
        <p>By using the platform, you agree to the practices described in this policy. Use of Bugweiser is typically governed by your institution&apos;s agreement with us.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p><strong>Institutional Data:</strong> We process data provided by your institution, including student names, emails, departments, and course enrollments to enable personalized communication.</p>
        <p><strong>User-Generated Content:</strong> Notices, events, and assignments created by administrative staff are stored to be delivered to targeted student groups.</p>
        <p><strong>Interaction Data:</strong> We may collect data on notice read status and task completion to provide analytics to your institution and improve the user experience.</p>
      </LegalSection>

      <LegalSection title="3. Data Usage">
        <p>We use your information solely to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Deliver targeted academic and campus notices.</li>
          <li>Synchronize your academic calendar and task list.</li>
          <li>Provide a personalized dashboard based on your department and year.</li>
          <li>Ensure platform security and prevent unauthorized access.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Data Sharing & Disclosure">
        <p>We do not sell your personal data to third parties. Data is only shared with:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your Educational Institution (as the primary data controller).</li>
          <li>Service providers assisting in platform hosting and delivery (e.g., Cloud Infrastructure).</li>
          <li>Legal authorities if required by prevailing law or safety concerns.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Data Security">
        <p>We implement industry-standard technical and organizational measures to protect institutional data, including encryption at rest and in transit, and role-based access controls (RBAC).</p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>Depending on your jurisdiction and institutional policy, you may have the right to access, correct, or request deletion of your data. These requests should typically be directed to your institution&apos;s Registrar or IT department.</p>
      </LegalSection>
    </>
  );
}
