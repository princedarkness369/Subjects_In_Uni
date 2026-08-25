export type Importance = 1 | 2 | 3 | 4 | 5

export interface Concept {
  id: string
  section: string
  name: string
  definition: string
  simpleExplanation: string
  whyImportant: string
  mainGoal: string
  advantages?: string[]
  disadvantages?: string[]
  examples: string[]
  notes?: string[]
  confusions?: string[]
  keywords: string[]
  memoryTrick: string
  importance: Importance
}

export interface ComparisonRow {
  label: string
  left: string
  right: string
}

export interface ComparisonTable {
  id: string
  title: string
  leftName: string
  rightName: string
  rows: ComparisonRow[]
  keyDifferences: string[]
}

export interface Flashcard {
  id: string
  section: string
  type: 'definition' | 'purpose' | 'comparison' | 'example'
  front: string
  back: string
}

export interface SectionSummary {
  id: string
  title: string
  quickSummary: string
  importantConcepts: string[]
  commonMistakes: string[]
  professorFocus: string[]
  keywordsToMemorize: string[]
  lastMinuteRevision: string[]
}
