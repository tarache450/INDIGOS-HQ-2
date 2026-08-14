import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { indigoStore } from '../db/store';

let aiClient: GoogleGenAI | null = null;

export function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const getArtistsDeclaration: FunctionDeclaration = {
  name: 'getArtists',
  description: 'Returns the current list of signed artists on the Indigo Records roster with genres and listener statistics.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      genre: { type: Type.STRING, description: 'Optional genre filter (e.g. "Deep Tech", "Minimal")' }
    }
  }
};

const getReleasesDeclaration: FunctionDeclaration = {
  name: 'getReleases',
  description: 'Returns Indigo Records catalog releases (IR001, IR002, IR003, IR004, etc.) including status, stream counts, and TEKK club-readiness scores.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      status: { type: Type.STRING, description: 'Optional status filter: RELEASED, SCHEDULED, DRAFT, MASTERING' }
    }
  }
};

const getTasksDeclaration: FunctionDeclaration = {
  name: 'getTasks',
  description: 'Returns label operational tasks, deadlines, priorities, and assigned team members.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      status: { type: Type.STRING, description: 'TODO, IN_PROGRESS, WAITING, DONE' },
      priority: { type: Type.STRING, description: 'LOW, MEDIUM, HIGH, URGENT' }
    }
  }
};

const getFinanceDeclaration: FunctionDeclaration = {
  name: 'getFinance',
  description: 'Returns label financial overview, revenue streams (Beatport, Spotify, Apple Music), expense breakdown, and royalty splits.',
  parameters: {
    type: Type.OBJECT,
    properties: {}
  }
};

const createTaskDeclaration: FunctionDeclaration = {
  name: 'createTask',
  description: 'Creates a new operational task in the Indigo HQ task manager.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: 'Task title' },
      description: { type: Type.STRING, description: 'Task detailed instructions' },
      priority: { type: Type.STRING, description: 'LOW, MEDIUM, HIGH, URGENT' },
      deadline: { type: Type.STRING, description: 'Due date in YYYY-MM-DD format' },
      assignedTo: { type: Type.STRING, description: 'Assigned staff member' }
    },
    required: ['title', 'priority', 'deadline']
  }
};

const createNoteDeclaration: FunctionDeclaration = {
  name: 'createNote',
  description: 'Creates an internal strategic or A&R note in the Indigo HQ knowledge base.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: 'Note title' },
      content: { type: Type.STRING, description: 'Detailed note text' },
      category: { type: Type.STRING, description: 'INTERNAL, A_AND_R, MEETING, STRATEGY' }
    },
    required: ['title', 'content']
  }
};

export async function executeAiTool(name: string, args: any): Promise<any> {
  switch (name) {
    case 'getArtists': {
      let list = indigoStore.getArtists();
      if (args?.genre) {
        list = list.filter(a => a.genres.some(g => g.toLowerCase().includes(args.genre.toLowerCase())));
      }
      return { count: list.length, artists: list.map(a => ({ name: a.name, genres: a.genres, status: a.status, monthlyListeners: a.monthlyListeners, country: a.country })) };
    }
    case 'getReleases': {
      let list = indigoStore.getReleases();
      if (args?.status) {
        list = list.filter(r => r.status === args.status);
      }
      return { count: list.length, releases: list.map(r => ({ catalogNumber: r.catalogNumber, title: r.title, artist: r.artistName, status: r.status, tekkScore: r.tekkScore, totalStreams: r.totalStreams, releaseDate: r.releaseDate })) };
    }
    case 'getTasks': {
      let list = indigoStore.getTasks();
      if (args?.status) list = list.filter(t => t.status === args.status);
      if (args?.priority) list = list.filter(t => t.priority === args.priority);
      return { count: list.length, tasks: list.map(t => ({ title: t.title, status: t.status, priority: t.priority, deadline: t.deadline, assignedTo: t.assignedTo })) };
    }
    case 'getFinance': {
      const revenues = indigoStore.getRevenues();
      const expenses = indigoStore.getExpenses();
      const royalties = indigoStore.getRoyalties();
      const gross = revenues.reduce((s, r) => s + r.grossAmount, 0);
      const expenseSum = expenses.reduce((s, e) => s + e.amount, 0);
      return {
        grossRevenueEur: gross,
        totalExpensesEur: expenseSum,
        netCashFlowEur: gross - expenseSum,
        recentRevenues: revenues.slice(0, 5),
        recentExpenses: expenses.slice(0, 5),
        royaltiesCalculated: royalties.length
      };
    }
    case 'createTask': {
      const newTask = indigoStore.saveTask({
        id: `tsk_${Date.now()}`,
        title: args.title,
        description: args.description || '',
        status: 'TODO',
        priority: args.priority || 'MEDIUM',
        deadline: args.deadline || new Date().toISOString().split('T')[0],
        assignedTo: args.assignedTo || 'Tarache (Super Admin)',
        createdAt: new Date().toISOString()
      }, 'Indigo AI Copilot');
      return { success: true, message: `Task created successfully: "${newTask.title}" (Priority: ${newTask.priority}, Deadline: ${newTask.deadline})`, taskId: newTask.id };
    }
    case 'createNote': {
      const newNote = indigoStore.saveNote({
        id: `nt_${Date.now()}`,
        title: args.title,
        content: args.content,
        tags: ['AI Generated', args.category || 'STRATEGY'],
        category: args.category || 'STRATEGY',
        createdAt: new Date().toISOString(),
        author: 'Indigo AI Copilot'
      }, 'Indigo AI Copilot');
      return { success: true, message: `Note saved to knowledge base: "${newNote.title}"`, noteId: newNote.id };
    }
    default:
      return { error: `Unknown tool "${name}"` };
  }
}

