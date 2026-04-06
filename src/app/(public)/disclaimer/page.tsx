import { LegalHeader, LegalSection } from '@/components/LegalContent';

export default function DisclaimerPage() {
  return (
    <>
      <LegalHeader title="Institutional Disclaimer" lastUpdated="April 06, 2026" />
      
      <LegalSection title="1. Official Asset Declaration">
        <p>Bugweiser is an official institutional asset when deployed within an Educational Institution&apos;s digital environment. All data, notices, and academic information hosted on this platform are for the official use of authorized students and staff only.</p>
      </LegalSection>

      <LegalSection title="2. Supplement, Not Substitute">
        <p>The Bugweiser student dashboard is intended as a supplementary communication tool. While we strive to synchronize exam schedules, academic notices, and assignment deadlines accurately, users are advised to cross-reference with official university portals, bulletin boards, and department announcements.</p>
      </LegalSection>

      <LegalSection title="3. Demo / Pilot Disclaimer">
        <p>During the Pilot/Beta phase, certain features and data may be part of a simulation environment (Demo Mode). This data is clearly labeled as &quot;Demo Content&quot; or &quot;Sandbox Data&quot; and does not represent real academic deadlines or institutional notices unless explicitly stated otherwise by your administrator.</p>
      </LegalSection>

      <LegalSection title="4. Unauthorized Access">
        <p>Unauthorized access, redistribution of internal notices, or tampering with the adaptive targeting engine is strictly prohibited and may result in institutional disciplinary action or legal proceedings under the Information Technology Act.</p>
      </LegalSection>

      <LegalSection title="5. Content Ownership">
        <p>Bugweiser does not claim ownership over the content of notices or messages posted by administrators. Liability for the content rests with the individual administrator and the parent institution.</p>
      </LegalSection>

      <LegalSection title="6. Contact for Queries">
        <p>For technical issues related to the platform, contact: <strong>support@bugweiser.edu</strong>. For academic or content-related queries, please contact your respective Department Head or Enrollment Office.</p>
      </LegalSection>
    </>
  );
}
