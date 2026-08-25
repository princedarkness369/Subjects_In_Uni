import { SectionSummary } from '../types'

export const summaries: SectionSummary[] = [
  {
    id: 'foundations',
    title: 'Foundations of IR',
    quickSummary:
      'IR means finding relevant material from large, usually unstructured, text collections. It rests on two assumptions (a collection + a goal), follows a "classic search model" from user task to results, and is judged with precision and recall.',
    importantConcepts: [
      'Definition of Information Retrieval',
      'Collection & Goal (basic assumptions)',
      'Classic search model: task → info need → query → results',
      'Precision and Recall',
    ],
    commonMistakes: [
      'Confusing the "query" with the "information need" — they can diverge (misconception, misformulation).',
      'Mixing up precision (about the retrieved set) with recall (about the full relevant set).',
    ],
    professorFocus: [
      'The distinction between user task, information need, and query.',
      'The exact wording of precision vs. recall.',
    ],
    keywordsToMemorize: ['information need', 'collection', 'misconception', 'misformulation', 'precision', 'recall'],
    lastMinuteRevision: [
      'IR = unstructured text + information need + large collection.',
      'Task → Info Need (misconception risk) → Query (misformulation risk) → Results.',
      'Precision = relevant among retrieved. Recall = retrieved among relevant.',
    ],
  },
  {
    id: 'term-document-matrices',
    title: 'Term–Document Matrices',
    quickSummary:
      'A term-document incidence matrix marks with 1/0 whether each term appears in each document. Boolean queries can be answered with bitwise AND on these 0/1 vectors, but at real scale the matrix becomes far too large and sparse to store directly.',
    importantConcepts: [
      'Term-document incidence matrix (rows = terms, columns = documents)',
      'Incidence vectors and bitwise AND for Boolean queries',
      'Why the full matrix becomes infeasible at scale (sparsity)',
    ],
    commonMistakes: [
      'Thinking a bigger matrix is just "slower" — it actually becomes physically too large to store.',
      'Forgetting to complement (flip) the vector for a NOT term before ANDing.',
    ],
    professorFocus: [
      'The Shakespeare "Brutus AND Caesar BUT NOT Calpurnia" example.',
      'The scale numbers: N=1M docs, M=500K terms, half-a-trillion cell matrix.',
    ],
    keywordsToMemorize: ['incidence matrix', '0/1 vector', 'bitwise AND', 'sparse matrix'],
    lastMinuteRevision: [
      '1 = term is in the document, 0 = it is not.',
      'AND queries = bitwise AND across term vectors (complement for NOT).',
      'Matrix is mostly 0s at scale → this motivates the inverted index.',
    ],
  },
  {
    id: 'inverted-index-section',
    title: 'The Inverted Index',
    quickSummary:
      'The inverted index only records, for each term, which documents contain it — solving the sparsity problem. It is built via a Tokenizer → Linguistic modules → Indexer pipeline, with text processing steps (tokenization, normalization, stemming, stop words) cleaning the text along the way, then sorted into a Dictionary and Postings.',
    importantConcepts: [
      'Inverted index (term → list of docIDs)',
      'Variable-size postings lists',
      'Index construction pipeline (Tokenizer, Linguistic modules, Indexer)',
      'Text processing: tokenization, normalization, stemming, stop words',
      'Indexer steps: token sequence → sort → dictionary & postings',
    ],
    commonMistakes: [
      'Assuming postings lists can be fixed-size arrays (they must grow as new documents are added).',
      'Forgetting that sorting (by term, then docID) is the "core indexing step."',
      'Treating stop word removal as mandatory — the lecture says "we may omit... or not."',
    ],
    professorFocus: [
      'Why the inverted index is "the key data structure underlying modern IR."',
      'Why postings must be sorted by docID (it enables fast merging later).',
      'The four text-processing steps and one example for each.',
    ],
    keywordsToMemorize: ['inverted index', 'docID', 'postings list', 'dictionary', 'tokenization', 'stemming', 'stop words'],
    lastMinuteRevision: [
      'Inverted index = word → list of documents (not document → list of words).',
      'Pipeline: Tokenizer → Linguistic modules → Indexer.',
      'Text processing: cut it (tokenize), match it (normalize), root it (stem), maybe drop it (stop words).',
      'Postings are always sorted by docID.',
    ],
  },
  {
    id: 'query-processing-section',
    title: 'Query Processing',
    quickSummary:
      'Boolean AND queries are answered by merging (intersecting) two sorted postings lists in O(x+y) time. For multi-term AND queries, processing terms in order of increasing document frequency (smallest list first) minimizes work.',
    importantConcepts: [
      'The merge algorithm for AND queries',
      'Why sorted postings enable O(x+y) merging',
      'Query optimization by document frequency',
    ],
    commonMistakes: [
      'Forgetting that the O(x+y) efficiency depends entirely on postings being sorted by docID.',
      'Not processing the smallest postings list first when optimizing multi-term AND queries.',
    ],
    professorFocus: [
      'The two-pointer walk-through of the merge algorithm.',
      'The (Calpurnia AND Brutus) AND Caesar reordering example.',
    ],
    keywordsToMemorize: ['merge', 'O(x+y)', 'sorted postings', 'document frequency', 'query optimization'],
    lastMinuteRevision: [
      'Merge = walk two sorted lists with two pointers, keep matches.',
      'O(x+y) time, crucially depends on sorted-by-docID postings.',
      'Always AND starting with the smallest postings list.',
    ],
  },
  {
    id: 'boolean-model-section',
    title: 'The Boolean Retrieval Model',
    quickSummary:
      'Boolean retrieval answers queries built from AND/OR/NOT with a precise match/no-match per document. It was the dominant commercial model for three decades and still powers systems like email, library catalogs, macOS Spotlight, and WestLaw (legal search), even though it lacks any notion of ranking.',
    importantConcepts: [
      'Definition and precision of the Boolean model',
      'Real systems using Boolean search',
      'WestLaw example with proximity operators',
      'General merges (AND NOT, OR NOT, arbitrary Boolean formulas)',
    ],
    commonMistakes: [
      'Assuming SPACE always means AND — in WestLaw-style queries, SPACE means OR (disjunction).',
      'Assuming Boolean search is obsolete — professionals still prefer it for its precision.',
    ],
    professorFocus: [
      'The definition: "views each document as a set of words" and "is precise: document matches condition or not."',
      'The WestLaw proximity operator examples (/3, /S, /P).',
    ],
    keywordsToMemorize: ['Boolean query', 'AND OR NOT', 'exact match', 'WestLaw', 'proximity operators'],
    lastMinuteRevision: [
      'Boolean retrieval = exact match/no-match, no ranking.',
      'Primary commercial tool for 3 decades; still used in email, library catalogs, Spotlight, WestLaw.',
      'In WestLaw queries: SPACE = OR, not AND.',
    ],
  },
  {
    id: 'phrase-positional-section',
    title: 'Phrase Queries & Positional Indexes',
    quickSummary:
      'Phrase queries require exact word order. Biword indexes were a first attempt (fast for two-word phrases, but prone to false positives and index blowup). Positional indexes — which store exact word positions — are the standard solution today, also enabling proximity queries, at the cost of roughly 2–4x more storage.',
    importantConcepts: [
      'Phrase queries',
      'Biword indexes and extended biwords',
      'Positional indexes',
      'Proximity queries',
      'Positional index size / rules of thumb',
      'Combination schemes',
    ],
    commonMistakes: [
      'Thinking biword indexes can handle proximity queries — they cannot; only positional indexes can.',
      'Forgetting that longer phrases via biwords can produce false positives (no direct doc verification).',
    ],
    professorFocus: [
      'Why positional indexes became the standard despite the storage cost.',
      'The distinction between phrase queries (exact order) and proximity queries ("/k" words apart).',
    ],
    keywordsToMemorize: ['phrase query', 'biword index', 'positional index', 'proximity query', '2-4x storage'],
    lastMinuteRevision: [
      'Phrase query = exact word order required.',
      'Biword index = fast but false positives + index blowup; no proximity support.',
      'Positional index = stores exact positions; standard solution; ~2–4x larger; supports proximity.',
    ],
  },
  {
    id: 'structured-section',
    title: 'Structured vs. Unstructured Data',
    quickSummary:
      'Structured data lives in tables and supports exact/range queries; unstructured (free text) data supports keyword and concept queries. Almost no data is truly unstructured — hidden zones (like Title/Bullets) enable semi-structured search. This section also introduces the move beyond Boolean toward ranked retrieval using evidence like term frequency.',
    importantConcepts: [
      'Structured vs. unstructured data',
      'Semi-structured data (zones, wildcard search)',
      'Evidence accumulation and ranking search results',
    ],
    commonMistakes: [
      'Assuming text documents are fully unstructured — most have identifiable zones (Title, Author, Body).',
      'Assuming Boolean retrieval already ranks results — it only includes or excludes documents.',
    ],
    professorFocus: [
      'The Employee/Manager/Salary table example for structured queries.',
      'The open questions raised about semi-structured search: how to process "about," how to rank results.',
    ],
    keywordsToMemorize: ['structured data', 'unstructured data', 'semi-structured data', 'zones', 'term frequency', 'ranking'],
    lastMinuteRevision: [
      'Structured = tables + exact/range queries. Unstructured = free text + keyword/concept queries.',
      'Semi-structured = zones within text (e.g., Title, Bullets) enable more precise search.',
      'Ranking needs term frequency + proximity — this is where the course heads next.',
    ],
  },
]