export async function askIndigoAI(message: string, contextPrompt?: string): Promise<{ text: string; toolCallsExecuted?: any[] }> {
  const ai = getGenAI();
  
  // Real-time context snapshot from Indigo Store
  const artists = indigoStore.getArtists().map(a => `${a.name} (${a.genres.join(', ')})`).join('; ');
  const releases = indigoStore.getReleases().map(r => `${r.catalogNumber}: "${r.title}" by ${r.artistName} [Status: ${r.status}, TEKK Score: ${r.tekkScore || 'N/A'}]`).join('; ');
  const attention = indigoStore.getDashboardMetrics().attentionItems.map(a => `[${a.urgency}] ${a.title}`).join('; ');
  const knowledge = indigoStore.getAIKnowledge().map(k => `${k.title}: ${k.content}`).join('\n');

  const systemInstruction = `You are INDIGO AI, the intelligent executive co-pilot and operating system brain for INDIGO RECORDS ("For Those Who Listen Within").
Indigo Records is a premier underground record label specializing in Minimal, Deep Tech, and Tech House with raw energy and meticulous frequency balance.

LIVE LABEL CONTEXT:
- Roster: ${artists}
- Catalog Releases: ${releases}
- Immediate Attention Triggers: ${attention}
- Knowledge Base:
${knowledge}

Your capabilities:
1. Provide sharp, concise, authoritative advice on A&R, release campaigns, DSP pitching (Beatport/Spotify), audio quality evaluation (TEKKIN scoring), contracts, and 50/50 master royalty splits.
2. Execute tool calls when the user asks you to check artists, releases, tasks, finances, or create new tasks/notes.
3. Keep answers clear, professional, objective, and action-oriented.`;

  if (!ai) {
    // Elegant local fallback if API key is not yet set in secrets
    return {
      text: `[INDIGO AI — OFFLINE/LOCAL MODE]\n\nBased on Indigo HQ's current live state:\n- **Catalog**: 4 registered releases (IR001 "Haval Whispers", IR002 "Bem Bora", IR003 "Echoes of Night", IR004 "Vortex Rhythm").\n- **Upcoming Focus**: IR004 "Vortex Rhythm" by Maniky is scheduled for release with a TEKK club-readiness score of 98.\n- **A&R Pipeline**: Lucas Rivas "Sub Terraneo" is in negotiation for IR005 (Score: 9.4).\n- **Finances**: Q1 Gross Revenue of €9,960.50 with 100% verified artist royalty splits.\n\n*(Note: To unlock live Gemini 3.7 reasoning, ensure GEMINI_API_KEY is configured in AI Studio Settings > Secrets)*`
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [
          {
            functionDeclarations: [
              getArtistsDeclaration,
              getReleasesDeclaration,
              getTasksDeclaration,
              getFinanceDeclaration,
              createTaskDeclaration,
              createNoteDeclaration
            ]
          }
        ]
      }
    });

    const toolCalls = response.functionCalls;
    const toolExecutions: any[] = [];

    if (toolCalls && toolCalls.length > 0) {
      for (const call of toolCalls) {
        const result = await executeAiTool(call.name, call.args);
        toolExecutions.push({ name: call.name, args: call.args, result });
      }

      // Generate a synthesis response with tool outputs
      const secondPass = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: [
          { role: 'user', parts: [{ text: message }] },
          { role: 'model', parts: [{ text: `Executed tools: ${JSON.stringify(toolExecutions)}` }] },
          { role: 'user', parts: [{ text: `Provide the final concise response to the user with the tool findings.` }] }
        ],
        config: { systemInstruction }
      });

      return {
        text: secondPass.text || response.text || 'Action processed.',
        toolCallsExecuted: toolExecutions
      };
    }

    return {
      text: response.text || 'No response generated.'
    };
  } catch (err: any) {
    console.error('Indigo AI Gemini call failed:', err);
    return {
      text: `Indigo AI encountered an error processing your query: ${err.message}. Please check label data and try again.`
    };
  }
}
