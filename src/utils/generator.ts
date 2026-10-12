import type { Tone, PostLength, GeneratedPost } from '../types';

interface TemplateSet {
  variants: ((context: string, hasImages: boolean) => string)[];
  hashtags: string[];
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function extractHashtags(text: string, tone: Tone): string[] {
  const commonTechKeywords = [
    { pattern: /hackathon/i, tag: '#Hackathon' },
    { pattern: /ai|machine learning|llm|deep learning/i, tag: '#ArtificialIntelligence' },
    { pattern: /react|frontend|css|web/i, tag: '#WebDevelopment' },
    { pattern: /student|university|college|ajce/i, tag: '#StudentDeveloper' },
    { pattern: /team|collaboration|prototype/i, tag: '#BuildingInPublic' },
    { pattern: /design|ui|ux|frontend/i, tag: '#DesignSystems' },
    { pattern: /project|shipped|launch/i, tag: '#ProductLaunch' },
    { pattern: /career|interview|internship|job/i, tag: '#CareerGrowth' },
  ];

  const matched = commonTechKeywords
    .filter(item => item.pattern.test(text))
    .map(item => item.tag);

  const toneDefaults: Record<Tone, string[]> = {
    Professional: ['#Leadership', '#Innovation', '#ContinuousLearning', '#ProfessionalGrowth'],
    Personal: ['#PersonalGrowth', '#Reflections', '#BuildingInPublic', '#TechJourney'],
    Technical: ['#SoftwareEngineering', '#TechArchitecture', '#CodeQuality', '#DevCommunity'],
    Storytelling: ['#LessonsLearned', '#Entrepreneurship', '#Mindset', '#CreatorEconomy'],
  };

  const combined = Array.from(new Set([...matched, ...toneDefaults[tone]]));
  return combined.slice(0, 5);
}

const TEMPLATES: Record<Tone, Record<PostLength, TemplateSet>> = {
  Professional: {
    Concise: {
      variants: [
        (ctx) =>
          `Excited to share a quick milestone:\n\n${ctx}\n\nThree takeaways from the experience:\n1. Execution beats perfection every time.\n2. Cross-functional alignment makes or breaks delivery.\n3. Continuous iteration is the best risk mitigation.\n\nLooking forward to hearing how others in the community approach this!`,
        (ctx) =>
          `A key reflection from our recent initiative:\n\n"${ctx}"\n\nWhen tackling ambiguous challenges, clarity and proactive communication always compound. Grateful for the team and partners who made this progress possible.\n\nWhat has been your biggest learning in this space recently?`,
        (ctx) =>
          `Milestone unlocked 🚀\n\n${ctx}\n\nKey takeaway: When you focus on solving the core problem first, everything else falls into place naturally.\n\nDrop your thoughts below—would love to connect with peers working on similar initiatives.`,
      ],
      hashtags: ['#ProfessionalGrowth', '#Milestone', '#Leadership', '#TechIndustry'],
    },
    Balanced: {
      variants: [
        (ctx) =>
          `Reflecting on our latest project:\n\n${ctx}\n\nIn our industry, the biggest differentiator isn't having the best plan—it's how quickly you adapt when the plan meets reality.\n\nHere are 3 core principles that guided our process:\n• Focus on impact over activity: Cut noise and keep the end-user front and center.\n• Tight feedback loops: Validating assumptions early saved us dozens of hours.\n• Shared ownership: When everyone feels responsible for the outcome, velocity follows naturally.\n\nA huge thank you to everyone who supported this effort. Onto the next challenge!`,
        (ctx) =>
          `A milestone worth pausing for:\n\n${ctx}\n\nStepping back to analyze the journey, a few critical insights stood out:\n\n1. Early communication sets the trajectory. The earlier potential bottlenecks are flagged, the simpler the resolution.\n2. Simplicity is a discipline. It takes twice the effort to design a simple solution than an over-engineered one.\n3. The power of momentum. Small daily compounding gains outperform sporadic bursts of effort.\n\nCurious: How does your team ensure alignment during high-stakes deadlines?`,
        (ctx) =>
          `Excited to announce our latest progress:\n\n${ctx}\n\nBehind every successful release are countless micro-decisions and debates over trade-offs. What mattered most was staying anchored to the primary user problem while remaining flexible on implementation details.\n\nKey takeaways for fellow builders:\n- Ship early prototypes to test assumptions against reality.\n- Never underestimate the importance of clean documentation.\n- Celebrate the small wins that build trust along the way.\n\nThank you to everyone who contributed! What strategies have served you best in similar projects?`,
      ],
      hashtags: ['#Leadership', '#Innovation', '#CareerMilestone', '#Teamwork', '#ContinuousImprovement'],
    },
    Detailed: {
      variants: [
        (ctx) =>
          `A deep dive into our recent milestone and the lessons learned along the way:\n\n${ctx}\n\nWhen we started this initiative, we had a clear hypothesis, but as with any ambitious effort, unexpected complexities emerged within the first 48 hours.\n\nHere is how we navigated the trade-offs and delivered results:\n\n1. Establishing strict scope guardrails\nIt is tempting to expand scope when early prototypes look promising. By anchoring ourselves strictly to core user needs, we prevented feature bloat and preserved team velocity.\n\n2. Optimizing for high-signal communication\nInstead of endless sync meetings, we prioritized asynchronous status briefs, clear checklists, and targeted standups. This gave the team uninterrupted focus time.\n\n3. Embracing rigorous iteration\nEach draft taught us something our initial assumptions missed. Testing early gave us the confidence to refine the approach without second-guessing.\n\nThe outcome exceeded our expectations, but the real value was the operational playbook refined through this process.\n\nTo everyone building something new: Keep testing, stay curious, and protect your focus. I'd love to hear your perspectives in the comments!`,
        (ctx) =>
          `Behind the scenes of our latest achievement:\n\n${ctx}\n\nTrue progress is rarely a straight line. What looks seamless in the final update was the result of deliberate problem-solving, pragmatic trade-offs, and deep team trust.\n\nHere are the pivotal decisions that defined the outcome:\n\n• Diagnosing the root bottleneck early: Rather than patching symptoms, we took time to understand the underlying constraints before writing code.\n• Prioritizing velocity over consensus: We defined clear decision owners to avoid decision fatigue and analysis paralysis.\n• Measuring what matters: Defining clear success criteria beforehand kept our focus razor sharp throughout.\n\nThis experience reinforced a lesson I continue to return to: Great outcomes come from consistency, clarity of purpose, and relentless curiosity.\n\nWhat are the most valuable lessons your team has learned on recent projects? Let's discuss in the comments below.`,
      ],
      hashtags: ['#Leadership', '#Strategy', '#EngineeringLeadership', '#ProfessionalDevelopment', '#CaseStudy'],
    },
  },

  Personal: {
    Concise: {
      variants: [
        (ctx) =>
          `Still processing how much happened over the past few days:\n\n${ctx}\n\nSometimes the hardest part is simply showing up and being willing to be a beginner again. So grateful for the people who cheered me on.\n\nOn to the next chapter! ✨`,
        (ctx) =>
          `A quick personal update and honest reflection:\n\n${ctx}\n\nIf you're currently hesitating to start that project or sign up for that challenge—take the leap. You don't need all the answers before you begin.\n\nHave you stepped out of your comfort zone lately?`,
        (ctx) =>
          `Proud of this moment:\n\n${ctx}\n\nReminding myself that growth rarely feels comfortable in the moment, but looking back, it's always worth it.\n\nWhat's one thing you pushed yourself to try this month?`,
      ],
      hashtags: ['#PersonalGrowth', '#Mindset', '#TechJourney', '#Gratitude'],
    },
    Balanced: {
      variants: [
        (ctx) =>
          `A little behind the scenes of my recent journey:\n\n${ctx}\n\nIf I'm being honest, I almost didn't go through with this. Imposter syndrome has a sneaky way of whispering that you aren't ready yet or that everyone else knows more than you.\n\nHere is what kept me grounded:\n- Remembering that curiosity is stronger than fear.\n- Surrounding myself with people who lift each other up.\n- Treating every stumbling block as data rather than failure.\n\nTo anyone currently in the middle of learning something tough: You are closer than you think. Keep going!\n\nWhat has helped you overcome self-doubt during challenging goals?`,
        (ctx) =>
          `Taking a moment to pause and appreciate how far we've come:\n\n${ctx}\n\nSix months ago, I wouldn't have believed I'd be doing this. Growth doesn't happen in giant leaps—it happens in the quiet, unglamorous hours where you choose to try one more time after things don't work.\n\nThree thoughts I'm carrying forward:\n1. It's okay to ask "dumb" questions. It saves hours of confusion.\n2. The best teammates are empathetic, not just talented.\n3. Celebrating the process makes the outcome so much sweeter.\n\nThank you to everyone who supported me along the way. Your encouragement means the world!`,
      ],
      hashtags: ['#PersonalDevelopment', '#BuildingInPublic', '#TechJourney', '#Inspiration', '#Community'],
    },
    Detailed: {
      variants: [
        (ctx) =>
          `An honest reflection on growth, doubt, and pushing boundaries:\n\n${ctx}\n\nA year ago, the thought of putting myself in this position would have felt overwhelming. Like many people in tech and student life, I frequently battled the feeling that I hadn't earned my seat at the table.\n\nHere is the candid story of what changed and what I learned along the way:\n\n1. You never feel "ready" until after you do it\nWaiting for 100% confidence is a trap. Confidence isn't a prerequisite for action—it is the byproduct of taking action while feeling uncertain.\n\n2. The power of showing up consistently\nWhen things broke (and believe me, they broke multiple times), our biggest asset was patience. We stepped back, took a deep breath, and debugged one line at a time.\n\n3. Community is everything\nNone of this happened in isolation. The feedback, encouragement, and kind words from peers and mentors gave me the fuel to keep building.\n\nIf you're sitting on an idea or contemplating a difficult challenge, let this be your sign to take that first step today.\n\nWhat is one challenge you've been putting off? Drop it below—let's keep each other accountable.`,
      ],
      hashtags: ['#PersonalGrowth', '#TechStory', '#OvercomingDoubt', '#StudentBuilder', '#BuildingInPublic'],
    },
  },

  Technical: {
    Concise: {
      variants: [
        (ctx) =>
          `Technical summary from our recent build:\n\n${ctx}\n\nCore takeaways:\n• Keep the architecture simple until performance demands complexity.\n• Types and automated checks saved our sanity during crunch time.\n• Edge-case testing is 80% of the effort, but 100% of the reliability.\n\nTech stack details in the comments for anyone interested! 🛠️`,
        (ctx) =>
          `Engineering breakdown:\n\n${ctx}\n\nKey lesson: Premature optimization is real, but proper abstraction boundaries are essential. Clear interfaces made refactoring seamless.\n\nWhat stack choices have paid the highest dividends for your projects lately?`,
        (ctx) =>
          `Shipped! ⚡\n\n${ctx}\n\nMain takeaway: Invest in developer experience early. Faster feedback loops mean fewer bugs and higher team velocity.\n\nCheck out the preview and let me know your thoughts on the approach!`,
      ],
      hashtags: ['#SoftwareEngineering', '#WebDev', '#CleanCode', '#TechStack'],
    },
    Balanced: {
      variants: [
        (ctx) =>
          `Under the hood of our latest implementation:\n\n${ctx}\n\nBuilding this highlighted several architectural decisions that proved invaluable under tight timelines:\n\nKey Engineering Highlights:\n• Modularity first: Separated business logic from presentation layers, allowing concurrent development without merge conflicts.\n• State management simplicity: Kept state local and derived where possible to prevent synchronization bugs.\n• Resilient error handling: Built graceful degradation for unexpected inputs from day one.\n\nBiggest technical learning: The simplest solution that satisfies all constraints almost always outlasts the clever one.\n\nEngineers: How do you balance rapid prototyping with code quality when shipping under strict time constraints?`,
        (ctx) =>
          `Technical Post-Mortem & Architecture Insights:\n\n${ctx}\n\nHere is a breakdown of what went well and what we would refactor in v2:\n\nWhat worked seamlessly:\n1. Strict typing and interface contracts kept errors localized.\n2. Component-driven design allowed rapid UI iterations.\n3. Zero unnecessary third-party dependencies reduced build friction.\n\nWhat we learned:\n• Instrument telemetry and logging early.\n• Cache expensive operations before they become bottlenecks.\n\nCode quality isn't about perfection; it's about making future modifications easy and predictable.\n\nWhat's your golden rule for maintaining code clarity?`,
      ],
      hashtags: ['#SoftwareEngineering', '#SystemDesign', '#CodeQuality', '#DevLife', '#TypeScript'],
    },
    Detailed: {
      variants: [
        (ctx) =>
          `Deep Dive: Technical Architecture & Engineering Decisions\n\n${ctx}\n\nWhen designing this system, we were constrained by tight turnaround times and the need for rock-solid stability. Here is an in-depth breakdown of how we approached the technical challenges:\n\n1. Architectural Philosophy\nWe adhered strictly to the principle of "make it work, make it right, make it fast." We resisted the urge to prematurely abstract until clear repeating patterns emerged in the code.\n\n2. Handling Edge Cases & State\nData flow was designed unidirectionally. By maintaining a single source of truth and treating state transitions deterministically, we virtually eliminated race conditions.\n\n3. Performance & Memory Considerations\n• Minimized re-renders by memoizing expensive computations.\n• Optimized asset loading with responsive formats and lazy decoding.\n• Designed graceful offline/degraded fallbacks.\n\n4. What We'd Do Differently Next Time\nWhile the outcome was a success, earlier integration tests would have caught a handful of subtle edge cases sooner.\n\nEngineering is an endless exercise in trade-off management. What technical trade-off has taught you the most recently?`,
      ],
      hashtags: ['#SoftwareArchitecture', '#SystemDesign', '#EngineeringExcellence', '#TechDeepDive', '#CleanArchitecture'],
    },
  },

  Storytelling: {
    Concise: {
      variants: [
        (ctx) =>
          `It started as a simple idea on a whiteboard:\n\n${ctx}\n\nFast forward to today, and that napkin sketch is a working reality. The lesson? Big things never begin with certainty—they begin with a decision to take the first small step.\n\nWhat's an idea you've been waiting to bring to life?`,
        (ctx) =>
          `The clock was ticking, and nothing was working:\n\n${ctx}\n\nJust when we thought we'd hit a dead end, a fresh perspective unlocked the breakthrough. Sometimes the best solutions only appear right after you feel like giving up.\n\nTrust the process! 💡`,
        (ctx) =>
          `A quick story of grit and serendipity:\n\n${ctx}\n\nLooking back, the highlight wasn't just reaching the finish line—it was the laughter, teamwork, and late-night problem-solving that got us there.\n\nWhat story will you tell about your current project?`,
      ],
      hashtags: ['#Storytelling', '#FoundersJourney', '#StartupLife', '#Inspiration'],
    },
    Balanced: {
      variants: [
        (ctx) =>
          `It was 2:00 AM, and everything that could go wrong was going wrong.\n\n${ctx}\n\nOur original plan was completely in shreds. We were exhausted, running on caffeine, and staring at an obstacle that seemed insurmountable. We had two options: call it a day, or throw out our assumptions and try something completely counter-intuitive.\n\nWe picked option two.\n\nHere is what that night taught me about resilience:\n1. Desperation is often the mother of true creativity.\n2. When your team shares mutual trust, pressure turns into camaraderie rather than friction.\n3. The most memorable wins are the ones you had to fight for.\n\nNext time you're facing a wall in your work, remember: That wall might just be the opening scene of your best story yet.\n\nHave you ever had a project turn around at the eleventh hour?`,
        (ctx) =>
          `Every great project has an inflection point:\n\n${ctx}\n\nAt the start, you feel the initial adrenaline of novelty. Then comes the messy middle—where problems arise that no tutorial prepared you for, and enthusiasm has to be replaced by sheer discipline.\n\nHere is how we pushed through the messy middle:\n• We broke giant mountains into 15-minute tasks.\n• We celebrated tiny breakthroughs when everything else was stalling.\n• We focused on helping the person sitting next to us.\n\nWhen we finally watched it all come together, the feeling was unmatched.\n\nTo everyone grinding through the messy middle of their own journey: Keep pushing. You're building more than a project—you're building yourself.`,
      ],
      hashtags: ['#Storytelling', '#Resilience', '#LessonsLearned', '#TeamSpirit', '#BuilderJourney'],
    },
    Detailed: {
      variants: [
        (ctx) =>
          `The Untold Story Behind the Launch:\n\n${ctx}\n\nFrom the outside, project updates often look like smooth, linear trajectories: an idea is born, execution happens, and victory is claimed.\n\nHere is the real, unvarnished story of how it actually unfolded:\n\nChapter 1: The Spark of Ambition\nIt began with boundless energy. We were convinced we could design, build, and ship in record time. Confidence was running at an all-time high.\n\nChapter 2: Reality Strikes\nMidway through, the ground gave way. Critical assumptions failed to hold up. Systems we relied on crashed. The timeline shrank while the problem grew tenfold. This was the moment where many teams pack up and walk away.\n\nChapter 3: The Pivot\nInstead of panicking, we huddled. We stripped away the ego, admitted what wasn't working, and simplified our scope down to the single most vital human experience we wanted to deliver.\n\nChapter 4: The Breakthrough\nWhen the revised prototype finally ran smoothly, the room fell silent—followed by sheer relief and pure joy.\n\nThe real lesson here has nothing to do with code or deliverables. It has everything to do with what happens when people refuse to quit on each other.\n\nWhat is your favorite "comeback" memory from a project you worked on? I'd love to read your story in the comments.`,
      ],
      hashtags: ['#Storytelling', '#BehindTheScenes', '#Resilience', '#TechCulture', '#FoundersStory'],
    },
  },
};

export function generatePost(
  context: string,
  tone: Tone,
  length: PostLength,
  hasImages: boolean,
  variantIndex: number = 0
): GeneratedPost {
  const cleanContext = context.trim();
  const effectiveContext = cleanContext.length > 0
    ? cleanContext
    : "Just completed an intensive hackathon with an amazing team, designing and building our prototype from scratch in 36 hours. Learned so much about rapid problem-solving, clean UX, and trusting your teammates under pressure.";

  const toneTemplates = TEMPLATES[tone][length];
  const totalVariants = toneTemplates.variants.length;
  const safeIndex = Math.abs(variantIndex) % totalVariants;
  const generatorFn = toneTemplates.variants[safeIndex];

  const generatedBody = generatorFn(effectiveContext, hasImages);
  const hashtags = extractHashtags(effectiveContext, tone);

  return {
    text: generatedBody,
    hashtags,
    tone,
    length,
    variantIndex: safeIndex,
  };
}

export const SAMPLE_INITIAL_CONTEXT = 
`Just completed my first 36-hour hackathon! Our team designed and built PostCraft AI—a focused studio to help builders craft polished LinkedIn stories without the noise. Learned a ton about rapid prototyping, UX trade-offs, and how much a supportive team can accomplish in a weekend.`;
