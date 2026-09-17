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
    id: 'scribera',
    title: 'Scribera',
    tagline: 'Christian Writing & Devotional Sanctuary Platform',
    description: 'A dedicated sanctuary for Christian writers and readers. Share daily devotionals, faith-inspired stories, scripture reflections, and grow in faith with a Christ-centered community.',
    category: 'creative',
    section: 'landing-pages',
    tags: ['Devotional', 'Publishing', 'Community', 'Writing', 'Faith'],
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
        'Explore today devotional reflection',
        'Read scripture study notes and community stories',
        'Share faith-inspired story in sanctuary stream'
      ],
      placeholder: 'Search devotionals, authors, scripture notes...',
      responseTemplate: 'Devotional reflection loaded: "Walking in Faith and Grace". Scripture study and community publishing active.',
      actionLabel: 'Launch Scribera Web App',
      features: ['Daily devotional reader feed', 'Christ-centered community publishing', 'Scripture editor & bookmark sanctuary']
    },
    releaseDate: 'Sept 2026',
    whatsNew: [
      'Launched official Scribera PWA web application',
      'Scripture study and devotional notes integration',
      'Enhanced typography and Christ-centered community feed'
    ]
  },
  {
    id: 'refresh-studio',
    title: 'Refresh Studio',
    tagline: 'Interactive Visual Design Rules Trainer',
    description: 'Master the fundamental rules of visual design through interactive practice. Learn alignment, proximity, balance, visual contrast, layout hierarchy, and design principles with Refresh Studio.',
    category: 'creative',
    section: 'nano-banana',
    tags: ['Design System', 'Interactive Trainer', 'UI/UX', 'Layout Hierarchy'],
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
        'Test proximity & alignment layout rules',
        'Practice visual contrast & accessibility score',
        'Train layout balance & typography hierarchy'
      ],
      placeholder: 'Select design rule training exercise...',
      responseTemplate: 'Design trainer status: Alignment 98%, Proximity spacing verified. Visual balance score optimal.',
      actionLabel: 'Launch Refresh Studio App',
      features: ['Interactive UI alignment exercises', 'Color contrast & accessibility checker', 'Visual design rules training modules']
    },
    releaseDate: 'Sept 2026',
    whatsNew: [
      'Added 10 new layout contrast drills',
      'Real-time visual design rule scoring',
      'Responsive design exercise feedback'
    ]
  },
  {
    id: 'refloww',
    title: 'Refloww',
    tagline: 'Financial Documentation & Invoice Manager',
    description: 'Create professional invoices, receipts, delivery notes, and custom financial documentation with custom templates, multi-currency support, and instant PDF exports.',
    category: 'dev-tools',
    section: 'gemini-flash',
    tags: ['Invoicing', 'Finance', 'Documentation', 'PDF Export'],
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
        'Generate custom client invoice template',
        'Create itemized delivery note record',
        'Export financial receipt as PDF'
      ],
      placeholder: 'Search invoice numbers, receipts, clients...',
      responseTemplate: 'Invoice #INV-2026-089 generated successfully. Multi-currency calculation complete.',
      actionLabel: 'Launch Refloww App',
      features: ['Custom invoice & receipt templates', 'Delivery notes documentation manager', 'Multi-currency auto conversion']
    },
    releaseDate: 'Aug 2026',
    whatsNew: [
      'Custom brand color picker for invoices',
      'Automatic tax rate calculation presets',
      'Export directly to PDF and quick email share'
    ]
  },
  {
    id: 'expendx',
    title: 'Expendx (Lucent)',
    tagline: 'Personal Finance & Expense Manager Dashboard',
    description: 'Expendx (Lucent) is a modern personal finance manager providing intelligent expense tracking, category breakdown analytics, interactive budget charts, and Supabase cloud sync.',
    category: 'research',
    section: 'landing-pages',
    tags: ['Expense Tracker', 'Budgeting', 'Financial Charts', 'Personal Finance'],
    version: 'v1.5.0',
    status: 'new',
    modelOrEngine: 'Lucent Finance Engine',
    thumbnail: '/apps/expendx.png',
    bannerImage: '/apps/expendx.png',
    featuredScreenshots: [
      '/apps/expendx.png'
    ],
    creator: {
      name: 'Expendx Team',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=expendx',
      handle: '@expendx_app',
      verified: true
    },
    testersCount: 0,
    upvotesCount: 0,
    rating: 0,
    reviewsCount: 0,
    demoType: 'interactive-simulator',
    demoUrl: 'https://expendx.delightylabs.space',
    interactiveConfig: {
      samplePrompts: [
        'Analyze monthly category expense breakdown',
        'Check financial savings goal progress',
        'Log quick expense transaction'
      ],
      placeholder: 'Filter expenses by category or vendor...',
      responseTemplate: 'Monthly budget status: 68% utilized. Category breakdown updated in interactive financial chart.',
      actionLabel: 'Launch Expendx App',
      features: ['Smart transaction logging', 'Interactive financial spending charts', 'Supabase cloud sync & budget alerts']
    },
    releaseDate: 'Sept 2026',
    whatsNew: [
      'Capacitor PWA mobile support',
      'Supabase real-time cloud data sync',
      'Custom expense category icons and charts'
    ]
  }
];

export const INITIAL_FEEDBACK: Record<string, TesterFeedback[]> = {};

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [];

