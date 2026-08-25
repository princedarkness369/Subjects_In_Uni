import { Concept } from '../types'

export const SECTIONS = [
  'Foundations of IR',
  'Term–Document Matrices',
  'The Inverted Index',
  'Query Processing',
  'The Boolean Retrieval Model',
  'Phrase Queries & Positional Indexes',
  'Structured vs. Unstructured Data',
] as const

export const concepts: Concept[] = [
  {
    id: 'information-retrieval',
    section: 'Foundations of IR',
    name: 'Information Retrieval (IR)',
    definition:
      'Information Retrieval (IR) is finding material (usually documents) of an unstructured nature (usually text) that satisfies an information need from within large collections (usually stored on computers).',
    simpleExplanation:
      'IR is the science of helping someone find the right documents out of a huge pile, based on what they actually need to know.',
    whyImportant:
      'It is the foundation of web search and almost every "search box" you use daily.',
    mainGoal:
      'Satisfy a user\'s information need by retrieving relevant material from a large collection.',
    examples: ['Web search', 'E-mail search', 'Searching your laptop', 'Corporate knowledge bases', 'Legal information retrieval'],
    notes: [
      'The search box has become the preferred method of information access, even for data that used to live only in databases.',
    ],
    keywords: ['information need', 'unstructured text', 'large collections', 'search'],
    memoryTrick: 'IR = "I need info, Retrieve it" — from a big messy pile of text.',
    importance: 5,
  },
  {
    id: 'ir-basic-assumptions',
    section: 'Foundations of IR',
    name: 'Basic Assumptions of IR',
    definition:
      'IR assumes a Collection (a set of documents, treated as static for the moment) and a Goal (retrieve documents relevant to the user\'s information need that help complete a task).',
    simpleExplanation:
      'Before building a search system, IR starts from two building blocks: a fixed pile of documents (the collection) and a purpose (help the user finish a task, not just match words).',
    whyImportant:
      'These two assumptions frame every technique that follows — indexing, ranking, and evaluation all exist to serve this goal.',
    mainGoal: 'Retrieve documents that are relevant and help the user complete their task.',
    examples: ['A static set of Shakespeare plays used as a collection in the lecture examples'],
    keywords: ['collection', 'static collection', 'relevance', 'task completion'],
    memoryTrick: 'Collection = the haystack. Goal = find the useful needles, not just any needle.',
    importance: 3,
  },
  {
    id: 'classic-search-model',
    section: 'Foundations of IR',
    name: 'The Classic Search Model',
    definition:
      'A pipeline that starts with a user task, becomes an information need, gets turned into a query, is run against a search engine over a collection, and produces results — with query refinement looping back in.',
    simpleExplanation:
      'You have a real-world task (e.g., "get rid of mice nicely"), which becomes an info need ("how to remove mice without killing them"), which you turn into a query ("how trap mice alive"). Each translation step can go wrong.',
    whyImportant:
      'It shows why search often fails: not because the engine is bad, but because the user\'s task got misunderstood (misconception) or the query poorly expresses the need (misformulation).',
    mainGoal: 'Trace how a real need is transformed into a searchable query, and back into useful results.',
    examples: [
      'Task: get rid of mice in a politically correct way → Info need: info about removing mice without killing them → Query: "how trap mice alive"',
    ],
    confusions: [
      'Students often assume the query IS the information need — the slide explicitly shows they can diverge (misconception, misformulation).',
    ],
    keywords: ['user task', 'information need', 'query', 'misconception', 'misformulation', 'query refinement'],
    memoryTrick: 'Task → Need → Query: each arrow is a place things can go wrong.',
    importance: 4,
  },
  {
    id: 'precision-recall',
    section: 'Foundations of IR',
    name: 'Precision and Recall',
    definition:
      'Precision is the fraction of retrieved documents that are relevant to the user\'s information need. Recall is the fraction of relevant documents in the collection that are actually retrieved.',
    simpleExplanation:
      'Precision asks "of what I gave you, how much was useful?" Recall asks "of everything useful that exists, how much did I actually find?"',
    whyImportant: 'These are the two basic ways the lecture introduces for judging how good the retrieved documents are.',
    mainGoal: 'Measure the quality of a set of retrieved documents.',
    examples: ['Precise definitions and measurements are noted as being covered later in the course.'],
    keywords: ['precision', 'recall', 'relevance', 'retrieved documents'],
    memoryTrick: 'PRecision = Precise about what you handed back. REcall = REmembering everything relevant that\'s out there.',
    importance: 5,
  },
  {
    id: 'term-document-matrix',
    section: 'Term–Document Matrices',
    name: 'Term-Document Incidence Matrix',
    definition:
      'A matrix where rows are terms and columns are documents (plays), with a 1 if the play contains the word and 0 otherwise.',
    simpleExplanation:
      'Imagine a big grid: one row per word, one column per document. You put a 1 wherever that word appears in that document, 0 otherwise.',
    whyImportant:
      'It is the first, most literal way to represent "which words appear in which documents" — and the starting point the lecture uses before showing why it doesn\'t scale.',
    mainGoal: 'Represent, for every term and every document, whether the term occurs in that document.',
    examples: ['Which plays of Shakespeare contain the words Brutus AND Caesar but NOT Calpurnia?'],
    disadvantages: ['Becomes extremely large and mostly empty (sparse) as the collection grows — see "Can\'t Build the Matrix".'],
    keywords: ['term-document matrix', 'incidence matrix', '0/1 matrix', 'Shakespeare example'],
    memoryTrick: 'Rows = words, Columns = documents, Cell = "is it in there? 1 or 0."',
    importance: 4,
  },
  {
    id: 'incidence-vectors',
    section: 'Term–Document Matrices',
    name: 'Incidence Vectors & Boolean AND via Bitwise Operations',
    definition:
      'Each term has a 0/1 vector (one bit per document). To answer a Boolean query, take the vectors for the relevant terms (complementing any NOT terms) and combine them with a bitwise AND.',
    simpleExplanation:
      'Each word gets its own row of 1s and 0s. To find documents with "Brutus AND Caesar but NOT Calpurnia," you flip Calpurnia\'s vector and AND all three rows together — matching positions of 1 are your answer.',
    whyImportant: 'It demonstrates, very concretely, how Boolean search can be computed using simple bit operations.',
    mainGoal: 'Answer a Boolean query by combining the incidence vectors of its terms.',
    examples: ['110100 AND 110111 AND 101111 = 100100 (Brutus AND Caesar AND NOT Calpurnia)'],
    keywords: ['incidence vector', 'bitwise AND', 'complement', 'Boolean query answer'],
    memoryTrick: 'Line up the bit-rows and AND straight down the column.',
    importance: 3,
  },
  {
    id: 'sparse-matrix-problem',
    section: 'Term–Document Matrices',
    name: "Why We Can't Build the Full Matrix (Bigger Collections)",
    definition:
      'For N = 1 million documents (~1000 words each, ~6 bytes/word) and M = 500K distinct terms, the full term-document matrix would be 500K × 1M — half a trillion cells — even though it has no more than one billion 1s, making it extremely sparse.',
    simpleExplanation:
      'With real-world numbers, the grid becomes gigantic (half a trillion cells) but almost all of it is 0. Storing the whole grid wastes enormous space for almost no information.',
    whyImportant: 'This sparsity problem is the direct motivation for inventing the inverted index — the next concept.',
    mainGoal: 'Show why a dense matrix representation is impractical at real scale, motivating a better representation.',
    examples: ['500K terms × 1M documents = 500 billion cells, but at most 1 billion are 1s'],
    disadvantages: ['Huge memory waste since the matrix is extremely sparse.'],
    confusions: ['"Bigger" doesn\'t just mean slower — the matrix becomes physically impossible to store in full.'],
    keywords: ['sparse matrix', 'scale', 'N documents', 'M terms', 'storage'],
    memoryTrick: 'Half a trillion cells, but only ~1 billion have anything in them — 99.8%+ empty space.',
    importance: 4,
  },
  {
    id: 'inverted-index',
    section: 'The Inverted Index',
    name: 'The Inverted Index',
    definition:
      'For each term t, store a list of all documents (identified by docID) that contain t. Described as "the key data structure underlying modern IR."',
    simpleExplanation:
      'Instead of a giant grid, just keep — for every word — a short list of which documents contain it. No need to record all the 0s.',
    whyImportant: 'This is explicitly called the key data structure underlying modern IR — everything else in the course builds on it.',
    mainGoal: 'Only record where a term DOES occur, instead of storing a value for every term/document pair.',
    examples: [
      'Brutus → 1, 2, 4, 11, 31, 45, 173, 174',
      'Caesar → 1, 2, 4, 5, 6, 16, 57, 132',
      'Calpurnia → 2, 31, 54, 101',
    ],
    advantages: ['Only records the 1 positions, avoiding the storage waste of a full sparse matrix.'],
    notes: ['Consists of a Dictionary (the terms) and Postings (the lists of docIDs, sorted by docID).'],
    confusions: ['Fixed-size arrays don\'t work well: what happens if the word Caesar is added to document 14? Lists need to grow.'],
    keywords: ['inverted index', 'docID', 'dictionary', 'postings list', 'postings'],
    memoryTrick: 'Instead of "document → words," it\'s "word → documents" — inverted!',
    importance: 5,
  },
  {
    id: 'postings-lists',
    section: 'The Inverted Index',
    name: 'Variable-Size Postings Lists',
    definition:
      'Because the number of documents containing a term varies and can grow, postings lists must be variable-size — implemented on disk as a continuous run of postings, or in memory as linked lists or variable-length arrays.',
    simpleExplanation:
      'You can\'t use a fixed-size list for each word\'s document list because it might need to grow (a new document could be added). So the storage structure needs to flex.',
    whyImportant: 'It solves the concrete problem raised right before it: fixed arrays fail when a term appears in a new document.',
    mainGoal: 'Store a growable list of docIDs per term efficiently.',
    advantages: [
      'Linked lists: dynamic space allocation, easy insertion of terms into documents.',
    ],
    disadvantages: ['Linked lists carry space overhead from pointers.'],
    examples: ['Postings are sorted by docID, which is needed for efficient merging (explained later).'],
    keywords: ['postings list', 'linked list', 'variable-length array', 'sorted by docID'],
    memoryTrick: 'Fixed-size shelf vs. an expandable list — postings need to expand.',
    importance: 3,
  },
  {
    id: 'index-construction',
    section: 'The Inverted Index',
    name: 'Inverted Index Construction Pipeline',
    definition:
      'Documents to be indexed pass through a Tokenizer (produces a token stream), then Linguistic modules (produce modified tokens, e.g., "friend," "roman," "countryman"), then an Indexer (builds the inverted index).',
    simpleExplanation:
      'Three stages: (1) chop the text into tokens, (2) clean/normalize each token linguistically, (3) build the index that maps each cleaned token to the documents it appears in.',
    whyImportant: 'This is the concrete assembly line that turns raw text into a searchable inverted index.',
    mainGoal: 'Convert raw documents into a queryable inverted index.',
    examples: ['"Friends, Romans, countrymen." → tokens: Friends, Romans, Countrymen → modified tokens: friend, roman, countryman'],
    keywords: ['tokenizer', 'linguistic modules', 'indexer', 'token stream', 'modified tokens'],
    memoryTrick: 'Tokenizer chops → Linguistic modules clean → Indexer files it away.',
    importance: 4,
  },
  {
    id: 'text-processing-steps',
    section: 'The Inverted Index',
    name: 'Initial Stages of Text Processing',
    definition:
      'Tokenization (cut character sequence into word tokens), Normalization (map text and query terms to the same form), Stemming (let different forms of a root match), and Stop words (optionally omit very common words).',
    simpleExplanation:
      'Before indexing, text is cleaned up in four ways: split into words, make equivalent forms match (like U.S.A. and USA), reduce words to their root (authorize/authorization), and optionally drop tiny common words like "the," "a," "to," "of."',
    whyImportant: 'Without this cleanup, a search for "USA" would miss documents containing "U.S.A.", and searches would be far less effective.',
    mainGoal: 'Prepare raw text so that matching terms are recognized as the same, even when written differently.',
    examples: [
      'Tokenization: handling "John\'s"',
      'Normalization: U.S.A. should match USA',
      'Stemming: authorize / authorization',
      'Stop words: the, a, to, of',
    ],
    confusions: ['Stop words are optional ("we may omit... or not") — not a mandatory step.'],
    keywords: ['tokenization', 'normalization', 'stemming', 'stop words'],
    memoryTrick: 'Cut it, match it, root it, (maybe) drop the tiny ones.',
    importance: 5,
  },
  {
    id: 'indexer-steps',
    section: 'The Inverted Index',
    name: 'Indexer Steps: Token Sequence → Sort → Dictionary & Postings',
    definition:
      'The indexer first builds a sequence of (Modified token, Document ID) pairs, then sorts them by term and then by docID (the core indexing step), then merges multiple entries in the same document and splits the result into a Dictionary and Postings, adding document frequency information.',
    simpleExplanation:
      'Step 1: list every (word, document) pair. Step 2: sort that giant list by word, then by document. Step 3: merge duplicates and split into a small Dictionary (terms + counts) and Postings (lists of docIDs), also noting how many documents each term appears in.',
    whyImportant: 'Sorting is called the "core indexing step" — it is what turns a scattered list into an organized, searchable structure.',
    mainGoal: 'Transform a raw stream of (term, document) pairs into an organized dictionary and postings structure.',
    examples: ['Doc 1: "I did enact Julius Caesar I was killed..." / Doc 2: "So let it be with Caesar. The noble Brutus..."'],
    notes: ['Document frequency information is added when splitting into Dictionary and Postings; its purpose is explained later (used for query optimization).'],
    keywords: ['token sequence', 'sorting', 'dictionary', 'postings', 'document frequency'],
    memoryTrick: 'Collect pairs → Sort them → Split into Dictionary (terms) + Postings (docIDs).',
    importance: 4,
  },
  {
    id: 'query-processing-and',
    section: 'Query Processing',
    name: 'Query Processing: AND (The Merge Algorithm)',
    definition:
      'To process "Brutus AND Caesar": locate Brutus in the dictionary and retrieve its postings, locate Caesar and retrieve its postings, then "merge" (intersect) the two postings lists.',
    simpleExplanation:
      'Look up each word\'s document list, then find which documents appear in BOTH lists — that intersection is your answer.',
    whyImportant: 'This merge algorithm is the core operation that makes Boolean AND queries fast.',
    mainGoal: 'Efficiently find the documents common to two (or more) postings lists.',
    examples: ['Brutus: 2,4,8,16,32,64,128 | Caesar: 1,2,3,5,8,13,21,34 → merge to find common docIDs'],
    keywords: ['AND query', 'merge', 'intersect', 'postings retrieval'],
    memoryTrick: 'AND = intersection = "walk both lists, keep only what matches."',
    importance: 5,
  },
  {
    id: 'the-merge',
    section: 'Query Processing',
    name: 'The Merge (Linear-Time Intersection)',
    definition:
      'Walking through two postings lists simultaneously (since both are sorted by docID) lets you intersect them in time linear in the total number of postings entries: O(x+y) for lists of length x and y.',
    simpleExplanation:
      'Because both lists are sorted, you can walk them like two sorted queues with two pointers, moving forward and only recording matches — no need to search back and forth.',
    whyImportant: 'It is crucial that postings are sorted by docID — this is exactly what makes O(x+y) merging possible.',
    mainGoal: 'Intersect two postings lists as efficiently as possible.',
    examples: ['Brutus: 2,4,8,16,32,64,128 and Caesar: 1,2,3,5,8,13,21,34 → matches at 2 and 8'],
    confusions: ['"Linear" here means linear in the combined size of the postings lists (x+y), not in the size of the whole collection.'],
    keywords: ['O(x+y)', 'linear time', 'sorted postings', 'two-pointer merge'],
    memoryTrick: 'Two sorted lists + two pointers = one fast pass, no backtracking.',
    importance: 5,
  },
  {
    id: 'boolean-retrieval-model',
    section: 'The Boolean Retrieval Model',
    name: 'The Boolean Retrieval Model',
    definition:
      'A retrieval model where the query is a Boolean expression using AND, OR, and NOT to join query terms; each document is viewed as a set of words, and the model is precise — a document either matches the condition or it does not.',
    simpleExplanation:
      'You search using AND/OR/NOT like a logic formula, and for every document the answer is a clean yes-or-no: it matches or it doesn\'t. No partial credit, no ranking.',
    whyImportant:
      'It was the primary commercial retrieval tool for three decades, and many systems you still use today are Boolean.',
    mainGoal: 'Give an exact, unambiguous match/no-match answer to a logical query.',
    advantages: ['Perhaps the simplest model to build an IR system on.', 'Precise: you know exactly what you are getting.'],
    examples: ['Email search', 'Library catalog', 'macOS Spotlight'],
    keywords: ['Boolean query', 'AND OR NOT', 'exact match', 'set of words'],
    memoryTrick: 'Boolean = black-and-white search: a document is either IN or OUT, never "sort of."',
    importance: 5,
  },
  {
    id: 'westlaw-example',
    section: 'The Boolean Retrieval Model',
    name: 'WestLaw: A Real Boolean Search System',
    definition:
      'WestLaw is described as the largest commercial (paying subscribers) legal search service (started 1975; ranking added 1992; federated search added 2010), with tens of terabytes of data and about 700,000 users, where the majority still use Boolean queries with proximity operators.',
    simpleExplanation:
      'A real, large, professional legal search engine where trained users still prefer writing precise Boolean queries with operators like "/3" (within 3 words) and "/S" (same sentence), because they want to know exactly what they\'re getting.',
    whyImportant: 'It shows Boolean search is not just historical trivia — professionals still choose it deliberately for its precision.',
    mainGoal: 'Illustrate a professional, large-scale use of Boolean search with proximity operators.',
    examples: [
      'LIMIT! /3 STATUTE ACTION /S FEDERAL /2 TORT /3 CLAIM',
      'disabl! /p access! /s work-site work-place (employment /3 place)',
    ],
    notes: [
      'In these query examples, SPACE between terms means disjunction (OR), not conjunction (AND) — a common point of confusion.',
      'Many professional searchers still prefer Boolean search because "you know exactly what you are getting" — though the slide notes that doesn\'t mean it works better.',
    ],
    confusions: ['SPACE is disjunction (OR), not conjunction (AND), in WestLaw-style queries.'],
    keywords: ['WestLaw', 'proximity operators', '/3', '/S', 'legal search'],
    memoryTrick: 'WestLaw = lawyers who love logic — precise Boolean + proximity operators.',
    importance: 3,
  },
  {
    id: 'general-merges',
    section: 'The Boolean Retrieval Model',
    name: 'More General Merges (AND NOT, OR NOT, Arbitrary Boolean Formulas)',
    definition:
      'The basic merge idea can be adapted to queries like "Brutus AND NOT Caesar" or "Brutus OR NOT Caesar," and even to arbitrary Boolean formulas like "(Brutus OR Caesar) AND NOT (Antony OR Cleopatra)."',
    simpleExplanation:
      'The two-pointer merge trick extends beyond simple AND to more complex combinations of AND/OR/NOT — the lecture poses this as an exercise: can it still be done in linear time?',
    whyImportant: 'It pushes students to think about whether the efficient merge idea generalizes, not just memorize the simple AND case.',
    mainGoal: 'Explore whether arbitrary Boolean formulas can still be merged efficiently.',
    examples: ['Brutus AND NOT Caesar', 'Brutus OR NOT Caesar', '(Brutus OR Caesar) AND NOT (Antony OR Cleopatra)'],
    confusions: ['"Linear time" needs to be linear in something specific — the slide explicitly asks "Linear in what?"'],
    keywords: ['AND NOT', 'OR NOT', 'Boolean formula', 'linear time merge'],
    memoryTrick: 'Same two-pointer trick, just with trickier logic glued on top.',
    importance: 3,
  },
  {
    id: 'query-optimization',
    section: 'The Boolean Retrieval Model',
    name: 'Query Optimization (Processing Order)',
    definition:
      'For a query that is an AND of several terms, process terms in order of increasing document frequency — start with the smallest postings list, then keep cutting it down with the next smallest.',
    simpleExplanation:
      'If you must AND multiple terms together, start with the rarest word first (smallest list), because intersecting with a small list quickly shrinks your candidate set.',
    whyImportant: 'This is exactly why document frequency was kept in the dictionary earlier — it directly enables this optimization.',
    mainGoal: 'Minimize the total work done while merging postings for a multi-term AND query.',
    examples: [
      'Query: Brutus AND Calpurnia AND Caesar → execute as (Calpurnia AND Brutus) AND Caesar, since Calpurnia has the smallest postings list',
      '(tangerine OR trees) AND (marmalade OR skies) AND (kaleidoscope OR eyes) — decide which two OR-groups to process first',
    ],
    notes: [
      'For queries mixing AND and OR, estimate each OR group\'s size by the (conservative) sum of its terms\' document frequencies, then process in increasing order of those OR sizes.',
    ],
    keywords: ['document frequency', 'increasing frequency order', 'query optimization', 'smallest set first'],
    memoryTrick: 'Smallest list first — it prunes the most, the fastest.',
    importance: 4,
  },
  {
    id: 'phrase-queries',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Phrase Queries',
    definition:
      'Queries that must match an exact sequence of words, such as "stanford university" as a phrase — so "I went to university at Stanford" is NOT a match.',
    simpleExplanation:
      'A phrase query cares about word order and adjacency, not just whether both words appear somewhere in the document.',
    whyImportant:
      'Phrase queries are called "one of the few \'advanced search\' ideas that works" and are easily understood by users — many queries are implicit phrase queries.',
    mainGoal: 'Match documents containing an exact word sequence, not just the individual words.',
    examples: ['"stanford university" should NOT match "I went to university at Stanford"'],
    disadvantages: ['A plain <term : docs> inverted index is no longer enough to answer these — more structure is needed.'],
    keywords: ['phrase query', 'exact sequence', 'implicit phrase queries'],
    memoryTrick: 'Phrase queries care about ORDER, not just presence.',
    importance: 4,
  },
  {
    id: 'biword-indexes',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Biword Indexes',
    definition:
      'Index every consecutive pair of terms in the text as a dictionary term (a "biword"). For example, "Friends, Romans, Countrymen" generates the biwords "friends romans" and "romans countrymen."',
    simpleExplanation:
      'Instead of indexing single words, you index pairs of adjacent words as if they were one term, which makes two-word phrase lookups instant.',
    whyImportant: 'It is described as "a first attempt" at solving phrase queries — simple, but with real limitations covered next.',
    mainGoal: 'Allow immediate processing of two-word phrase queries by treating word pairs as index terms.',
    advantages: ['Two-word phrase query processing becomes immediate.'],
    disadvantages: [
      'Longer phrases need to be broken into an AND of biwords, which can produce false positives.',
      'Index blowup from a much bigger dictionary.',
      'Infeasible for more than biwords, and big even just for biwords.',
    ],
    examples: [
      '"Friends, Romans, Countrymen" → biwords: "friends romans", "romans countrymen"',
      '"stanford university palo alto" → "stanford university" AND "university palo" AND "palo alto" (can produce false positives)',
    ],
    notes: ['Biword indexes are not the standard solution alone, but can be part of a compound strategy.'],
    keywords: ['biword', 'consecutive term pairs', 'false positives', 'index blowup'],
    memoryTrick: 'Biword = treat "word1 word2" as a single dictionary entry.',
    importance: 3,
  },
  {
    id: 'extended-biwords',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Extended Biwords',
    definition:
      'Parse indexed text with part-of-speech tagging (POST), bucket terms into Nouns (N) and articles/prepositions (X), and call any string of the form NX*N an "extended biword," which becomes a dictionary term.',
    simpleExplanation:
      'Instead of just adjacent word pairs, you allow a noun, then any number of little connector words, then another noun, to count as one indexed unit — like "catcher in the rye" (N X X N) becomes the term "catcher rye."',
    whyImportant: 'It generalizes plain biwords to handle short phrases with small connector words in the middle, still using dictionary lookups.',
    mainGoal: 'Capture short noun-phrase-like sequences as single index terms, even with words in between.',
    examples: ['"catcher in the rye" tagged N X X N → extended biword "catcher rye"'],
    keywords: ['part-of-speech tagging', 'POST', 'NX*N pattern', 'nouns and articles'],
    memoryTrick: 'Noun ... (little words) ... Noun = one extended biword term.',
    importance: 2,
  },
  {
    id: 'positional-indexes',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Positional Indexes',
    definition:
      'For each term, the postings store the position(s) within each document where the term occurs: <term, number of docs containing term; doc1: position1, position2, ...; doc2: ...; etc.>',
    simpleExplanation:
      'Instead of just saying "this word is in document 4," a positional index says exactly where in document 4 — e.g., word #17, #191, #291. This lets you check whether words are next to each other.',
    whyImportant:
      'It is the standard solution used today because of the power and usefulness of phrase and proximity queries, whether used explicitly or implicitly inside ranked retrieval systems.',
    mainGoal: 'Store enough information to answer phrase and proximity queries, not just single-term presence.',
    examples: ['<be: 993427; 1: 7,18,33,72,86,231; 2: 3,149; 4: 17,191,291,430,434; ...>'],
    disadvantages: ['Expands postings storage substantially compared to a non-positional index.'],
    notes: [
      'For phrase queries, a merge algorithm is applied recursively at the document level, now needing to check adjacency, not just equality.',
    ],
    keywords: ['positional index', 'word position', 'doc:position lists', 'adjacency check'],
    memoryTrick: 'Not just "which document," but "which exact spot in the document."',
    importance: 5,
  },
  {
    id: 'processing-phrase-query',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Processing a Phrase Query',
    definition:
      'Extract inverted index entries for each distinct term in the phrase, then merge their doc:position lists to enumerate all positions where the full phrase occurs — the same general method extends to proximity searches.',
    simpleExplanation:
      'To find "to be or not to be," pull up the position lists for "to," "be," "or," "not," then check where their positions line up consecutively across a document.',
    whyImportant: 'It is the concrete algorithm that makes positional indexes actually answer phrase queries.',
    mainGoal: 'Find all locations where an exact multi-word phrase occurs, using positional postings.',
    examples: [
      'to: 2:1,17,74,222,551; 4:8,16,190,429,433; ...',
      'be: 1:17,19; 4:17,191,291,430,434; ...',
    ],
    keywords: ['position list merge', 'phrase enumeration', 'proximity searches'],
    memoryTrick: 'Line up each word\'s positions and check for "back-to-back" matches.',
    importance: 4,
  },
  {
    id: 'proximity-queries',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Proximity Queries',
    definition:
      'Queries like "LIMIT! /3 STATUTE /3 FEDERAL /2 TORT," where "/k" means "within k words of." Positional indexes can support such queries; biword indexes cannot.',
    simpleExplanation:
      'Instead of requiring words to be exactly adjacent (like a phrase), proximity queries just require them to be within some number of words of each other.',
    whyImportant: 'It is explicitly stated that positional indexes can handle these while biword indexes cannot — a key differentiator between the two techniques.',
    mainGoal: 'Match documents where specified terms occur near each other, within a given word distance.',
    examples: ['LIMIT! /3 STATUTE /3 FEDERAL /2 TORT (from the WestLaw example)'],
    confusions: ['Adapting the linear merge to work for proximity queries "for any value of k" is noted as tricky to do correctly and efficiently.'],
    keywords: ['proximity query', '/k operator', 'within k words'],
    memoryTrick: 'Phrase = must be right next to each other. Proximity = must be "close enough" (within k words).',
    importance: 3,
  },
  {
    id: 'positional-index-size',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Positional Index Size & Rules of Thumb',
    definition:
      'A positional index needs an entry for each occurrence of a term (not just once per document), so its size depends on average document size. As a rule of thumb, a positional index is 2–4 times as large as a non-positional index, and about 35–50% of the volume of the original text — this holds for "English-like" languages.',
    simpleExplanation:
      'Because you\'re storing every occurrence and its position, positional indexes take noticeably more space than simple ones — but the trade-off is worth it for phrase/proximity search power.',
    whyImportant: 'It quantifies the storage cost of the positional index technique, so students understand the trade-off, not just the benefit.',
    mainGoal: 'Give a practical estimate of how much extra storage a positional index requires.',
    examples: [
      'Average web page: <1000 terms',
      'SEC filings, books, some epic poems: easily 100,000 terms',
      'A term with frequency 0.1% in a 1000-term doc appears ~1 time; in a 100,000-term doc appears ~100 times',
    ],
    disadvantages: ['2–4x larger than a non-positional index; roughly 35–50% of the size of the original text.'],
    keywords: ['index size', '2-4x larger', '35-50% of text volume', 'rules of thumb'],
    memoryTrick: '2–4x bigger, ~35–50% of the original text\'s size — the price of knowing exact positions.',
    importance: 3,
  },
  {
    id: 'combination-schemes',
    section: 'Phrase Queries & Positional Indexes',
    name: 'Combination Schemes (Biword + Positional)',
    definition:
      'Biword and positional approaches can be profitably combined. For frequent phrases (e.g., "Michael Jackson," "Britney Spears," "The Who"), continually merging positional postings is inefficient, so a mixed indexing scheme can help.',
    simpleExplanation:
      'For extremely common phrases, it\'s wasteful to always merge full positional lists — mixing in some biword-style shortcuts for those specific phrases speeds things up.',
    whyImportant: 'It shows that real systems don\'t have to pick just one technique — practical IR systems mix strategies for efficiency.',
    mainGoal: 'Combine biword and positional indexing to gain speed without paying the full storage cost of positional indexing alone.',
    examples: [
      'A typical web query mixture (Williams et al., 2004) ran in about 1/4 of the time of using just a positional index.',
    ],
    disadvantages: ['This mixed scheme required 26% more space than having a positional index alone.'],
    keywords: ['mixed indexing scheme', 'Williams et al. 2004', 'biword + positional'],
    memoryTrick: 'Faster query time (1/4 the time), but a bit more space (+26%) — a speed/space trade-off.',
    importance: 2,
  },
  {
    id: 'evidence-accumulation-ranking',
    section: 'Structured vs. Unstructured Data',
    name: 'Evidence Accumulation & Ranking Search Results',
    definition:
      'Beyond pure term search, IR systems can accumulate evidence (e.g., more occurrences of a search term usually seems better, needing term frequency information) and rank/group results rather than just including/excluding documents, measuring proximity from the query to each document.',
    simpleExplanation:
      'Boolean search only tells you yes/no. Ranking goes further: it asks "how strongly does each document match?" — using clues like how many times a term appears — so results can be sorted best-to-worst instead of just listed.',
    whyImportant:
      'This is presented as "what\'s ahead" beyond the Boolean model — the motivation for ranked retrieval, which the course builds toward.',
    mainGoal: 'Move beyond strict inclusion/exclusion toward ranking documents by how well they match the query.',
    examples: ['1 vs. 0 occurrences of a term, 2 vs. 1, 3 vs. 2, etc. — usually more occurrences seems better'],
    disadvantages: ['Boolean queries alone only give inclusion or exclusion — no sense of "how relevant."'],
    keywords: ['term frequency', 'ranking', 'evidence accumulation', 'grouping results'],
    memoryTrick: 'Boolean = in or out. Ranking = how good a match, from best to worst.',
    importance: 4,
  },
  {
    id: 'structured-vs-unstructured-data',
    section: 'Structured vs. Unstructured Data',
    name: 'Structured vs. Unstructured Data',
    definition:
      'Structured data refers to information in "tables" that typically allows numerical range and exact-match queries (e.g., Salary < 60000 AND Manager = Smith). Unstructured data typically refers to free text, allowing keyword queries and more sophisticated "concept" queries.',
    simpleExplanation:
      'Structured data lives in neat tables with rows/columns (like a spreadsheet) and you query it with exact conditions. Unstructured data is free-flowing text (like an essay), so you search it with keywords or concepts instead of exact matches.',
    whyImportant: 'This is the classic distinction between database querying and text (IR) querying — it also sets up the idea of semi-structured data.',
    mainGoal: 'Distinguish the two fundamentally different kinds of data IR and databases are built to search.',
    examples: [
      'Structured: an Employee/Manager/Salary table queried with "Salary < 60000 AND Manager = Smith"',
      'Unstructured: "find all web pages dealing with drug abuse"',
    ],
    keywords: ['structured data', 'unstructured data', 'tables', 'free text', 'keyword queries'],
    memoryTrick: 'Structured = spreadsheet with exact filters. Unstructured = plain text with keyword search.',
    importance: 5,
  },
  {
    id: 'semi-structured-data',
    section: 'Structured vs. Unstructured Data',
    name: 'Semi-Structured Data',
    definition:
      'Almost no data is truly "unstructured" — e.g., a slide has distinctly identified zones like Title and Bullets. This structure enables semi-structured search, such as "Title contains data AND Bullets contain search," or even wildcard author searches like "Author ~ stro*rup."',
    simpleExplanation:
      'Real documents usually have some structure hiding inside them (titles, sections, authors), even if they\'re mostly free text. Semi-structured search lets you combine that structure with regular text search.',
    whyImportant: 'It bridges structured (database) and unstructured (text) search, and is noted as the focus of XML search later in the course.',
    mainGoal: 'Exploit partial document structure (zones like Title/Author/Body) to make text search more precise.',
    examples: [
      'Title contains data AND Bullets contain search',
      'Title is about Object Oriented Programming AND Author ~ stro*rup (where * is a wildcard)',
    ],
    notes: [
      'Open issues raised: how do you process a fuzzy concept like "about"? How do you rank the results?',
      'This is the focus of XML search, covered later in the course.',
    ],
    keywords: ['semi-structured data', 'zones', 'title/author/body', 'wildcard operator', 'XML search'],
    memoryTrick: 'Almost nothing is purely unstructured — even a slide has a Title zone and a Bullets zone.',
    importance: 3,
  },
]

export const getConceptById = (id: string) => concepts.find((c) => c.id === id)
export const getConceptsBySection = (section: string) => concepts.filter((c) => c.section === section)
