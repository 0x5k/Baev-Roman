import { Agent, AgentStatus, KnowledgeItem } from './types';

export const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles common queries about our services.',
    instructions: 'You are a friendly and helpful customer support assistant. You provide accurate information about our products and services.',
    model: 'gemini-3-flash-preview',
    status: AgentStatus.ACTIVE,
    createdAt: '2024-04-20T10:00:00Z',
    updatedAt: '2024-04-25T14:30:00Z'
  },
  {
    id: '2',
    name: 'Ukraine Law Guide',
    description: 'Expert in Ukrainian legal documents and procedures.',
    instructions: 'You are a legal consultant specializing in Ukrainian law. Your goal is to simplify legal concepts for citizens.',
    model: 'gemini-3.1-pro-preview',
    status: AgentStatus.ACTIVE,
    createdAt: '2024-04-22T09:00:00Z',
    updatedAt: '2024-04-28T11:45:00Z'
  },
  {
    id: '3',
    name: 'Code Reviewer Pro',
    description: 'Specializes in TypeScript and React performance audits.',
    instructions: 'You are a senior software engineer. Perform thorough code reviews focusing on clean code, performance, and best practices.',
    model: 'gemini-3.1-pro-preview',
    status: AgentStatus.DRAFT,
    createdAt: '2024-04-27T16:20:00Z',
    updatedAt: '2024-04-27T16:20:00Z'
  }
];

export const MOCK_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: 'k1',
    type: 'file',
    title: 'service_agreement_v2.pdf',
    source: 'GCS: /docs/legal/',
    status: 'indexed'
  },
  {
    id: 'k2',
    type: 'url',
    title: 'Official Documentation',
    source: 'https://docs.example.com',
    status: 'indexed'
  },
  {
    id: 'k3',
    type: 'url',
    title: 'UA Agent Builder Lab Rules',
    source: 'https://www.kaggle.com/competitions/ua-agent-builder-lab-dev-track',
    status: 'pending'
  }
];
