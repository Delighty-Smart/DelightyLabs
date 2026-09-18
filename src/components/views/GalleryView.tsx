import React, { useState } from 'react';
import { BetaApp, AppCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';

import { HeroGoogleLabs } from '../landing/HeroGoogleLabs';
import { TransformVisionWltDark } from '../landing/TransformVisionWltDark';
import { PainPointWltLime } from '../landing/PainPointWltLime';
import { ReviewsBeachBlue } from '../landing/ReviewsBeachBlue';
import { BaseClubBlueprint } from '../landing/BaseClubBlueprint';

interface GalleryViewProps {
  onSelectApp: (app: BetaApp) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onSelectApp }) => {
  const { apps } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>('all');

  return (
    <div className="w-full space-y-0 pb-0 font-sans overflow-x-hidden">

      {/* SECTION 1: Hero Carousel — All Apps Showcase */}
      <HeroGoogleLabs
        apps={apps}
        onSelectApp={onSelectApp}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* SECTION 2: Lucent (Expendx) — Financial Clarity */}
      <TransformVisionWltDark
        apps={apps}
        onSelectApp={onSelectApp}
      />

      {/* SECTION 3: Scribera — Faith Writing Platform */}
      <PainPointWltLime
        apps={apps}
        onSelectApp={onSelectApp}
      />

      {/* SECTION 4: Refresh Studio — UI Design Trainer */}
      <ReviewsBeachBlue
        apps={apps}
        onSelectApp={onSelectApp}
      />

      {/* SECTION 5: Refloww — Invoicing & Document Manager */}
      <BaseClubBlueprint
        apps={apps}
        onSelectApp={onSelectApp}
      />

    </div>
  );
};
