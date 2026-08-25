import { ComparisonTable } from '../types'

export const comparisons: ComparisonTable[] = [
  {
    id: 'precision-vs-recall',
    title: 'Precision vs. Recall',
    leftName: 'Precision',
    rightName: 'Recall',
    rows: [
      {
        label: 'Definition',
        left: 'Fraction of retrieved documents that are relevant to the user\'s information need.',
        right: 'Fraction of relevant documents in the collection that are retrieved.',
      },
      {
        label: 'Purpose',
        left: 'Measures how "clean" the retrieved set is.',
        right: 'Measures how "complete" the retrieved set is.',
      },
      {
        label: 'Question it answers',
        left: 'Of what I returned, how much is useful?',
        right: 'Of everything useful, how much did I return?',
      },
      {
        label: 'Focuses on',
        left: 'The retrieved set.',
        right: 'The full relevant set in the collection.',
      },
    ],
    keyDifferences: [
      'Precision looks at the retrieved documents; recall looks at the relevant documents in the whole collection.',
      'Both are described in the lecture as basic ways to judge "how good are the retrieved docs," with fuller definitions promised later in the course.',
    ],
  },
  {
    id: 'structured-vs-unstructured',
    title: 'Structured vs. Unstructured Data',
    leftName: 'Structured Data',
    rightName: 'Unstructured Data',
    rows: [
      {
        label: 'Definition',
        left: 'Information organized in "tables" (rows and columns).',
        right: 'Typically free text with no table structure.',
      },
      {
        label: 'Query style',
        left: 'Numerical range and exact-match queries.',
        right: 'Keyword queries, including operators, and more sophisticated "concept" queries.',
      },
      {
        label: 'Example query',
        left: 'Salary < 60000 AND Manager = Smith',
        right: 'Find all web pages dealing with drug abuse',
      },
      {
        label: 'Typical example',
        left: 'Employee / Manager / Salary table',
        right: 'Web pages, articles, plays, emails',
      },
      {
        label: 'Associated field',
        left: 'Databases',
        right: 'Classic model for searching text documents (IR)',
      },
    ],
    keyDifferences: [
      'Structured data supports precise, exact conditions; unstructured data relies on keyword/concept matching.',
      'The lecture notes almost no data is purely unstructured — most text has some hidden structure, which leads to "semi-structured data."',
    ],
  },
  {
    id: 'query-vs-information-need',
    title: 'Query vs. Information Need',
    leftName: 'Information Need',
    rightName: 'Query',
    rows: [
      {
        label: 'Definition',
        left: 'What the user actually needs to know, arising from a real user task.',
        right: 'The words the user actually types into the search engine.',
      },
      {
        label: 'Where it comes from',
        left: 'Formed from the user task (can suffer "misconception").',
        right: 'Formed from the information need (can suffer "misformulation").',
      },
      {
        label: 'Example',
        left: 'Info about removing mice without killing them.',
        right: '"how trap mice alive"',
      },
      {
        label: 'Risk',
        left: 'May be based on a misunderstanding of the task (misconception).',
        right: 'May poorly express the real information need (misformulation).',
      },
    ],
    keyDifferences: [
      'The information need is the underlying goal; the query is its (possibly imperfect) expression in words.',
      'The classic search model shows both can drift from the original user task — search engines only see the query, not the true need.',
    ],
  },
  {
    id: 'boolean-vs-ranked-retrieval',
    title: 'Boolean Retrieval vs. Ranked Retrieval',
    leftName: 'Boolean Retrieval',
    rightName: 'Ranked Retrieval',
    rows: [
      {
        label: 'Definition',
        left: 'Query is a Boolean expression (AND, OR, NOT); each document either matches or doesn\'t.',
        right: 'Results are ranked/grouped by how well they match the query (introduced as "what\'s ahead").',
      },
      {
        label: 'Output',
        left: 'Inclusion or exclusion of documents — a set, unordered by relevance.',
        right: 'An ordered list, using evidence like term frequency and proximity to the query.',
      },
      {
        label: 'Precision of the model',
        left: 'Exact: you know exactly what you are getting.',
        right: 'Requires deciding how to measure proximity between query and each document.',
      },
      {
        label: 'Real-world use',
        left: 'Email, library catalogs, macOS Spotlight, WestLaw (legal search).',
        right: 'Introduced as the direction the course heads toward, beyond term search.',
      },
    ],
    keyDifferences: [
      'Boolean retrieval gives a precise yes/no per document; ranked retrieval orders documents by estimated relevance.',
      'The lecture frames ranking as needing extra ingredients Boolean search lacks: term frequency and proximity measures.',
    ],
  },
  {
    id: 'biword-vs-positional-index',
    title: 'Biword Index vs. Positional Index',
    leftName: 'Biword Index',
    rightName: 'Positional Index',
    rows: [
      {
        label: 'Definition',
        left: 'Indexes every consecutive pair of terms as a single dictionary term.',
        right: 'Stores, per term, the exact position(s) where it occurs in each document.',
      },
      {
        label: 'Purpose',
        left: 'Answer two-word phrase queries immediately.',
        right: 'Answer phrase and proximity queries of any length or word-distance.',
      },
      {
        label: 'Advantages',
        left: 'Two-word phrase processing is immediate.',
        right: 'Standard, powerful solution; supports proximity queries (biword indexes cannot).',
      },
      {
        label: 'Disadvantages',
        left: 'False positives on longer phrases; index blowup; infeasible beyond biwords.',
        right: 'Expands postings storage substantially (2–4x a non-positional index).',
      },
      {
        label: 'Handles proximity queries ("/k")?',
        left: 'No.',
        right: 'Yes.',
      },
    ],
    keyDifferences: [
      'Biword indexes are a simple first attempt; positional indexes are the standard, more powerful solution used today.',
      'The two can be combined: a mixed scheme ran in about 1/4 the time of a positional index alone, at the cost of 26% more space.',
    ],
  },
]

export const getComparisonById = (id: string) => comparisons.find((c) => c.id === id)
