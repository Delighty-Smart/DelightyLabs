import { BetaApp, CategoryItem, TesterFeedback, ActivityLog } from '../types';

export const CATEGORIES: CategoryItem[] = [
  { id: 'featured', label: 'Featured Apps', icon: 'Sparkles', count: 4 },
  { id: 'all', label: 'All Applications', icon: 'Grid', count: 4 },
  { id: 'creative', label: 'Design & Publishing', icon: 'Palette', count: 2 },
  { id: 'dev-tools', label: 'Developer & Finance', icon: 'Wrench', count: 2 },
  { id: 'research', label: 'Analytics & Management', icon: 'Atom', count: 1 },
];

export const INITIAL_APPS: BetaApp[] = [
  {
    id: 'lucent',
    title: 'Lucent (Expendx)',
    tagline: 'Measure Expenses in Hours of Your Life',
    description: 'Track spending, analyze category breakdowns, and convert prices into the actual work hours of your life it costs to buy them.',
    painPoint: 'Tired of manual spreadsheets and confusing budget categories? Traditional expense trackers only show currency numbers, making it hard to see what your spending actually costs you.',
    immediateValue: [
      'Calculate your real hourly wage after work expenses and taxes',
      'Log any purchase to see its cost in actual working hours',
      'Track category spending against your financial targets'
    ],
    category: 'research',
    section: 'landing-pages',
    tags: ['Expense Tracker', 'Budgeting', 'Financial Charts'],
    version: 'v1.5.0',
    status: 'active',
    modelOrEngine: 'Lucent Finance Engine',
    thumbnail: '/apps/lucent.png',
    bannerImage: '/apps/lucent.png',
    featuredScreenshots: [
      '/apps/lucent.png'
    ],
    creator: {
      name: 'Lucent Team',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=lucent',
      handle: '@lucent_app',
      verified: true
    },
    testersCount: 0,
    upvotesCount: 0,
    rating: 0,
    reviewsCount: 0,
    demoType: 'interactive-simulator',
    demoUrl: 'https://lucent.delightylabs.space',
    interactiveConfig: {
      samplePrompts: [
        'Calculate work-hours for $1,200 purchase at $25/hr wage',
        'Analyze monthly category expense breakdown',
        'Log quick expense transaction in work-hours'
      ],
      placeholder: 'Filter expenses by category or vendor...',
      responseTemplate: 'Monthly budget: 68% utilized. Category breakdown updated in spending chart.',
      actionLabel: 'Launch Lucent (Expendx)',
      features: ['Life-hour expense calculator', 'Interactive spending charts', 'Real-time cloud sync']
    },
    releaseDate: 'Sept 2026',
    whatsNew: [
      'Capacitor PWA mobile support',
      'Real-time cloud data sync',
      'Life-hour cost calculations'
    ]
  },
  {
    id: 'scribera',
    title: 'Scribera',
    tagline: 'Devotional Writing & Community Platform',
    description: 'A sanctuary for Christian writers and readers to share daily devotionals, scripture reflections, and faith stories in a Christ-centered community.',
    painPoint: 'Social platforms are noisy and full of distractions when you want a quiet, focused space for faith writing, daily devotionals, and scripture study.',
    immediateValue: [
      'Read daily scripture reflections in a clutter-free sanctuary',
      'Write and organize your personal devotional notes & journal',
      'Share reflections with a supportive Christ-centered community'
    ],
    category: 'creative',
    section: 'landing-pages',
    tags: ['Devotional', 'Publishing', 'Community', 'Writing'],
    version: 'v1.2.0',
    status: 'trending',
    modelOrEngine: 'Scribera Web Engine',
    thumbnail: '/apps/scribera.png',
    bannerImage: '/apps/scribera.png',
    featuredScreenshots: [
      '/apps/scribera.png'
    ],
    creator: {
      name: 'Scribera Space',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=scribera',
      handle: '@scribera_space',
      verified: true
    },
    testersCount: 0,
    upvotesCount: 0,
    rating: 0,
    reviewsCount: 0,
    demoType: 'interactive-simulator',
    demoUrl: 'https://scribera.delightylabs.space',
    interactiveConfig: {
      samplePrompts: [
        'Read daily devotional reflection',
        'Explore scripture study notes',
        'Publish faith story'
      ],
      placeholder: 'Search devotionals, authors, scripture notes...',
      responseTemplate: 'Devotional loaded: "Walking in Faith and Grace". Sanctuary stream active.',
      actionLabel: 'Launch Scribera',
      features: ['Daily devotional feed', 'Community publishing', 'Scripture editor & sanctuary']
    },
    releaseDate: 'Sept 2026',
    whatsNew: [
      'Official Scribera PWA release',
      'Scripture study and devotional notes',
      'Enhanced typography and community feed'
    ]
  },
  {
    id: 'refresh-studio',
    title: 'Refresh Studio',
    tagline: 'Visual Design Rules & UI Trainer',
    description: 'Master UI layout hierarchy, alignment, proximity, contrast, and visual balance through hands-on interactive exercises.',
    painPoint: 'Reading UI design guidelines is dry and hard to apply. Without interactive practice, it is difficult to spot visual alignment and contrast errors in your designs.',
    immediateValue: [
      'Practice hands-on UI alignment and proximity spacing drills',
      'Test color contrast ratios for Web Accessibility (WCAG)',
      'Score layout hierarchy and balance in real-time'
    ],
    category: 'creative',
    section: 'nano-banana',
    tags: ['Design System', 'UI Trainer', 'Layout Hierarchy'],
    version: 'v1.0.4',
    status: 'active',
    modelOrEngine: 'Refresh Design Engine',
    thumbnail: '/apps/refresh-studio.png',
    bannerImage: '/apps/refresh-studio.png',
    featuredScreenshots: [
      '/apps/refresh-studio.png'
    ],
    creator: {
      name: 'Refresh Studio',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=refreshstudio',
      handle: '@refresh_studio',
      verified: true
    },
    testersCount: 0,
    upvotesCount: 0,
    rating: 0,
    reviewsCount: 0,
    demoType: 'interactive-simulator',
    demoUrl: 'https://refresh.delightylabs.space',
    interactiveConfig: {
      samplePrompts: [
        'Test layout alignment & proximity rules',
        'Practice color contrast accessibility',
        'Train visual hierarchy & spacing'
      ],
      placeholder: 'Select design exercise...',
      responseTemplate: 'Trainer status: Alignment 98%, Proximity verified. Visual balance score optimal.',
      actionLabel: 'Launch Refresh Studio',
      features: ['Interactive UI alignment drills', 'Contrast & accessibility check', 'Visual design scoring']
    },
    releaseDate: 'Sept 2026',
    whatsNew: [
      '10 new layout contrast drills',
      'Real-time design rule scoring',
      'Responsive design feedback'
    ]
  },
  {
    id: 'refloww',
    title: 'Refloww',
    tagline: 'Financial Invoicing & Document Manager',
    description: 'Generate professional invoices, receipts, and delivery notes with custom templates, multi-currency support, and PDF export.',
    painPoint: 'Creating client invoices and delivery receipts manually in spreadsheets is slow, error-prone, and looks unpolished.',
    immediateValue: [
      'Generate branded client invoices and receipts in seconds',
      'Convert currencies automatically with instant tax calculations',
      'Export ready-to-send PDF financial documents'
    ],
    category: 'dev-tools',
    section: 'gemini-flash',
    tags: ['Invoicing', 'Finance', 'PDF Export'],
    version: 'v2.1.0',
    status: 'active',
    modelOrEngine: 'Refloww Finance Engine',
    thumbnail: '/apps/refloww.png',
    bannerImage: '/apps/refloww.png',
    featuredScreenshots: [
      '/apps/refloww.png'
    ],
    creator: {
      name: 'Refloww Team',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=refloww',
      handle: '@refloww_app',
      verified: true
    },
    testersCount: 0,
    upvotesCount: 0,
    rating: 0,
    reviewsCount: 0,
    demoType: 'interactive-simulator',
    demoUrl: 'https://refloww.delightylabs.space',
    interactiveConfig: {
      samplePrompts: [
        'Generate client invoice template',
        'Create itemized delivery note',
        'Export receipt as PDF'
      ],
      placeholder: 'Search invoices, receipts, clients...',
      responseTemplate: 'Invoice #INV-2026-089 generated successfully. Currency calculation complete.',
      actionLabel: 'Launch Refloww',
      features: ['Invoice & receipt templates', 'Delivery notes manager', 'Multi-currency conversion']
    },
    releaseDate: 'Aug 2026',
    whatsNew: [
      'Custom brand color picker',
      'Tax rate presets',
      'Direct PDF export and sharing'
    ]
  }
];

export const INITIAL_FEEDBACK: Record<string, TesterFeedback[]> = {};

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [];

