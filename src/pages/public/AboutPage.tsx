import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <FoundationPlaceholder
        title="About Rent Back"
        category="Company Information"
        description="Rent Back is Egypt's curated rental marketplace for premium cameras, designer apparel, electronics, and precision tools. We solve the trust deficit through managed custody and verified security deposits."
        targetPhase="Brand story, mission statements, and operational hub locations"
        dataEntities={['PlatformInfo', 'TrustMetrics', 'HubLocations']}
        suggestedActions={[{ label: 'Return Home', to: '/' }]}
      />
    </div>
  );
};
