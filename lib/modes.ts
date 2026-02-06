export const MODES = [
  'HUMANIZER',
  'PUBLISHER',
  'REPORTER',
  'COUNCIL',
  'X MODE',
  'STORYTIME',
  'PULSE'
] as const;

export type Mode = (typeof MODES)[number];

export type ModeTemplate = {
  tone: string;
  structure: string;
  priorities: string[];
};

export const MODE_TEMPLATES: Record<Mode, ModeTemplate> = {
  HUMANIZER: {
    tone: 'Empathetic and clear, with plain-language explanations.',
    structure: 'Open with a relatable hook, then explain what happened and why it matters.',
    priorities: ['Accessibility', 'Emotion', 'Credibility']
  },
  PUBLISHER: {
    tone: 'Confident editorial voice with polished transitions.',
    structure: 'Lead, supporting arguments, context block, and close with key takeaway.',
    priorities: ['Authority', 'Flow', 'Fact-based framing']
  },
  REPORTER: {
    tone: 'Objective and precise with source-forward statements.',
    structure: 'Inverted pyramid: biggest facts first, nuance later.',
    priorities: ['Clarity', 'Verification', 'Attribution']
  },
  COUNCIL: {
    tone: 'Strategic, multi-stakeholder, and insight-driven.',
    structure: 'Frame issue, present options, evaluate tradeoffs, recommend path.',
    priorities: ['Tradeoffs', 'Decision support', 'Balanced risks']
  },
  'X MODE': {
    tone: 'Sharp, punchy, platform-native lines.',
    structure: 'Hook-heavy opening and concise rhythm built for social sharing.',
    priorities: ['Virality', 'Brevity', 'Conversation-starting claims']
  },
  STORYTIME: {
    tone: 'Narrative and immersive with scene-setting details.',
    structure: 'Setup, tension, turning point, reflection.',
    priorities: ['Narrative arc', 'Character moments', 'Memorable close']
  },
  PULSE: {
    tone: 'Fast, trend-aware, and energetic.',
    structure: 'Quick context, what changed, what to watch next.',
    priorities: ['Timeliness', 'Signals', 'Actionability']
  }
};

export const SAMPLE_CONTEXT_PACK = {
  name: 'Jorel Context Pack',
  details: [
    'Audience: founders, operators, and curious creators.',
    'Voice: high signal, conversational, and evidence-driven.',
    'Focus areas: media strategy, brand systems, and internet culture.',
    'Banned mentions: Dash, Dee.'
  ]
};
