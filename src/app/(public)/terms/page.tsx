import { LegalHeader, LegalSection } from '@/components/LegalContent';

export default function TermsPage() {
  return (
    <>
      <LegalHeader title="Terms of Service" lastUpdated="April 06, 2026" />
      
      <LegalSection title="1. Acceptance of Terms">
        <p>By accessing or using the Bugweiser platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, you may not access the platform.</p>
        <p>Users who are under the age of majority in their jurisdiction must have parent or legal guardian consent to use the platform.</p>
      </LegalSection>

      <LegalSection title="2. Platform Purpose">
        <p>Bugweiser is provided to facilitate institutional communication between educational administrators, faculty, and students. Use of the platform for non-educational or commercial purposes is strictly prohibited without explicit written consent from both Bugweiser and your institution.</p>
      </LegalSection>

      <LegalSection title="3. User Rights & Responsibilities">
        <p><strong>Authorized Access:</strong> You may only access the platform using the credentials provided by your institution.</p>
        <p><strong>Content Integrity:</strong> Administrative users are responsible for the accuracy and legality of all notices and events published via the targeting engine.</p>
        <p><strong>Prohibited Actions:</strong> Users may not attempt to reverse-engineer, bypass tenant isolation security, or scraping data from the platform.</p>
      </LegalSection>

      <LegalSection title="4. Institutional Relationship">
        <p>Bugweiser acts as a service provider (Processor) to your Educational Institution (Controller). Your use of the platform is also subject to your institution&apos;s internal IT and conduct policies.</p>
      </LegalSection>

      <LegalSection title="5. Intellectual Property">
        <p>The Bugweiser brand, its software architecture, unique UI/UX components, and the &quot;Adaptive Tenant Resolver&quot; logic are the intellectual property of Bugweiser SaaS. Institutional logo and administrative data remain the property of the respective institution.</p>
      </LegalSection>

      <LegalSection title="6. Limitation of Liability">
        <p>As a communication facilitation tool, Bugweiser is not liable for academic outcomes, schedule conflicts, or the failure of a user to read a specific notice. We strive for 99.9% availability but do not guarantee uninterrupted service during maintenance windows or demo pilot periods.</p>
      </LegalSection>
    </>
  );
}
