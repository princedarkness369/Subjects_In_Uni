/* ======================================================================
   QUESTION BANK — Lecture 6: Scoring, Term Weighting and the Vector Space Model
   Every question, option and explanation is derived ONLY from the uploaded
   lecture slides (IIR Sections 6.2–6.4.3).
   difficulty: "easy" | "medium" | "hard"
   answer: index (0-3) of the correct option in the ORIGINAL order below
   ====================================================================== */

const QUESTION_BANK = [

/* ---------------------------------------------------------------------
   TOPIC: Ranked Retrieval vs Boolean Retrieval / Feast or Famine
--------------------------------------------------------------------- */
{
  topic: "Ranked Retrieval vs Boolean",
  difficulty: "easy",
  question: "According to the lecture, why is pure Boolean retrieval not good for most users?",
  options: [
    "Most users cannot easily write precise Boolean queries and don't want to wade through thousands of results",
    "Boolean retrieval cannot be implemented efficiently on large collections",
    "Boolean queries always return zero results",
    "Boolean retrieval cannot use an inverted index"
  ],
  answer: 0,
  explanation: "The lecture states most users are incapable of (or unwilling to do the work of) writing precise Boolean queries, and most don't want to wade through 1000s of results — this is especially true for web search. It is not about efficiency, always returning zero hits, or the inverted index."
},
{
  topic: "Ranked Retrieval vs Boolean",
  difficulty: "easy",
  question: "Boolean retrieval works well for which group, according to the lecture?",
  options: [
    "Expert users with a precise understanding of their needs and the collection, and applications that can consume 1000s of results",
    "Casual users who type one or two keywords",
    "Users who want the results automatically ranked by relevance",
    "Users searching the open web"
  ],
  answer: 0,
  explanation: "The slides say Boolean is good for expert users with precise understanding of their needs/collection, and for applications that can easily consume 1000s of results. Casual/web users are exactly who Boolean serves poorly, and ranking is the alternative model, not a strength of Boolean."
},
{
  topic: "Feast or Famine",
  difficulty: "medium",
  question: "The 'feast or famine' problem describes which weakness of Boolean search?",
  options: [
    "Boolean queries tend to produce either far too many hits (AND/OR yielding thousands) or zero hits",
    "Boolean search always returns exactly the right number of documents",
    "Boolean search cannot rank documents by term frequency",
    "Boolean search is slower than ranked retrieval"
  ],
  answer: 0,
  explanation: "The lecture's example shows one query returning 200,000 hits and a slightly modified query returning 0 hits — illustrating that AND tends to give too few results and OR too many, with little middle ground. This is a result-set-size problem, not a speed or TF-ranking issue."
},
{
  topic: "Feast or Famine",
  difficulty: "medium",
  question: "Why does the 'feast or famine' problem disappear in ranked retrieval?",
  options: [
    "The system simply shows the top k (≈10) results, so a large result set is no longer an issue, as long as the ranking algorithm works",
    "Ranked retrieval never returns large result sets because it uses AND logic",
    "Ranked retrieval eliminates the need for an index",
    "Ranked systems always return exactly one document"
  ],
  answer: 0,
  explanation: "The lecture explicitly says: when the system produces a ranked result set, large result sets are not an issue — the size of the result set doesn't matter because we just show the top k results, on the premise that the ranking algorithm works well."
},
{
  topic: "Ranked Retrieval Models",
  difficulty: "easy",
  question: "In ranked retrieval, what does the system return for a query?",
  options: [
    "An ordering over the top documents in the collection with respect to the query",
    "A single Boolean yes/no answer",
    "A random sample of matching documents",
    "Only documents that satisfy every query term"
  ],
  answer: 0,
  explanation: "Ranked retrieval returns an ordering over the (top) documents rather than a set of documents that strictly satisfy a query expression, which is what Boolean retrieval does."
},
{
  topic: "Ranked Retrieval Models",
  difficulty: "medium",
  question: "What is a 'free text query' as described in the lecture?",
  options: [
    "A query that is simply one or more words in a human language, without Boolean operators or a formal query language",
    "A query that is completely free of any indexing cost",
    "A query that must contain only rare terms",
    "A query that returns results for free (no cost)"
  ],
  answer: 0,
  explanation: "The lecture contrasts free text queries with Boolean queries: rather than a language of operators/expressions, the user's query is just one or more words in natural language."
},
{
  topic: "Ranked Retrieval Models",
  difficulty: "hard",
  question: "According to the lecture, what is the relationship between 'ranked retrieval' and 'free text queries' as two design choices?",
  options: [
    "In principle they are two separate choices, but in practice ranked retrieval has normally been associated with free text queries and vice versa",
    "They are the exact same concept with two different names",
    "Ranked retrieval requires Boolean query syntax and cannot use free text",
    "Free text queries can only be used with Boolean retrieval"
  ],
  answer: 0,
  explanation: "The slides explicitly note these are, in principle, two independent design decisions (query style vs. result presentation), but in practice they are usually paired together."
},

/* ---------------------------------------------------------------------
   TOPIC: Scoring documents
--------------------------------------------------------------------- */
{
  topic: "Scoring Documents",
  difficulty: "easy",
  question: "What is the purpose of assigning a score (e.g., in [0,1]) to a document with respect to a query?",
  options: [
    "To measure how well the document and query 'match', enabling documents to be ranked in order of likely usefulness",
    "To determine whether the document should be deleted from the index",
    "To compress the document for storage",
    "To count the total number of documents in the collection"
  ],
  answer: 0,
  explanation: "The lecture frames scoring as the basis of ranked retrieval: we want to return documents in order of likely usefulness, so we assign each document a score that measures how well it matches the query, then rank by that score."
},
{
  topic: "Scoring Documents",
  difficulty: "medium",
  question: "Which statement about document scoring in the lecture is TRUE?",
  options: [
    "We wish to rank-order documents with respect to a query by assigning each a score measuring query-document match",
    "Scores are only assigned to documents that satisfy a Boolean AND of all query terms",
    "The score of a document is independent of the query",
    "Only documents with a score of exactly 1 are ever shown to the user"
  ],
  answer: 0,
  explanation: "Scoring exists precisely to rank-order documents by match quality; it is query-dependent (a different query changes the score) and is not restricted to documents satisfying strict Boolean AND."
},

/* ---------------------------------------------------------------------
   TOPIC: Jaccard coefficient
--------------------------------------------------------------------- */
{
  topic: "Jaccard Coefficient",
  difficulty: "easy",
  question: "How is the Jaccard coefficient of two sets A and B defined?",
  options: [
    "|A ∩ B| / |A ∪ B|",
    "|A ∩ B| / |A|",
    "|A ∪ B| / |A ∩ B|",
    "|A| + |B|"
  ],
  answer: 0,
  explanation: "The lecture gives jaccard(A,B) = |A ∩ B| / |A ∪ B| — the size of the intersection divided by the size of the union."
},
{
  topic: "Jaccard Coefficient",
  difficulty: "easy",
  question: "According to the lecture, what value does jaccard(A,A) always equal?",
  options: [
    "1",
    "0",
    "0.5",
    "It depends on the size of A"
  ],
  answer: 0,
  explanation: "The slide states jaccard(A,A) = 1, since the intersection and union of a set with itself are both A, giving a ratio of 1 regardless of set size."
},
{
  topic: "Jaccard Coefficient",
  difficulty: "medium",
  question: "Which of the following properties of the Jaccard coefficient is stated in the lecture?",
  options: [
    "A and B do not have to be the same size, and the coefficient always lies between 0 and 1",
    "A and B must have the same number of elements for Jaccard to be defined",
    "Jaccard can return negative values for very dissimilar sets",
    "Jaccard requires the sets to be ordered vectors, not sets"
  ],
  answer: 0,
  explanation: "The slide explicitly says A and B don't have to be the same size, and Jaccard always assigns a number between 0 and 1. It never produces negative values and works on unordered sets."
},
{
  topic: "Jaccard Coefficient",
  difficulty: "medium",
  question: "For the query 'ides of march', which document would the Jaccard coefficient (as a set-overlap measure) treat as having some non-zero overlap, based on the lecture's example documents 'caesar died in march' and 'the long march'?",
  options: [
    "Both documents overlap with the query only through the shared term 'march'",
    "Only 'caesar died in march' shares any term with the query",
    "Only 'the long march' shares any term with the query",
    "Neither document shares any term with the query"
  ],
  answer: 0,
  explanation: "Both example documents contain the word 'march', which also appears in the query 'ides of march', so both intersect the query set through that one shared term — illustrating that Jaccard treats this overlap identically for both documents despite their different lengths and content."
},
{
  topic: "Limitations of Jaccard",
  difficulty: "medium",
  question: "Why is the Jaccard coefficient considered a poor scoring function according to the lecture?",
  options: [
    "It doesn't consider term frequency, doesn't weight rare (more informative) terms higher, and needs a better way to normalize for length",
    "It is too computationally expensive to ever compute",
    "It can only be used with Boolean queries, never free text",
    "It always returns exactly 0 or 1, never intermediate values"
  ],
  answer: 0,
  explanation: "The lecture lists three issues: it doesn't consider how many times a term occurs in a document (term frequency), it ignores that rare terms are more informative, and it needs a more sophisticated length normalization. It is not restricted to Boolean queries nor limited to binary output."
},
{
  topic: "Limitations of Jaccard",
  difficulty: "hard",
  question: "A student claims: 'Jaccard is a bad scoring function mainly because it can exceed 1 for very similar documents.' What is wrong with this reasoning based on the lecture?",
  options: [
    "Jaccard always returns a value between 0 and 1, so it cannot exceed 1 — the real weaknesses are ignoring term frequency, rare-term importance, and proper length normalization",
    "The student is correct — Jaccard commonly exceeds 1",
    "Jaccard is a bad measure because it can be negative for dissimilar sets",
    "Jaccard is fine as-is and has no listed limitations"
  ],
  answer: 0,
  explanation: "This tests conceptual understanding versus memorized buzzwords. The lecture states Jaccard always assigns a value between 0 and 1 — it never exceeds 1. Its actual weaknesses are ignoring term frequency, not weighting rare terms more, and needing better length normalization."
},

/* ---------------------------------------------------------------------
   TOPIC: Binary incidence matrix / count matrix / bag of words
--------------------------------------------------------------------- */
{
  topic: "Binary Incidence Matrix",
  difficulty: "easy",
  question: "In the binary term-document incidence matrix, how is each document represented?",
  options: [
    "As a binary vector in {0,1}^|V|, where |V| is the vocabulary size",
    "As a real-valued vector of tf-idf weights",
    "As a single scalar score",
    "As an ordered list of positions where each term occurs"
  ],
  answer: 0,
  explanation: "The lecture recalls that each document is represented by a binary vector in {0,1}^|V| — one bit per vocabulary term indicating presence or absence, with no notion of frequency or weight."
},
{
  topic: "Count Matrix",
  difficulty: "easy",
  question: "How does the term-document count matrix differ from the binary incidence matrix?",
  options: [
    "Each document is a count vector in ℕ^V, recording the number of occurrences of each term rather than just presence/absence",
    "The count matrix is identical to the binary matrix but transposed",
    "The count matrix stores tf-idf weights instead of counts",
    "The count matrix only records the first occurrence position of each term"
  ],
  answer: 0,
  explanation: "The lecture moves from binary vectors to count vectors: each document becomes a column of natural-number counts (occurrences of each term), which is a step toward weighting schemes that use term frequency."
},
{
  topic: "Bag of Words Model",
  difficulty: "medium",
  question: "Why is the vector representation of documents called the 'bag of words' model, and what is its key limitation?",
  options: [
    "It doesn't consider word ordering, so 'John is quicker than Mary' and 'Mary is quicker than John' get the same vector, even though a positional index could distinguish them",
    "It stores words in a literal bag data structure for faster retrieval",
    "It only works for documents containing exactly one sentence",
    "It automatically removes all stop words before vectorizing"
  ],
  answer: 0,
  explanation: "The lecture gives this exact example: the two sentences have opposite meaning but identical bag-of-words vectors, since word order is discarded — a step back from the positional index, which could tell the two documents apart."
},
{
  topic: "Bag of Words Model",
  difficulty: "hard",
  question: "The lecture calls the bag-of-words model 'a step back' relative to what earlier technique, and why?",
  options: [
    "A step back from the positional index, because the positional index could distinguish documents that differ only in word order",
    "A step back from Boolean retrieval, because Boolean queries can be answered faster",
    "A step back from Jaccard scoring, because Jaccard incorporates word order",
    "A step back from stemming, because stemming preserves more information"
  ],
  answer: 0,
  explanation: "The slides state this directly: 'the positional index was able to distinguish these two documents' — the bag-of-words vector representation loses that ordering information that the earlier positional index preserved."
},

/* ---------------------------------------------------------------------
   TOPIC: Term Frequency
--------------------------------------------------------------------- */
{
  topic: "Term Frequency (TF)",
  difficulty: "easy",
  question: "How is the term frequency tf(t,d) defined in the lecture?",
  options: [
    "The number of times that term t occurs in document d",
    "The number of documents that contain term t",
    "The total number of terms in the entire collection",
    "The position of the first occurrence of t in d"
  ],
  answer: 0,
  explanation: "The lecture defines tf_{t,d} as the number of times term t occurs in document d — a per-document, per-term count. It notes 'frequency' means 'count' in IR terminology."
},
{
  topic: "Raw TF",
  difficulty: "medium",
  question: "Why does the lecture say raw term frequency is 'not what we want' for computing query-document match scores?",
  options: [
    "A document with 10 occurrences of a term is more relevant than one with 1 occurrence, but not 10 times more relevant — relevance doesn't increase proportionally with raw tf",
    "Raw term frequency can never be computed efficiently from an inverted index",
    "Raw term frequency ignores the query entirely",
    "Raw term frequency is always exactly equal to the document frequency"
  ],
  answer: 0,
  explanation: "The lecture's key insight is that relevance grows with term frequency but not proportionally — using raw counts directly would overweight documents that merely repeat a term many times, motivating a dampening transformation like log-frequency weighting."
},
{
  topic: "Log-Frequency Weighting",
  difficulty: "medium",
  question: "What is the purpose of log-frequency weighting of term frequency?",
  options: [
    "To dampen the effect of raw term frequency, since relevance grows with tf but not proportionally (e.g., 1→1, 10→2, 1000→4 in the lecture's example)",
    "To convert term frequency into a Boolean present/absent indicator",
    "To increase the score of documents with rare terms",
    "To replace document frequency in the idf formula"
  ],
  answer: 0,
  explanation: "The lecture's example mapping (0→0, 1→1, 2→1.3, 10→2, 1000→4) shows the log transform compresses large counts, reflecting that relevance rises much more slowly than raw frequency — this is a TF-side dampening, not related to idf or document frequency directly."
},
{
  topic: "Log-Frequency Weighting",
  difficulty: "hard",
  question: "According to the log-frequency weighting scheme in the lecture, what is the score for a document-query pair when NONE of the query terms occur in the document?",
  options: [
    "0",
    "1",
    "Undefined — the system cannot compute a score",
    "Equal to the document's length"
  ],
  answer: 0,
  explanation: "The slide explicitly states the score is 0 if none of the query terms is present in the document — the sum over shared terms t in both q and d is empty, so it evaluates to zero."
},

/* ---------------------------------------------------------------------
   TOPIC: Rare terms / Collection frequency / Document frequency / IDF
--------------------------------------------------------------------- */
{
  topic: "Rare Terms",
  difficulty: "easy",
  question: "Why does the lecture say rare terms should receive a higher weight than frequent terms?",
  options: [
    "Rare terms are more informative — a document containing a rare query term (e.g., 'arachnocentric') is very likely to be relevant to that query",
    "Rare terms are harder to spell, so they deserve extra credit",
    "Rare terms occur in every document, so weighting them highly balances the corpus",
    "Rare terms are always stop words that must be filtered out"
  ],
  answer: 0,
  explanation: "The lecture argues rare terms are more informative than frequent ones, giving 'arachnocentric' as an example: if it appears in the query and in a document, that document is very likely relevant, so we want a high weight for such rare terms."
},
{
  topic: "Collection Frequency vs Document Frequency",
  difficulty: "medium",
  question: "How does the lecture distinguish collection frequency from document frequency for a term t?",
  options: [
    "Collection frequency is the total number of occurrences of t across the whole collection; document frequency is the number of distinct documents that contain t",
    "Collection frequency and document frequency are two names for the exact same quantity",
    "Document frequency counts occurrences across the collection; collection frequency counts distinct documents",
    "Collection frequency is always smaller than document frequency"
  ],
  answer: 0,
  explanation: "The lecture defines collection frequency as the number of occurrences of t in the collection, and document frequency (df) as the number of documents in which t occurs — these can differ substantially, as the 'insurance' vs 'try' example shows."
},
{
  topic: "Collection Frequency vs Document Frequency",
  difficulty: "hard",
  question: "In the lecture's example, 'insurance' has collection frequency 10,440 and document frequency 3,997, while 'try' has collection frequency 10,422 and document frequency 8,760. Which word is better for search (should get a higher weight), and why?",
  options: [
    "'insurance' — despite having nearly the same collection frequency as 'try', it appears in far fewer documents, meaning it is more concentrated/informative when a document does contain it, so document frequency is the better basis for weighting",
    "'try' — because it has a higher document frequency, meaning it appears more broadly and is more useful for search",
    "They should get equal weight because their collection frequencies are almost identical",
    "'insurance' should get a lower weight because it has a lower document frequency"
  ],
  answer: 0,
  explanation: "The lecture's notes conclude 'df is better': even though both words occur roughly 10,400 times total, 'insurance' occurs in far fewer documents (concentrated), making it more discriminating/informative, while 'try' is spread across many documents (like a semi-stopword) and is less useful for distinguishing relevant documents."
},
{
  topic: "Inverse Document Frequency (IDF)",
  difficulty: "easy",
  question: "What does df_t represent, and how does it relate to informativeness according to the lecture?",
  options: [
    "df_t is the document frequency of t (number of documents containing t), and it is an inverse measure of t's informativeness",
    "df_t is the total count of t across the whole collection, and higher df_t always means more informative",
    "df_t is the number of times t appears in a single document",
    "df_t is a synonym for term frequency"
  ],
  answer: 0,
  explanation: "The lecture defines df_t as the document frequency of t — the number of documents that contain it — and states this is an inverse measure of informativeness: the more documents a term appears in, the less informative it is."
},
{
  topic: "IDF Formula",
  difficulty: "medium",
  question: "Why does the lecture use log(N/df_t) rather than the raw ratio N/df_t to define idf?",
  options: [
    "To 'dampen' the effect of idf, similar in spirit to how log-frequency weighting dampens raw term frequency",
    "Because N/df_t would always be less than 1 without the log",
    "Because logarithms are required to compute cosine similarity",
    "Because df_t can be negative, and log prevents that"
  ],
  answer: 0,
  explanation: "The slide states explicitly: 'We use log (N/df_t) instead of N/df_t to dampen the effect of idf' — the same motivation (avoiding overly extreme scaling) that drives log-frequency weighting of tf."
},
{
  topic: "IDF Formula",
  difficulty: "medium",
  question: "In the lecture's idf example with N = 1,000,000, the term 'the' has df_t = 1,000,000, giving idf = 0. What does this illustrate?",
  options: [
    "A term that occurs in every document carries no discriminating power for ranking, since log(N/N) = log(1) = 0",
    "A bug in the idf formula that needs to be corrected",
    "That common terms should always be given the maximum possible weight",
    "That idf cannot be computed for very large collections"
  ],
  answer: 0,
  explanation: "When a term appears in all N documents, N/df_t = 1, and log(1) = 0, so idf contributes nothing to the tf-idf score — correctly reflecting that such a term (like 'the') has no value in distinguishing relevant from irrelevant documents."
},
{
  topic: "Effect of IDF on Ranking",
  difficulty: "hard",
  question: "According to the lecture, does idf affect the ranking of documents for a ONE-term query like 'iPhone'?",
  options: [
    "No — idf has no effect on ranking for one-term queries; it only affects ranking for queries with at least two terms",
    "Yes — idf always changes the ranking, regardless of query length",
    "Only if the term 'iPhone' is a stop word",
    "Yes, but only when the collection has fewer than 1000 documents"
  ],
  answer: 0,
  explanation: "The lecture states directly: idf has no effect on ranking one-term queries. Since idf multiplies every document's score for that single term by the same constant, the relative ranking is unchanged. For multi-term queries like 'capricious person', idf changes how much each term contributes relative to the others."
},
{
  topic: "Effect of IDF on Ranking",
  difficulty: "hard",
  question: "For the two-term query 'capricious person', how does idf weighting affect the final ranking according to the lecture?",
  options: [
    "It makes occurrences of the rarer term 'capricious' count for much more in the final ranking than occurrences of the common term 'person'",
    "It makes 'person' count more heavily because it is more frequent",
    "It has no effect because both terms are in the same query",
    "It removes 'person' from the query entirely"
  ],
  answer: 0,
  explanation: "The lecture uses this exact example: idf weighting makes occurrences of the rarer, more informative term 'capricious' count for much more than occurrences of the common term 'person' in determining the final document ranking."
},

/* ---------------------------------------------------------------------
   TOPIC: TF-IDF
--------------------------------------------------------------------- */
{
  topic: "TF-IDF",
  difficulty: "easy",
  question: "How is the tf-idf weight of a term defined in the lecture?",
  options: [
    "The product of its tf weight and its idf weight",
    "The sum of its tf weight and its idf weight",
    "The document frequency divided by the term frequency",
    "The maximum of tf and idf"
  ],
  answer: 0,
  explanation: "The lecture defines tf-idf weight as the product (not sum) of the tf weight and the idf weight, combining how often a term occurs in a document with how rare it is across the collection."
},
{
  topic: "TF-IDF",
  difficulty: "easy",
  question: "The lecture notes an important detail about the hyphen in 'tf-idf'. What is it?",
  options: [
    "The '-' is a hyphen, not a minus sign — tf-idf is not tf minus idf",
    "The hyphen indicates tf-idf must always be negative",
    "The hyphen means the formula subtracts idf from tf",
    "There is no hyphen; it should always be written 'tf_idf'"
  ],
  answer: 0,
  explanation: "The slide explicitly warns: 'Note: the “-” in tf-idf is a hyphen, not a minus sign!' — a common point of student confusion the professor calls out directly."
},
{
  topic: "TF-IDF",
  difficulty: "medium",
  question: "Why does tf-idf perform better than using term frequency (tf) alone, based on the lecture?",
  options: [
    "tf-idf combines how often a term occurs in a document (relevance signal) with how rare the term is across the collection (informativeness signal), whereas tf alone ignores informativeness entirely",
    "tf-idf is simpler to compute than tf alone",
    "tf-idf ignores term frequency and only uses document frequency",
    "tf-idf always produces integer scores while tf produces decimals"
  ],
  answer: 0,
  explanation: "tf alone treats all terms as equally informative, so a frequent-but-common word could score as high as a frequent-but-rare, more meaningful word. tf-idf multiplies in the idf factor, boosting rare informative terms and dampening common ones — this is why the lecture calls it the 'best known weighting scheme.'"
},
{
  topic: "TF-IDF",
  difficulty: "medium",
  question: "Which properties does the tf-idf weight have according to the lecture?",
  options: [
    "It increases with the number of occurrences within a document AND increases with the rarity of the term in the collection",
    "It increases with occurrences within a document but decreases with the rarity of the term",
    "It is constant regardless of how often the term occurs in a document",
    "It only depends on the collection, never on the individual document"
  ],
  answer: 0,
  explanation: "The lecture lists both properties: tf-idf increases with the number of occurrences within a document (from the tf factor) and increases with the rarity of the term in the collection (from the idf factor)."
},
{
  topic: "TF-IDF",
  difficulty: "easy",
  question: "Which of the following are alternative names for tf-idf mentioned in the lecture?",
  options: [
    "tf.idf and tf x idf",
    "tf+idf and tf-only",
    "df.idf and tf/df",
    "Jaccard-weighted tf"
  ],
  answer: 0,
  explanation: "The lecture lists 'tf.idf' and 'tf x idf' as alternative names for the same weighting scheme, alongside the hyphenated 'tf-idf'."
},
{
  topic: "TF-IDF",
  difficulty: "hard",
  question: "The lecture states there are 'many variants' of the score for a document given a query. Which two sources of variation are mentioned?",
  options: [
    "How 'tf' is computed (with or without logs) and whether the terms in the query are also weighted",
    "Whether the document is written in English or another language, and its file format",
    "Whether the document is stored on disk or in memory",
    "Whether the collection is public or private"
  ],
  answer: 0,
  explanation: "The lecture notes variation comes from how tf is computed (raw vs. log-dampened) and whether query terms themselves are weighted (not just document terms) — this is the seed of the SMART notation discussed later (e.g., lnc.ltc)."
},

/* ---------------------------------------------------------------------
   TOPIC: Binary -> Count -> Weight matrix / Vector Space Model
--------------------------------------------------------------------- */
{
  topic: "Binary → Count → Weight Matrix",
  difficulty: "medium",
  question: "What is the final representation each document takes on, after moving from binary to count to weight matrices, according to the lecture?",
  options: [
    "A real-valued vector of tf-idf weights in R^|V|",
    "A binary vector in {0,1}^|V|",
    "A single scalar relevance score",
    "A natural-number count vector in ℕ^V"
  ],
  answer: 0,
  explanation: "The progression is: binary presence/absence → raw counts → real-valued tf-idf weights. The final representation is a real-valued vector in R^|V|, which is what enables the vector space model."
},
{
  topic: "Vector Space Model",
  difficulty: "easy",
  question: "What is the purpose of the Vector Space Model, as summarized at the end of the lecture?",
  options: [
    "To represent the query and each document as weighted tf-idf vectors, compute a similarity (cosine) score between them, and rank documents by that score",
    "To store documents as raw text files for fast retrieval",
    "To replace inverted indexes entirely with hash tables",
    "To eliminate the need for term weighting"
  ],
  answer: 0,
  explanation: "The lecture's summary states: represent the query as a weighted tf-idf vector, represent each document as a weighted tf-idf vector, compute cosine similarity between the query vector and each document vector, and rank/return the top K documents."
},
{
  topic: "Documents as Vectors",
  difficulty: "medium",
  question: "In the vector space model, what do the axes/dimensions of the space represent, and what is the nature of typical document vectors?",
  options: [
    "Terms are the axes of the space; documents are points/vectors in it, and these vectors are very high-dimensional but very sparse (most entries zero)",
    "Documents are the axes of the space; terms are points in it",
    "Each axis represents one document, making the space low-dimensional",
    "The vectors are always dense, with every dimension non-zero"
  ],
  answer: 0,
  explanation: "The lecture states terms are the axes of the |V|-dimensional space and documents are points/vectors within it — for a web search engine this can be tens of millions of dimensions, but each document vector is very sparse since it contains only a small subset of the vocabulary."
},
{
  topic: "Queries as Vectors",
  difficulty: "medium",
  question: "What are the 'two key ideas' the lecture introduces when moving from documents-as-vectors to also representing queries as vectors?",
  options: [
    "(1) Represent queries as vectors in the same space, and (2) rank documents according to their proximity to the query in that space",
    "(1) Convert queries into Boolean expressions, and (2) discard document vectors entirely",
    "(1) Store queries in a separate index, and (2) never compare them to document vectors",
    "(1) Represent queries as binary vectors only, and (2) ignore term weights for queries"
  ],
  answer: 0,
  explanation: "The lecture's 'Key idea 1' is representing queries the same way as documents (as vectors), and 'Key idea 2' is ranking documents by their proximity (≈ similarity, ≈ inverse of distance) to the query vector in that shared space."
},
{
  topic: "Documents vs Queries as Vectors",
  difficulty: "hard",
  question: "According to the lecture's discussion of the lnc.ltc weighting scheme, what is a key practical difference in how documents and queries are typically weighted?",
  options: [
    "Documents commonly skip idf weighting (for efficiency and effectiveness reasons) while queries typically use idf weighting, even though both use log tf and cosine normalization",
    "Documents always use idf, but queries never use tf",
    "Queries are represented as binary vectors, while documents use full tf-idf",
    "There is no meaningful difference; documents and queries are always weighted identically"
  ],
  answer: 0,
  explanation: "In lnc.ltc, the document side is 'l' (log tf), 'n' (no idf), 'c' (cosine normalization), while the query side is 'l' (log tf), 't' (idf), 'c' (cosine normalization). The lecture notes leaving idf off documents is good for both efficiency and system-effectiveness reasons — this is a genuine, exam-relevant asymmetry."
},

/* ---------------------------------------------------------------------
   TOPIC: Similarity / Euclidean distance / Angle / Cosine
--------------------------------------------------------------------- */
{
  topic: "Similarity",
  difficulty: "easy",
  question: "In the vector space model, how does the lecture define 'proximity' between a query and a document vector?",
  options: [
    "Proximity = similarity of vectors ≈ inverse of distance",
    "Proximity = the number of shared terms only, ignoring weights",
    "Proximity = Boolean match/no-match",
    "Proximity = the ratio of document length to query length"
  ],
  answer: 0,
  explanation: "The lecture states proximity = similarity of vectors, and proximity is approximately the inverse of distance — closer vectors (in the appropriate sense) are considered more similar and thus more relevant."
},
{
  topic: "Euclidean Distance",
  difficulty: "medium",
  question: "Why does the lecture call Euclidean distance 'a bad idea' for measuring query-document similarity?",
  options: [
    "Because Euclidean distance is large for vectors of very different lengths, even when the underlying term distributions are similar",
    "Because Euclidean distance cannot be computed for high-dimensional vectors",
    "Because Euclidean distance is always exactly zero for any two documents",
    "Because Euclidean distance only works for binary vectors"
  ],
  answer: 0,
  explanation: "The lecture's example shows the Euclidean distance between a query q and a document d2 is large even though the term distributions of q and d2 are very similar — the raw magnitude difference (document length) distorts the distance measure."
},
{
  topic: "Why Euclidean Distance is Unsuitable",
  difficulty: "hard",
  question: "The lecture's 'append d to itself' thought experiment (creating d′) is used to argue against which distance measure, and why?",
  options: [
    "Euclidean distance — because d and d′ have the same semantic content, yet the Euclidean distance between them can be quite large, showing distance is misled by document length",
    "Cosine similarity — because appending d to itself doubles the cosine score",
    "Jaccard coefficient — because appending d to itself always gives Jaccard = 0",
    "Dot product — because the dot product is undefined for repeated documents"
  ],
  answer: 0,
  explanation: "The thought experiment shows d and d′ (d appended to itself) are semantically identical, but their Euclidean distance can still be large because d′ has larger term counts — this motivates preferring angle-based (cosine) similarity, which gives an angle of 0 (maximal similarity) for d and d′."
},
{
  topic: "Angle Between Vectors",
  difficulty: "medium",
  question: "What is the lecture's 'key idea' for fixing the length-sensitivity problem of Euclidean distance?",
  options: [
    "Rank documents according to the angle between the document and query vectors, rather than the straight-line distance between them",
    "Rank documents by the number of dimensions in their vector",
    "Rank documents by the sum of all term counts",
    "Rank documents by converting all vectors to binary before comparing"
  ],
  answer: 0,
  explanation: "The lecture states the key idea explicitly: 'Rank documents according to angle with query.' Since d and d′ (d appended to itself) have an angle of 0 between them, angle correctly reflects that they have the same content, unlike distance."
},
{
  topic: "From Angle to Cosine",
  difficulty: "medium",
  question: "How does the lecture relate ranking by angle to ranking by cosine?",
  options: [
    "Ranking documents in decreasing order of angle with the query is equivalent to ranking them in increasing order of cosine similarity, because cosine is monotonically decreasing over [0°, 180°]",
    "Ranking by angle and ranking by cosine always give opposite, unrelated results",
    "Cosine similarity replaces angle only for documents shorter than the query",
    "Angle and cosine are unrelated quantities in the vector space model"
  ],
  answer: 0,
  explanation: "The lecture states these two notions are equivalent: since cosine decreases monotonically as angle increases from 0° to 180°, sorting by increasing cosine is the same as sorting by decreasing angle — that's why systems compute cosine directly rather than the angle itself."
},
{
  topic: "Cosine Similarity",
  difficulty: "easy",
  question: "Why is cosine similarity preferred over Euclidean distance for ranking documents, according to the lecture?",
  options: [
    "Because cosine similarity is based on the angle between vectors, which is unaffected by document length differences, unlike Euclidean distance",
    "Because cosine similarity is always faster to compute than any distance measure",
    "Because cosine similarity requires no normalization at all",
    "Because cosine similarity only works with binary vectors"
  ],
  answer: 0,
  explanation: "Cosine similarity captures the angle between vectors (or, equivalently, similarity after length normalization), which stays stable even when document lengths differ greatly — solving exactly the problem the lecture identifies with raw Euclidean distance."
},

/* ---------------------------------------------------------------------
   TOPIC: Length normalization / Dot product / Unit vector
--------------------------------------------------------------------- */
{
  topic: "Length Normalization",
  difficulty: "easy",
  question: "How is a vector length-normalized according to the lecture?",
  options: [
    "By dividing each of its components by the vector's L2 norm (length)",
    "By subtracting the mean of its components",
    "By multiplying each component by the document frequency",
    "By rounding every component to the nearest integer"
  ],
  answer: 0,
  explanation: "The lecture defines length normalization as dividing each component of a vector by its L2 norm, which places the resulting unit vector on the surface of the unit hypersphere."
},
{
  topic: "Length Normalization",
  difficulty: "medium",
  question: "Why is length normalization needed in the vector space model?",
  options: [
    "It makes long and short documents have comparable weights, and gives d and d′ (d appended to itself) identical vectors after normalization",
    "It converts term counts into Boolean presence/absence values",
    "It removes the need to compute idf",
    "It guarantees every document has exactly the same set of terms"
  ],
  answer: 0,
  explanation: "The lecture explains that after length normalization, d and d′ have identical vectors (since one is just a length-scaled copy of the other), and, more generally, long and short documents become comparable in weight rather than long documents dominating purely due to size."
},
{
  topic: "Unit Vector",
  difficulty: "easy",
  question: "What is a 'unit vector' in the context of the lecture's length normalization discussion?",
  options: [
    "A vector obtained by dividing a vector by its L2 norm, placing it on the surface of the unit hypersphere",
    "A vector with exactly one non-zero component",
    "A vector representing a single query term only",
    "A vector whose components are all equal to 1"
  ],
  answer: 0,
  explanation: "The lecture states dividing a vector by its L2 norm makes it a unit (length) vector, lying on the surface of the unit hypersphere — not a vector with special component values like all-ones or a single non-zero entry."
},
{
  topic: "Dot Product",
  difficulty: "medium",
  question: "For length-normalized vectors, how does the lecture say cosine similarity can be computed?",
  options: [
    "Simply as the dot product (scalar product) of the two length-normalized vectors",
    "As the Euclidean distance between the two vectors",
    "As the Jaccard coefficient of the two vectors' non-zero terms",
    "As the sum of the document frequencies of shared terms"
  ],
  answer: 0,
  explanation: "The lecture states: 'For length-normalized vectors, cosine similarity is simply the dot product (or scalar product)' — once vectors are unit-length, the general cosine formula (dot product divided by the product of magnitudes) simplifies because both magnitudes equal 1."
},
{
  topic: "Cosine Score",
  difficulty: "hard",
  question: "In the general cosine(q,d) formula (before assuming unit vectors), what do qi and di represent according to the lecture?",
  options: [
    "qi is the weight of term i in the query, and di is the weight of term i in the document",
    "qi is the document frequency of term i, and di is the collection frequency of term i",
    "qi and di are both binary indicators of whether term i appears anywhere in the collection",
    "qi is the total number of query terms, and di is the total number of document terms"
  ],
  answer: 0,
  explanation: "The lecture defines cos(q,d) using the dot product of the query and document weight vectors divided by their unit-normalized lengths, where qi is the weight of term i in the query and di is the weight of term i in the document."
},

/* ---------------------------------------------------------------------
   TOPIC: Cosine similarity worked example (SaS / PaP / WH)
--------------------------------------------------------------------- */
{
  topic: "Cosine Similarity Example",
  difficulty: "medium",
  question: "In the lecture's Sense and Sensibility (SaS), Pride and Prejudice (PaP), and Wuthering Heights (WH) example, why is idf weighting NOT applied to the raw term counts?",
  options: [
    "The lecture states it is done 'to simplify this example' — only term frequencies and length normalization are used, not full tf-idf",
    "Because idf cannot be computed when there are only 3 documents",
    "Because idf only applies to Boolean retrieval, not the vector space model",
    "Because the terms shown (affection, jealous, gossip, wuthering) all have identical document frequencies"
  ],
  answer: 0,
  explanation: "The lecture explicitly notes: 'Note: To simplify this example, we don't do idf weighting' — the demonstration focuses on log-frequency weighting and length normalization, deliberately leaving out idf to keep the arithmetic manageable."
},
{
  topic: "Cosine Similarity Example",
  difficulty: "hard",
  question: "In the SaS/PaP/WH example, cos(SaS,PaP) ≈ 0.94, cos(SaS,WH) ≈ 0.79, and cos(PaP,WH) ≈ 0.69. What does this suggest about the novels' similarity, and which underlying mechanism makes this comparison fair despite the novels having very different lengths?",
  options: [
    "Sense and Sensibility is most similar to Pride and Prejudice and least similar to Wuthering Heights in these terms; length normalization makes the comparison fair by removing the effect of raw document length",
    "The novels cannot be meaningfully compared because their raw word counts differ",
    "Wuthering Heights is most similar to Sense and Sensibility because it has the highest 'wuthering' count",
    "The comparison is invalid because idf weighting was applied"
  ],
  answer: 0,
  explanation: "The highest cosine score (0.94) is between SaS and PaP, and the lowest (0.69) is between PaP and WH, indicating SaS/PaP are closest and PaP/WH are furthest apart in this term space. This comparison is fair specifically because cosine (via length normalization) is insensitive to differences in overall document/vector length, unlike raw dot products or Euclidean distance."
},

/* ---------------------------------------------------------------------
   TOPIC: TAAT / DAAT / Priority Queue
--------------------------------------------------------------------- */
{
  topic: "Term-at-a-Time (TAAT)",
  difficulty: "medium",
  question: "What does the lecture's original 'computing cosine scores' algorithm score documents as — term-at-a-time or document-at-a-time?",
  options: [
    "Term-at-a-time (TAAT)",
    "Document-at-a-time (DAAT)",
    "Query-at-a-time",
    "Index-at-a-time"
  ],
  answer: 0,
  explanation: "The lecture states the previous (original) algorithm scores term-at-a-time (TAAT), and that this algorithm can be adapted to instead score document-at-a-time (DAAT)."
},
{
  topic: "Term-at-a-Time vs Document-at-a-Time",
  difficulty: "hard",
  question: "According to the lecture, what practical storage consideration motivates using tf_{t,d} and idf_t directly in the postings, rather than storing a single combined weight per posting?",
  options: [
    "Storing w_{t,d} (a floating-point weight) in every posting could be expensive, so for tf-idf scoring it suffices to store tf_{t,d} in the posting and idf_t once in the head of the postings list",
    "Floating-point numbers cannot be stored in postings lists at all",
    "tf_{t,d} and idf_t must always be recomputed at query time from scratch",
    "Document-at-a-time scoring is impossible if weights are precomputed"
  ],
  answer: 0,
  explanation: "The lecture notes that storing a floating-point weight in every posting is costly, so instead tf_{t,d} is stored per posting and idf_t is stored once per term (in the postings list head) — the weight can be reconstructed from these two cheaper values when needed."
},
{
  topic: "Priority Queue",
  difficulty: "medium",
  question: "According to the lecture, how can extracting the top K scoring documents be efficiently accomplished?",
  options: [
    "With a priority queue (e.g., a heap)",
    "By sorting the entire collection with a simple bubble sort",
    "By re-running the Jaccard coefficient on the top K candidates",
    "By storing documents in a binary incidence matrix"
  ],
  answer: 0,
  explanation: "The lecture states: 'Extracting the top K items can be done with a priority queue (e.g., a heap)' — this avoids fully sorting the entire scored document set just to retrieve the top K."
},

/* ---------------------------------------------------------------------
   TOPIC: SMART Notation / lnc.ltc
--------------------------------------------------------------------- */
{
  topic: "SMART Notation",
  difficulty: "medium",
  question: "What is the purpose of SMART notation as described in the lecture?",
  options: [
    "To denote the combination of tf-idf weighting variants a search engine uses for documents and queries, in the form ddd.qqq",
    "To denote which programming language was used to implement the search engine",
    "To specify how many results a query should return",
    "To label whether a document is scanned or born-digital"
  ],
  answer: 0,
  explanation: "The lecture describes SMART notation as denoting the weighting combination in use, written as ddd.qqq — three letters for the document weighting scheme and three for the query weighting scheme, using acronyms from the tf-idf variants table."
},
{
  topic: "lnc.ltc Weighting",
  difficulty: "hard",
  question: "What does the SMART notation 'lnc.ltc' mean, according to the lecture?",
  options: [
    "Document: logarithmic tf, no idf, cosine normalization. Query: logarithmic tf, idf, cosine normalization",
    "Document: linear tf, no cosine normalization, count-based. Query: log tf, term normalization, cosine",
    "Document: log tf, idf, cosine normalization. Query: no tf, no idf, no normalization",
    "Document and query use identical raw-count weighting with no normalization at all"
  ],
  answer: 0,
  explanation: "The lecture spells this out: the document side ('lnc') uses logarithmic tf ('l'), no idf ('n'), and cosine normalization ('c'); the query side ('ltc') uses logarithmic tf ('l'), idf ('t'), and cosine normalization ('c')."
},
{
  topic: "lnc.ltc Weighting",
  difficulty: "hard",
  question: "The lecture notes that lnc.ltc is 'a very standard weighting scheme.' Why does it make sense to leave idf OFF the document side but keep it ON the query side?",
  options: [
    "Because leaving idf off documents is good for both efficiency and system-effectiveness reasons, as the lecture's notes state",
    "Because idf cannot mathematically be computed per-document, only per-query",
    "Because documents never contain rare terms, only queries do",
    "Because queries are always much longer than documents, so only they benefit from idf"
  ],
  answer: 0,
  explanation: "The lecture's speaker notes state directly: 'Leaving off idf weighting on documents is good for both efficiency and system effectiveness reasons' — this is a specific, tested claim from the lecture, not a general property of idf."
},
{
  topic: "lnc.ltc Weighting",
  difficulty: "medium",
  question: "In the lecture's worked lnc.ltc example ('best car insurance' query vs. 'car insurance auto insurance' document), what is the reported final similarity score?",
  options: [
    "0.8 (Score = 0 + 0 + 0.27 + 0.53)",
    "1.0, a perfect match",
    "0.0, since the query and document share only two terms",
    "2.27, the sum of all raw tf values"
  ],
  answer: 0,
  explanation: "The lecture's worked table sums the per-term products for the four vocabulary terms shown (auto, best, car, insurance): 0 + 0 + 0.27 + 0.53 = 0.8, the cosine similarity between the length-normalized query and document vectors."
},
{
  topic: "lnc.ltc Weighting",
  difficulty: "hard",
  question: "In the lnc.ltc example, the term 'best' contributes 0 to the final product score even though it appears in the query with tf-raw = 1. Why?",
  options: [
    "Because 'best' does not occur in the document at all (its document-side weight and normalized weight are 0), so the query weight for 'best' multiplies by 0",
    "Because 'best' is a stop word and is always excluded from scoring",
    "Because the idf of 'best' is exactly 0",
    "Because the query length normalization zeroes out the first term automatically"
  ],
  answer: 0,
  explanation: "Looking at the table, 'best' has tf-raw = 0 on the document side (it never appears in 'car insurance auto insurance'), so its document weight and normalized weight are both 0 — multiplying the query's non-zero weight for 'best' by the document's 0 weight yields a 0 contribution to the dot product."
},
{
  topic: "Vector Space Ranking",
  difficulty: "easy",
  question: "What are the four steps of vector space ranking summarized at the end of the lecture?",
  options: [
    "Represent the query as a tf-idf vector, represent each document as a tf-idf vector, compute cosine similarity between them, and rank/return the top K documents",
    "Tokenize the query, stem it, remove stop words, and return all matching documents",
    "Compute Jaccard similarity, apply Boolean AND, sort alphabetically, return results",
    "Build the inverted index, compute term frequency only, sort by document length, return top K"
  ],
  answer: 0,
  explanation: "The lecture's final summary slide lists exactly these four steps: represent query and documents as weighted tf-idf vectors, compute the cosine similarity score for each document against the query, rank documents by that score, and return the top K (e.g., K=10) to the user."
},

/* ---------------------------------------------------------------------
   Additional mixed/comparison/application questions to broaden coverage
--------------------------------------------------------------------- */
{
  topic: "Query-Document Matching",
  difficulty: "easy",
  question: "For a one-term query, what should the score be if the query term does NOT occur in the document, according to the lecture?",
  options: [
    "0",
    "1",
    "The document's total word count",
    "Undefined"
  ],
  answer: 0,
  explanation: "The lecture states plainly: if the query term does not occur in the document, the score should be 0 — this is the basic requirement any scoring function must satisfy before adding more sophistication."
},
{
  topic: "Query-Document Matching",
  difficulty: "medium",
  question: "According to the lecture, how should the score behave as the query term's frequency in the document increases?",
  options: [
    "The more frequent the query term in the document, the higher the score should be (though not necessarily proportionally)",
    "The score should decrease as frequency increases",
    "The score should remain constant regardless of frequency",
    "The score should become undefined once frequency exceeds 10"
  ],
  answer: 0,
  explanation: "The lecture states that the more frequent the query term in the document, the higher the score should be — this general principle motivates using term frequency as an ingredient, refined later by log-dampening since the relationship shouldn't be strictly proportional."
},
{
  topic: "Comparison: TF vs IDF",
  difficulty: "medium",
  question: "What is the fundamental difference in what TF and IDF each measure, according to the lecture?",
  options: [
    "TF measures how often a term occurs within a single document; IDF measures how rare/informative a term is across the whole collection",
    "TF measures collection-wide rarity; IDF measures per-document frequency",
    "TF and IDF both measure the exact same thing, computed differently",
    "TF applies only to queries; IDF applies only to documents"
  ],
  answer: 0,
  explanation: "TF (term frequency) is a per-document statistic — how many times a term occurs in that specific document. IDF (inverse document frequency) is a collection-wide statistic — how rare the term is across all documents. tf-idf combines both perspectives."
},
{
  topic: "Comparison: TF-IDF vs TF alone",
  difficulty: "hard",
  question: "A student argues: 'TF-IDF is strictly better than TF alone because it always assigns higher scores to relevant documents.' What is the more accurate, exam-appropriate statement based on the lecture?",
  options: [
    "TF-IDF improves on TF alone by additionally weighting terms by their rarity/informativeness across the collection, better separating discriminating terms from common ones — not by any guarantee of always ranking relevant documents higher",
    "TF-IDF is identical to TF alone in all cases",
    "TF-IDF is worse than TF alone because it adds unnecessary computation",
    "TF-IDF is only usable for Boolean retrieval, not ranked retrieval"
  ],
  answer: 0,
  explanation: "The lecture presents tf-idf's advantage as incorporating rarity (idf) alongside frequency (tf), which the 'insurance' vs 'try' and 'capricious' vs 'person' examples justify — but it never claims a guarantee of correctness for every document; it is a principled weighting improvement, not an infallibility guarantee."
},
{
  topic: "Application: Choosing a Similarity Measure",
  difficulty: "hard",
  question: "A search system needs to compare documents of wildly different lengths (a tweet vs. a novel) fairly. Based on the lecture, which measure should be used and why?",
  options: [
    "Cosine similarity, because it is based on the angle between vectors (equivalent to comparing length-normalized vectors), which is not distorted by raw document length the way Euclidean distance is",
    "Euclidean distance, because it directly measures how many words differ between the documents",
    "Jaccard coefficient, because it is designed specifically for very long documents",
    "Raw term frequency, because longer documents should always score higher"
  ],
  answer: 0,
  explanation: "This is exactly the scenario the lecture's 'append d to itself' thought experiment addresses: Euclidean distance is thrown off by differing magnitudes, while cosine similarity (via the angle / length normalization) remains a fair comparison regardless of document length."
},
{
  topic: "Application: Weighting a Rare vs Common Term",
  difficulty: "medium",
  question: "A two-word query contains one term that appears in nearly every document in the collection and one very rare term. Based on the lecture, what will idf weighting do to the ranking?",
  options: [
    "It will make the rare term dominate the ranking, since idf gives it a much higher weight than the common term (whose idf approaches 0)",
    "It will make the common term dominate the ranking",
    "It will have no effect, since idf only matters for one-term queries",
    "It will remove the common term from the vocabulary entirely"
  ],
  answer: 0,
  explanation: "This mirrors the 'capricious person' example: the rare term gets a high idf while the near-universal term gets an idf close to log(N/N) ≈ 0, so idf weighting causes the rare term's occurrences to dominate the final tf-idf-based ranking."
},
{
  topic: "Vector Space Model Purpose",
  difficulty: "medium",
  question: "What core problem does representing both documents AND queries as vectors in the same space solve?",
  options: [
    "It allows a well-defined geometric notion of similarity (angle/cosine) to be computed between a query and every document, enabling ranked retrieval",
    "It removes the need to build an inverted index",
    "It guarantees every query returns at least one perfect match",
    "It converts free text queries back into Boolean expressions"
  ],
  answer: 0,
  explanation: "By putting queries and documents in the same |V|-dimensional space, the lecture shows we get the two key ideas needed for ranked retrieval: a shared representation, and a geometric proximity measure (cosine similarity) that produces a natural ranking of documents by relevance to the query."
},
{
  topic: "Advantages of Log-Frequency Weighting",
  difficulty: "medium",
  question: "What is the main advantage of log-frequency weighting over raw term frequency, according to the lecture's examples (0→0, 1→1, 2→1.3, 10→2, 1000→4)?",
  options: [
    "It compresses the effect of very high raw counts, reflecting that relevance grows much more slowly than proportionally with term frequency",
    "It makes all term frequencies exactly equal to 1",
    "It guarantees the score is always between 0 and 1",
    "It removes the need for idf weighting entirely"
  ],
  answer: 0,
  explanation: "The mapping shows huge raw-count differences (10 vs. 1000) becoming much smaller weight differences (2 vs. 4) — this captures the lecture's insight that a document with 10x more occurrences of a term is more relevant, but not 10x more relevant."
},
{
  topic: "Scoring Documents",
  difficulty: "hard",
  question: "Which statement BEST captures why the lecture moves from Jaccard, to raw tf, to log tf, to tf-idf, to cosine similarity in sequence?",
  options: [
    "Each step fixes a specific weakness of the previous approach — Jaccard ignores frequency, raw tf overweights repetition, tf alone ignores term rarity, and un-normalized dot products are distorted by document length — culminating in a normalized, rarity-aware scoring function",
    "Each method is a completely independent alternative unrelated to the others",
    "The sequence is arbitrary and the lecture presents no rationale for the ordering",
    "The final cosine similarity approach discards all use of term frequency"
  ],
  answer: 0,
  explanation: "This tests whether a student sees the throughline: Jaccard → considers frequency (tf) → dampens it (log tf) → adds rarity/informativeness (idf) → normalizes for length (cosine) — each stage of the lecture directly addresses a stated limitation of the previous one, ending in a scheme that still fundamentally relies on term frequency, just refined and normalized."
},
{
  topic: "Which statement is FALSE",
  difficulty: "hard",
  question: "Which of the following statements about the vector space model is FALSE, according to the lecture?",
  options: [
    "Cosine similarity for length-normalized vectors requires computing the full Euclidean distance first",
    "Documents are represented as points/vectors in a |V|-dimensional space where terms are the axes",
    "Document vectors in large collections are typically very sparse",
    "Query vectors live in the same space as document vectors, enabling proximity comparisons"
  ],
  answer: 0,
  explanation: "This is FALSE: for length-normalized vectors, cosine similarity is simply the dot product — no Euclidean distance computation is needed at all. The other three statements are directly supported by the lecture (terms as axes, sparse high-dimensional vectors, and queries sharing the document space)."
},
{
  topic: "Which statement is TRUE",
  difficulty: "medium",
  question: "Which of the following statements is TRUE, based on the lecture?",
  options: [
    "The cosine of the angle between two identical-content vectors that differ only in overall scale (like d and d′) is 0°, i.e., maximal similarity",
    "The Euclidean distance between d and d′ (d appended to itself) is always 0",
    "Document frequency and collection frequency always have identical values for every term",
    "Log-frequency weighting always eliminates the need for length normalization"
  ],
  answer: 0,
  explanation: "The lecture's thought experiment establishes that the angle between d and d′ is 0° (maximal cosine similarity), even though their Euclidean distance can be large — making the first statement true and the second false. Document/collection frequency differ (per the insurance/try example), and log weighting doesn't replace length normalization; both are used together (e.g., in lnc.ltc)."
},
{
  topic: "All of the following EXCEPT",
  difficulty: "medium",
  question: "All of the following are reasons the lecture gives for preferring ranked retrieval over Boolean retrieval EXCEPT:",
  options: [
    "Ranked retrieval always requires less storage than Boolean retrieval",
    "Most users cannot easily write precise Boolean queries",
    "Users don't want to wade through thousands of results",
    "Feast-or-famine result sizes are not a problem when only the top k are shown"
  ],
  answer: 0,
  explanation: "The lecture never claims a storage advantage for ranked retrieval — that's not a stated reason. The other three are explicitly given: user difficulty with Boolean syntax, unwillingness to sift through huge result sets, and the top-k solution to feast-or-famine."
},
{
  topic: "All of the following EXCEPT",
  difficulty: "hard",
  question: "All of the following are true about idf EXCEPT:",
  options: [
    "idf is computed per document, giving every document its own distinct idf value for a term",
    "idf is defined using log(N/df_t)",
    "A term occurring in every document has idf = 0",
    "idf has no effect on the ranking for single-term queries"
  ],
  answer: 0,
  explanation: "This is the false statement: the lecture is explicit that 'There is one idf value for each term t in a collection' — idf is a property of the term across the whole collection, not something computed separately per document. The other three statements are directly supported by the slides."
},
{
  topic: "Best Answer",
  difficulty: "hard",
  question: "Which concept should be used to fairly compare the similarity of a very short document and a very long document that both discuss the same topic in similar proportions?",
  options: [
    "Cosine similarity with length normalization",
    "Raw dot product of un-normalized count vectors",
    "Euclidean distance of un-normalized count vectors",
    "Jaccard coefficient computed on raw term counts (not sets)"
  ],
  answer: 0,
  explanation: "Length-normalized cosine similarity is exactly the tool the lecture builds for this purpose: it discounts raw magnitude differences (document length) and focuses on the direction/proportional composition of the term vectors, which is what 'discussing the same topic in similar proportions' means geometrically."
},
{
  topic: "Purpose of SMART Notation",
  difficulty: "medium",
  question: "Why might a search engine use different weighting schemes for documents versus queries, and how does the lecture's SMART notation capture this?",
  options: [
    "Search engines often benefit from asymmetric weighting (e.g., skipping idf on documents for efficiency/effectiveness); SMART notation captures this with the ddd.qqq format, one triple for documents and one for queries",
    "SMART notation only describes document weighting; queries are always unweighted",
    "SMART notation requires documents and queries to always use identical weighting",
    "SMART notation is used only to indicate which programming language computed the weights"
  ],
  answer: 0,
  explanation: "The lecture states many search engines allow different weightings for queries vs. documents, and introduces SMART notation (ddd.qqq) precisely to name such asymmetric combinations, with lnc.ltc as the standard example."
},
{
  topic: "Meaning of lnc.ltc",
  difficulty: "medium",
  question: "In the SMART notation letter scheme used for lnc.ltc, what does the letter 'c' represent (appearing in both the document and query triples)?",
  options: [
    "Cosine normalization",
    "Collection frequency weighting",
    "Count-based raw term frequency",
    "Constant (no weighting applied)"
  ],
  answer: 0,
  explanation: "In both 'lnc' (document) and 'ltc' (query), the final letter 'c' stands for cosine normalization — the length-normalization step applied after the tf and idf components have been combined."
},
{
  topic: "Difference: TAAT vs DAAT",
  difficulty: "hard",
  question: "What is the essential difference between term-at-a-time (TAAT) and document-at-a-time (DAAT) scoring, based on the lecture's discussion?",
  options: [
    "TAAT accumulates partial scores for many documents by processing one query term's postings list fully before moving to the next term; DAAT is an adapted version of the same algorithm oriented around completing each document's score in turn",
    "TAAT only works with Boolean queries, while DAAT only works with free text queries",
    "TAAT requires idf but DAAT does not use idf at all",
    "DAAT cannot use a priority queue to find the top K results"
  ],
  answer: 0,
  explanation: "The lecture presents the original scoring algorithm as term-at-a-time and states it 'can be adapted to' scoring document-at-a-time — the same underlying computation (summing weighted term contributions) is simply organized around terms first (TAAT) or documents first (DAAT). Both can still use a priority queue to extract the top K."
},

];

/* Sanity export for other scripts */
if (typeof module !== "undefined") { module.exports = QUESTION_BANK; }
