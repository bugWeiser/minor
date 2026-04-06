import { LegalHeader, LegalSection } from '@/components/LegalContent';

export default function DataHandlingPage() {
  return (
    <>
      <LegalHeader title="Data Handling & Processing" lastUpdated="April 06, 2026" />
      
      <LegalSection title="1. DPDP Compliance Framework">
        <p>In accordance with Digital Personal Data Protection (DPDP) principles, Bugweiser acts as a designated &quot;Data Processor&quot; for the &quot;Data Fiduciary&quot; (your educational institution). We process data only under the instructions and within the scope defined by the institutional agreement.</p>
      </LegalSection>

      <LegalSection title="2. Purposes of Processing">
        <p>We process personal data for the following specific purposes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Automated targeting of academic and placement notices based on department, year, and section.</li>
          <li>Synchronization of course-specific assignments and internal deadlines.</li>
          <li>System performance monitoring and bug resolution.</li>
          <li>Ensuring data integrity and preventing unauthorized cross-tenant access.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Data Retention & Erasure">
        <p>We retain your data only for as long as your account remains active within the institutional framework. Once you graduate or leave the institution, your data is archived or erased in accordance with the institution&apos;s data retention policy. Specific erasure requests should be routed through your institution&apos;s Data Protection Officer.</p>
      </LegalSection>

      <LegalSection title="4. Technical Safeguards">
        <p>Your data is protected by multiple layers of security:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Multi-Tenant Isolation:</strong> Our &quot;Adaptive Tenant Resolver&quot; ensures that users from one organization cannot access data belonging to another organization.</li>
          <li><strong>Encryption:</strong> Data is encrypted using AES-256 at rest and TLS 1.3 in transit.</li>
          <li><strong>Anonymized Analytics:</strong> System usage statistics are anonymized before processing for platform improvement.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Cross-Border Data Transfer">
        <p>During the pilot phase, all data is processed within regional cloud infrastructure. We do not transfer personal data outside the primary cloud region without explicit institutional consent and legal assessment.</p>
      </LegalSection>

      <LegalSection title="6. Rights of the Data Principal">
        <p>Under DPDP and similar regulations, you have the right to grievance redressal, right to correct, and right to withdraw consent. As a processor, Bugweiser assists your institution in fulfilling these rights. Contact your institution&apos;s IT support for formal requests.</p>
      </LegalSection>
    </>
  );
}
