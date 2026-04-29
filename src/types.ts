export enum AgentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT'
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  instructions: string;
  model: string;
  status: AgentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface KnowledgeItem {
  id: string;
  type: 'file' | 'url';
  title: string;
  source: string;
  status: 'indexed' | 'pending' | 'error';
}
