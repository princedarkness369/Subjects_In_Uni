// Question bank for IR Chapter 2 & 3 (Tokens & Terms) exam
// Generated strictly from the uploaded lecture slides.
// difficulty: "easy" | "medium" | "hard"
// correct: index (0-3) into options
const QUESTION_BANK = [

// ===================== TOKENS: Basic definitions =====================
{
  topic: "Tokenization",
  difficulty: "easy",
  question: "According to the lecture, what is a token?",
  options: [
    "An instance of a sequence of characters",
    "A normalized word type stored in the dictionary",
    "A stop word removed before indexing",
    "A phonetic code assigned to a word"
  ],
  correct: 0,
  explanation: "The slides define a token as an instance of a sequence of characters. Option B describes a term, not a token; option C describes stop-word removal; option D describes Soundex, none of which are the definition of a token."
},
{
  topic: "Tokenization",
  difficulty: "easy",
  question: "In the lecture's tokenization example, the input \"Friends, Romans and Countrymen\" produces which output?",
  options: [
    "The tokens Friends, Romans, Countrymen",
    "A single token: FriendsRomansCountrymen",
    "Three terms already normalized to lowercase",
    "Three stems: friend, roman, countryman"
  ],
  correct: 0,
  explanation: "The slide shows tokenization splitting the phrase into the individual tokens Friends, Romans, Countrymen (punctuation and 'and' are dropped as separators, but no lowercasing or stemming is shown at this stage). Lowercasing/stemming belong to normalization, not tokenization."
},
{
  topic: "Tokenization",
  difficulty: "medium",
  question: "Why does the lecture describe each token as a 'candidate' for an index entry rather than simply an index entry?",
  options: [
    "Because a token must undergo further processing (e.g., normalization) before becoming an actual index entry",
    "Because tokens are only used for query expansion, never for indexing",
    "Because tokens are randomly sampled before indexing to save space",
    "Because tokens are always discarded and replaced by stop words"
  ],
  correct: 0,
  explanation: "The slides state that each token is a candidate for an index entry 'after further processing' — meaning steps like normalization still need to happen. It is not about sampling or discarding tokens, and tokens are not replaced by stop words."
},
{
  topic: "Tokenization",
  difficulty: "easy",
  question: "Which question does the lecture pose as the central challenge of tokenization?",
  options: [
    "What are valid tokens to emit?",
    "How many documents should be indexed?",
    "Which language has the most stop words?",
    "How should relevance be ranked?"
  ],
  correct: 0,
  explanation: "The slide ends the tokenization introduction with 'But what are valid tokens to emit?' — this is presented as the open problem. The other options are unrelated to tokenization."
},
{
  topic: "Tokenization",
  difficulty: "medium",
  question: "A search engine tokenizes 'state-of-the-art' as four separate tokens: state, of, the, art. What tokenization issue does this illustrate?",
  options: [
    "Breaking up a hyphenated sequence",
    "Case folding",
    "Stop word removal",
    "Asymmetric expansion"
  ],
  correct: 0,
  explanation: "The lecture explicitly lists 'state-of-the-art' as an example of breaking up a hyphenated sequence. Case folding concerns letter case, stop word removal concerns dropping common words, and asymmetric expansion concerns query-time expansion — none of which describe splitting on hyphens."
},

// ===================== Hyphenation =====================
{
  topic: "Hyphenated Words",
  difficulty: "medium",
  question: "The lecture uses 'Hewlett-Packard' as an example of which tokenization issue?",
  options: [
    "Whether a hyphenated compound should be split into two tokens",
    "Whether the word contains a stop word",
    "Whether the word needs Soundex matching",
    "Whether the word is a number"
  ],
  correct: 0,
  explanation: "Hewlett-Packard is used to raise the question of whether to treat it as 'Hewlett' and 'Packard' as two tokens. It has nothing to do with stop words, Soundex, or numbers."
},
{
  topic: "Hyphenated Words",
  difficulty: "medium",
  question: "'lowercase', 'lower-case', and 'lower case' are given in the lecture as an example of what problem?",
  options: [
    "Inconsistent hyphenation/spacing of the same underlying concept, complicating tokenization",
    "The need to remove stop words before indexing",
    "The difficulty of case folding in German",
    "The use of n-grams to index numbers"
  ],
  correct: 0,
  explanation: "This example shows the same idea written three different ways (joined, hyphenated, spaced), which is a hyphenation/spacing tokenization issue — not related to stop words, German case folding, or number indexing."
},
{
  topic: "Hyphenated Words",
  difficulty: "hard",
  question: "The slides mention that it can be effective to get the user to put in possible hyphens. What is the best interpretation of this suggestion?",
  options: [
    "Letting users hint alternate hyphenation forms can help the system match how a term might be represented in the index",
    "It guarantees perfect tokenization for every hyphenated word",
    "It replaces the need for a stop list",
    "It eliminates the need for normalization entirely"
  ],
  correct: 0,
  explanation: "The point is a practical mitigation — user input on possible hyphens can aid matching — not a guarantee of perfection, and it doesn't replace stop lists or normalization, which address different problems."
},
{
  topic: "Hyphenated Words",
  difficulty: "medium",
  question: "'co-education' is presented alongside 'Hewlett-Packard' and 'state-of-the-art' to illustrate what common thread?",
  options: [
    "Hyphenated words raise the question of whether to split into multiple tokens",
    "All contain numbers that must be tokenized separately",
    "All are stop words that should be removed",
    "All require Soundex-based phonetic matching"
  ],
  correct: 0,
  explanation: "All three examples share the theme of hyphenation ambiguity in tokenization. None involve numbers, stop words, or phonetic matching."
},
{
  topic: "Hyphenated Words",
  difficulty: "easy",
  question: "Which of the following is NOT one of the hyphen-related tokenization examples given in the lecture?",
  options: [
    "résumé vs. resume",
    "Hewlett-Packard",
    "state-of-the-art",
    "co-education"
  ],
  correct: 0,
  explanation: "résumé vs. resume is the lecture's example of accent normalization (in the Terms chapter), not a hyphenation example. Hewlett-Packard, state-of-the-art, and co-education are all hyphenation examples from the Tokens chapter."
},

// ===================== Apostrophes / possessives =====================
{
  topic: "Apostrophes",
  difficulty: "medium",
  question: "The lecture raises \"Finland's capital\" to illustrate which tokenization difficulty?",
  options: [
    "Deciding how to tokenize an apostrophe/possessive form (e.g., Finland, Finlands, or Finland's)",
    "Deciding whether Finland is a stop word",
    "Deciding whether to translate the word into another language",
    "Deciding whether the phrase contains a number"
  ],
  correct: 0,
  explanation: "The slide lists several candidate tokenizations of the possessive ('Finland AND s?', 'Finlands?', 'Finland's?'), showing that apostrophes create tokenization ambiguity. It is unrelated to stop words, translation, or numbers."
},
{
  topic: "Apostrophes",
  difficulty: "hard",
  question: "Why might a naive tokenizer that always splits on apostrophes cause problems for a possessive like \"Finland's\"?",
  options: [
    "It may produce a fragment such as 's' that carries little useful meaning on its own, or lose the link back to 'Finland'",
    "It will automatically translate the word into French",
    "It will convert the word into a stop word",
    "It will assign the word a Soundex code instead of a token"
  ],
  correct: 0,
  explanation: "Splitting 'Finland's' can generate an isolated fragment like 's', illustrating why the lecture flags this as an open tokenization question. Apostrophe splitting has nothing to do with translation, stop-word conversion, or Soundex coding."
},

// ===================== Compound words / word segmentation =====================
{
  topic: "Compound Words",
  difficulty: "medium",
  question: "The lecture asks whether \"San Francisco\" is one token or two. What is this an example of?",
  options: [
    "The difficulty of deciding token boundaries for multi-word expressions",
    "The difficulty of removing stop words from proper nouns",
    "The difficulty of normalizing dates",
    "The difficulty of case folding acronyms"
  ],
  correct: 0,
  explanation: "San Francisco illustrates the challenge of segmenting multi-word names into one or more tokens. It is not about stop words, dates, or case folding."
},
{
  topic: "Compound Words",
  difficulty: "hard",
  question: "The lecture follows the \"San Francisco\" example with the question \"How do you decide it is one token?\" What does this best reveal about tokenization?",
  options: [
    "Tokenization boundary decisions can be genuinely ambiguous and require design choices, not just mechanical rules",
    "Tokenization is always fully solved by splitting on whitespace",
    "Tokenization must always treat proper nouns as stop words",
    "Tokenization is irrelevant to multi-word place names"
  ],
  correct: 0,
  explanation: "The rhetorical question underscores that there's no single obviously correct rule — some multi-word expressions are conceptually single units. This contradicts the idea that whitespace-splitting always suffices, and place names are not treated as stop words."
},

// ===================== Numbers in IR =====================
{
  topic: "Numbers in Information Retrieval",
  difficulty: "easy",
  question: "Which of these is used in the lecture as an example of a 'number' tokenization case?",
  options: [
    "3/20/91",
    "Hewlett-Packard",
    "résumé",
    "Tübingen"
  ],
  correct: 0,
  explanation: "3/20/91 is one of the date-format examples under 'Numbers'. Hewlett-Packard is a hyphenation example, résumé is an accent example, and Tübingen is an umlaut example — from different sections."
},
{
  topic: "Numbers in Information Retrieval",
  difficulty: "medium",
  question: "Why does the lecture say numbers 'often have embedded spaces', and why does this matter for tokenization?",
  options: [
    "Examples like phone numbers (e.g., (800) 234-2333) contain spaces internally, so naive whitespace-based tokenization can incorrectly split a single logical number into multiple tokens",
    "Because embedded spaces mean numbers should always be treated as stop words",
    "Because embedded spaces automatically convert numbers into dates",
    "Because embedded spaces make numbers unindexable in any IR system"
  ],
  correct: 0,
  explanation: "The phone number example shows numbers can span whitespace, so a whitespace tokenizer risks fragmenting them. Numbers aren't stop words, don't automatically become dates, and are not inherently unindexable."
},
{
  topic: "Numbers in Information Retrieval",
  difficulty: "hard",
  question: "The lecture notes that older IR systems may not index numbers, but numbers are 'often very useful'. Which example does it give to justify indexing numbers?",
  options: [
    "Looking up error codes or stack traces on the web",
    "Matching French articles like 'l'",
    "Splitting German compound nouns",
    "Removing common stop words"
  ],
  correct: 0,
  explanation: "The slide specifically cites searching for error codes/stack traces as a case where indexing numbers is valuable. The other options relate to unrelated topics (French tokenization, German compounds, stop words)."
},
{
  topic: "Numbers in Information Retrieval",
  difficulty: "hard",
  question: "According to the lecture, what is 'one answer' to the challenge of indexing numbers effectively?",
  options: [
    "Using n-grams",
    "Using a thesaurus",
    "Using Soundex",
    "Using case folding"
  ],
  correct: 0,
  explanation: "The slide states 'One answer is using n-grams: IIR ch. 3' as an approach for number indexing. Thesaurus, Soundex, and case folding are techniques discussed elsewhere for different problems (synonyms, spelling variants, and letter case, respectively)."
},
{
  topic: "Numbers in Information Retrieval",
  difficulty: "medium",
  question: "Which of the following is listed among the lecture's tricky number examples?",
  options: [
    "B-52",
    "L'ensemble",
    "Tuebingen",
    "King of Denmark"
  ],
  correct: 0,
  explanation: "B-52 is one of the number-tokenization examples on the 'Numbers' slide. L'ensemble is a French tokenization example, Tuebingen is an umlaut normalization example, and 'King of Denmark' is the phrase-query example for stop words."
},

// ===================== Metadata =====================
{
  topic: "Metadata",
  difficulty: "easy",
  question: "According to the lecture, what kind of information does 'meta-data' refer to in this context?",
  options: [
    "Information like creation date and format that is often indexed separately from the document text",
    "The list of stop words removed from a document",
    "The Soundex code of every term in a document",
    "The set of synonyms found in a thesaurus"
  ],
  correct: 0,
  explanation: "The slide states systems 'will often index metadata separately', giving creation date and format as examples. It is unrelated to stop words, Soundex, or thesauri."
},
{
  topic: "Metadata",
  difficulty: "medium",
  question: "Why might a search system index metadata such as creation date separately from the body text tokens?",
  options: [
    "Because metadata has a different structure/type than free text and supports filtering or sorting rather than being treated as ordinary content tokens",
    "Because metadata is always a stop word",
    "Because metadata cannot be represented in Unicode",
    "Because metadata always needs Soundex matching"
  ],
  correct: 0,
  explanation: "The lecture's framing (numbers/metadata handled specially, e.g., creation date, format) reflects that such structured fields serve a different retrieval purpose than free-text tokens. The other options are not supported by the slides."
},

// ===================== French / Internationalization =====================
{
  topic: "French Tokenization",
  difficulty: "medium",
  question: "The lecture uses \"L'ensemble\" to illustrate what tokenization issue in French?",
  options: [
    "Whether the apostrophe-joined article should be split into one or two tokens (L, L', or Le)",
    "Whether French numbers should be indexed",
    "Whether French uses stop words at all",
    "Whether German compound splitting applies to French"
  ],
  correct: 0,
  explanation: "The slide explicitly asks 'L'ensemble one token or two? L? L'? Le?' — this is about apostrophe/article splitting, not numbers, stop-word usage in general, or German compounding."
},
{
  topic: "French Tokenization",
  difficulty: "hard",
  question: "Why does the lecture say we want 'l'ensemble' to match with 'un ensemble'?",
  options: [
    "Because the leading article ('l'') is not part of the core meaning, so treating them as equivalent index terms improves retrieval of the underlying concept",
    "Because 'l'ensemble' is a stop word that must be removed",
    "Because French words are always converted to English before indexing",
    "Because 'ensemble' is a proper noun requiring capitalization rules"
  ],
  correct: 0,
  explanation: "The lecture wants the article-attached and article-free forms to be treated equivalently so a search for 'ensemble' finds both. This is a tokenization/matching goal, not about stop-word removal, translation, or capitalization rules."
},
{
  topic: "Tokenization in Different Languages",
  difficulty: "medium",
  question: "The lecture notes that 'until at least 2003, it didn't on Google' regarding l'ensemble/un ensemble matching. What does this anecdote emphasize?",
  options: [
    "That internationalization challenges in tokenization are real, practical problems that even major search engines struggled with",
    "That Google never indexes French text",
    "That French tokenization is easier than English tokenization",
    "That stop words are unique to the French language"
  ],
  correct: 0,
  explanation: "The anecdote is meant to show tokenization/internationalization issues have genuine real-world impact, not that Google avoids French text, that French is 'easier', or that stop words are French-specific."
},

// ===================== German compounds =====================
{
  topic: "German Compound Words",
  difficulty: "easy",
  question: "What does the lecture say about German noun compounds like 'Lebensversicherungsgesellschaftsangestellter'?",
  options: [
    "They are not segmented (written as one long word) and mean something like 'life insurance company employee'",
    "They are automatically split by all German search engines",
    "They are treated as stop words in German IR systems",
    "They cannot be indexed at all"
  ],
  correct: 0,
  explanation: "The slide states German noun compounds 'are not segmented' by default and gives this word's translation as 'life insurance company employee'. It does not say all engines split them automatically, nor are compounds stop words or unindexable."
},
{
  topic: "German Compound Words",
  difficulty: "medium",
  question: "Why do German retrieval systems benefit from a compound splitter module, according to the lecture?",
  options: [
    "Because unsplit compounds bundle multiple meaningful sub-words into a single token, hurting matching against queries that use the sub-words separately",
    "Because German has no spaces between any words",
    "Because compound splitting removes the need for stop lists",
    "Because compound splitting is required to convert German text into Unicode"
  ],
  correct: 0,
  explanation: "Splitting compounds exposes the meaningful sub-words (e.g., 'life', 'insurance', 'company', 'employee') for matching, which is why it helps retrieval. German does have spaces between separate words generally; it's compounds specifically that fuse together. Unicode conversion and stop lists are unrelated."
},
{
  topic: "German Compound Words",
  difficulty: "hard",
  question: "The lecture states that a compound splitter can give what performance boost for German retrieval?",
  options: [
    "A 15% performance boost",
    "A 50% performance boost",
    "A 5% performance boost",
    "No measurable boost"
  ],
  correct: 0,
  explanation: "The slide gives the specific figure of a 15% performance boost from using a compound splitter module in German. The other numbers are not stated in the lecture."
},

// ===================== Chinese / Japanese =====================
{
  topic: "Chinese Tokenization",
  difficulty: "easy",
  question: "What tokenization challenge do Chinese and Japanese share, according to the lecture?",
  options: [
    "They have no spaces between words",
    "They only use numbers, never letters",
    "They have no concept of a 'term'",
    "They require case folding just like English"
  ],
  correct: 0,
  explanation: "The slide states plainly that 'Chinese and Japanese have no spaces between words', making word-boundary detection a core challenge. The other statements are not part of the lecture's claims and case folding (upper/lower case) does not apply to Chinese/Japanese scripts the way it does to English."
},
{
  topic: "Chinese Tokenization",
  difficulty: "medium",
  question: "The lecture notes that Chinese text is 'not always guaranteed a unique tokenization'. What does this mean?",
  options: [
    "The same sequence of characters can often be split into words in more than one valid way",
    "Chinese text must always be translated into English before tokenization",
    "Chinese has more stop words than any other language",
    "Chinese tokenization always requires n-grams and nothing else"
  ],
  correct: 0,
  explanation: "Without spaces, multiple segmentations of the same character sequence can be linguistically plausible, so there isn't one guaranteed correct tokenization. Translation, stop-word counts, and exclusive reliance on n-grams are not claims made in the lecture."
},
{
  topic: "Japanese Tokenization",
  difficulty: "medium",
  question: "What extra complication does the lecture mention specifically for Japanese tokenization (beyond the lack of spaces shared with Chinese)?",
  options: [
    "Multiple alphabets (e.g., Katakana, Hiragana, Kanji, Romaji) can be intermingled in the same text",
    "Japanese never uses numbers or amounts",
    "Japanese words must always be split into single characters",
    "Japanese has no stop words at all"
  ],
  correct: 0,
  explanation: "The slide states Japanese tokenization is 'further complicated... with multiple alphabets intermingled' and lists Katakana, Hiragana, Kanji, and Romaji. It also mentions dates/amounts in multiple formats, not their absence, and doesn't claim anything about single-character splitting or stop words."
},
{
  topic: "Japanese Tokenization",
  difficulty: "hard",
  question: "What does the lecture point out is possible for an end-user querying a Japanese IR system, given the multiple scripts involved?",
  options: [
    "The end-user can express a query entirely in hiragana",
    "The end-user must always use Kanji",
    "The end-user cannot search using Romaji under any circumstances",
    "The end-user must convert their query into Chinese first"
  ],
  correct: 0,
  explanation: "The slide explicitly states 'End-user can express query entirely in hiragana!' as an example of the flexibility (and challenge) multiple scripts create. The other statements contradict or aren't supported by the lecture."
},
{
  topic: "Chinese Tokenization",
  difficulty: "medium",
  question: "Which scripts does the lecture list as being used in Japanese, sometimes intermingled?",
  options: [
    "Katakana, Hiragana, Kanji, Romaji",
    "Cyrillic, Latin, Greek, Arabic",
    "Only Kanji and Latin",
    "Only Hiragana and Katakana"
  ],
  correct: 0,
  explanation: "The lecture lists exactly Katakana, Hiragana, Kanji, and Romaji as the intermingled scripts in Japanese text. The other lists are not what the slide states."
},

// ===================== Arabic / Hebrew =====================
{
  topic: "Arabic Tokenization",
  difficulty: "medium",
  question: "According to the lecture, how is Arabic (or Hebrew) basically written, with what exception?",
  options: [
    "Right to left, but certain items like numbers are written left to right",
    "Left to right, but numbers are written right to left",
    "Top to bottom, with numbers left to right",
    "Right to left with no exceptions at all"
  ],
  correct: 0,
  explanation: "The slide states Arabic/Hebrew is 'basically written right to left, but with certain items like numbers written left to right'. This mixed directionality is the key point, ruling out the other options."
},
{
  topic: "Arabic Tokenization",
  difficulty: "hard",
  question: "The lecture says Arabic words are separated, but letter forms within a word create what complication?",
  options: [
    "Complex ligatures formed by connecting letter shapes within a word",
    "Complete absence of word boundaries, like Chinese",
    "A requirement to remove all vowels before indexing",
    "Automatic conversion into Latin script"
  ],
  correct: 0,
  explanation: "The slide specifically mentions that 'letter forms within a word form complex ligatures', which is a visual/rendering complexity distinct from Chinese's total lack of word boundaries. Vowel removal and Latin-script conversion are not mentioned in the lecture."
},
{
  topic: "Unicode",
  difficulty: "hard",
  question: "With Unicode, how does the lecture describe the relationship between the surface presentation and stored form of Arabic text?",
  options: [
    "The surface presentation is complex, but the stored (underlying) form is straightforward",
    "Both the surface presentation and the stored form are equally complex",
    "The stored form is more complex than the surface presentation",
    "Unicode cannot represent Arabic text at all"
  ],
  correct: 0,
  explanation: "The slide states: 'With Unicode, the surface presentation is complex, but the stored form is straightforward.' This directly contradicts the other three options."
},

// ===================== Token vs Term comparison =====================
{
  topic: "Token vs Term",
  difficulty: "medium",
  question: "Which statement best captures the difference between a token and a term as used in the lecture?",
  options: [
    "A token is a raw instance of a character sequence produced by tokenization; a term is a normalized word type that becomes an actual dictionary entry",
    "A token and a term are exactly the same thing and the words are used interchangeably with no distinction",
    "A term is produced before tokenization and a token is produced after normalization",
    "A token only exists in queries, while a term only exists in documents"
  ],
  correct: 0,
  explanation: "The lecture defines a token as 'an instance of a sequence of characters' (a tokenization output) and a term as 'a (normalized) word type... an entry in our IR system dictionary' (a normalization output). The processing order is tokenization then normalization, the opposite of option C, and both tokens and terms apply to documents and queries alike (option D is false)."
},
{
  topic: "Token vs Term",
  difficulty: "hard",
  question: "A document contains 'U.S.A.' and 'USA' as separate tokens. After normalization they become the same entry, 'USA'. In the lecture's terminology, what is 'USA' now called?",
  options: [
    "A term",
    "A stop word",
    "A candidate token",
    "A Soundex code"
  ],
  correct: 0,
  explanation: "Once tokens are normalized into equivalence classes, the resulting dictionary entry is called a term. It is not a stop word (those are removed, not merged), not merely a 'candidate' token (that stage is before normalization), and not a Soundex code (a distinct phonetic technique)."
},
{
  topic: "Token vs Term",
  difficulty: "easy",
  question: "Which processing stage comes first in the pipeline implied by the lecture: tokenization or normalization to terms?",
  options: [
    "Tokenization",
    "Normalization",
    "They always happen simultaneously and cannot be separated",
    "Normalization always happens before any text is seen"
  ],
  correct: 0,
  explanation: "Tokens are produced first (raw instances of character sequences); they are then normalized into terms. This matches how the lecture presents 'Tokens' before 'Terms' and describes terms as normalized word types."
},

// ===================== Stop words =====================
{
  topic: "Stop Words",
  difficulty: "easy",
  question: "What is a stop list used for, according to the lecture?",
  options: [
    "Excluding the commonest words from the dictionary entirely",
    "Listing all valid tokens for a language",
    "Storing all phonetic codes generated by Soundex",
    "Recording every synonym pair in a thesaurus"
  ],
  correct: 0,
  explanation: "The lecture defines a stop list as the mechanism by which 'you exclude from the dictionary entirely the commonest words'. It's not a list of valid tokens, Soundex codes, or thesaurus synonyms."
},
{
  topic: "Stop Words",
  difficulty: "easy",
  question: "Which of these words is given in the lecture as an example of a common stop word?",
  options: [
    "the",
    "Finland",
    "USA",
    "Windows"
  ],
  correct: 0,
  explanation: "'the' is listed directly among the lecture's stop word examples (the, a, and, to, be). Finland, USA, and Windows are used elsewhere as tokenization/normalization/expansion examples, not stop words."
},
{
  topic: "Stop Words",
  difficulty: "medium",
  question: "What is the main intuition given in the lecture for why certain words are treated as stop words?",
  options: [
    "They have little semantic content and there are a lot of them (about 30% of postings for the top 30 words)",
    "They are always misspelled words",
    "They are proper nouns that need capitalization",
    "They are numbers that older systems could not index"
  ],
  correct: 0,
  explanation: "The lecture's intuition is explicitly: little semantic content, plus high frequency ('~30% of postings for top 30 words'). The other options describe unrelated issues (spelling, capitalization, numbers)."
},
{
  topic: "Stop Words",
  difficulty: "medium",
  question: "Roughly what fraction of postings do the top 30 most common words account for, according to the lecture?",
  options: [
    "About 30%",
    "About 3%",
    "About 75%",
    "About 1%"
  ],
  correct: 0,
  explanation: "The slide states 'There are a lot of them: ~30% of postings for top 30 words', directly supporting this figure."
},
{
  topic: "Advantages of Removing Stop Words",
  difficulty: "medium",
  question: "What is presented as an advantage/reason historically favoring stop word removal?",
  options: [
    "Excluding them shrinks the dictionary/index since they carry little semantic content but appear very frequently",
    "It guarantees perfect phrase query matching",
    "It removes the need for tokenization",
    "It automatically fixes all spelling errors"
  ],
  correct: 0,
  explanation: "The rationale given is reduced index size/content given their low semantic value and high frequency. Removing stop words does not improve phrase-query matching (in fact it can hurt it), doesn't remove the need for tokenization, and has nothing to do with spelling correction."
},
{
  topic: "Disadvantages of Removing Stop Words",
  difficulty: "medium",
  question: "What is the lecture's main reason that 'the trend is away from' removing stop words?",
  options: [
    "Good compression and query optimization techniques mean including stop words costs little space or query-time performance",
    "Stop words have become more meaningful over time",
    "Modern languages no longer have common words",
    "Stop words are now required by law in most countries"
  ],
  correct: 0,
  explanation: "The lecture explicitly attributes the shift to advances in compression (IIR 5) and query optimization (IIR 7), which make keeping stop words cheap. The other options are not stated or plausible reasons from the lecture."
},
{
  topic: "Disadvantages of Removing Stop Words",
  difficulty: "hard",
  question: "Which type of query does the lecture say specifically NEEDS stop words to be preserved?",
  options: [
    "Phrase queries, such as \"King of Denmark\"",
    "Boolean AND queries only",
    "Queries containing only numbers",
    "Queries in Arabic only"
  ],
  correct: 0,
  explanation: "The slide gives 'Phrase queries: \"King of Denmark\"' as a case requiring stop words. It doesn't single out Boolean AND queries, number-only queries, or Arabic queries specifically."
},
{
  topic: "Disadvantages of Removing Stop Words",
  difficulty: "hard",
  question: "The lecture lists song titles like \"Let it be\" and \"To be or not to be\" as examples relevant to which point?",
  options: [
    "These are cases where stop words are essential to the meaning/identity of the phrase, arguing against removing them",
    "These titles should always be excluded from any IR system",
    "These titles demonstrate ideal candidates for Soundex matching",
    "These titles show why numbers must be indexed"
  ],
  correct: 0,
  explanation: "These examples support the 'you need them for...' point — phrases where the so-called stop words carry the meaning. They are not about exclusion, Soundex, or number indexing."
},
{
  topic: "Disadvantages of Removing Stop Words",
  difficulty: "medium",
  question: "'Flights to London' is used in the lecture as an example of which query type that depends on retaining stop words?",
  options: [
    "A 'relational' query",
    "A Boolean NOT query",
    "A stemming example",
    "A German compound query"
  ],
  correct: 0,
  explanation: "The slide labels this as a '\"Relational\" queries' example ('flights to London'), where 'to' is functionally important. It is not described as Boolean NOT, stemming, or a German compound example."
},
{
  topic: "Stop Words",
  difficulty: "hard",
  question: "The lecture quotes a note that Google \"ignores common words and characters... which slow down your search without improving the results,\" but adds a caveat. What is that caveat?",
  options: [
    "You can explicitly ask for the common words to remain",
    "Google never actually removes any words",
    "The caveat only applies to numbers, not words",
    "Stop words are permanently banned from all Google queries"
  ],
  correct: 0,
  explanation: "The notes slide adds '(Though you can explicitly ask for them to remain.)' immediately after the quoted claim, meaning users have some control. The other options misstate or contradict this."
},

// ===================== Normalization to terms =====================
{
  topic: "Normalization to Terms",
  difficulty: "easy",
  question: "What is the general purpose of normalization according to the lecture?",
  options: [
    "To put words in indexed text and query words into the same form so equivalent variants can match each other",
    "To remove all numbers from a document",
    "To translate documents into a single global language",
    "To assign each document a unique identifier"
  ],
  correct: 0,
  explanation: "The lecture states we 'normalize' words in both indexed text and queries into the same form, e.g., so U.S.A. matches USA. It is not about removing numbers, translating languages, or assigning IDs."
},
{
  topic: "Normalization to Terms",
  difficulty: "easy",
  question: "What example does the lecture give to motivate why normalization is needed?",
  options: [
    "Wanting to match U.S.A. and USA",
    "Wanting to match 'the' and 'a'",
    "Wanting to match Kanji and Hiragana",
    "Wanting to match B-52 and 55 B.C."
  ],
  correct: 0,
  explanation: "The lecture's opening motivating example for normalization is matching 'U.S.A.' and 'USA'. The other pairs are drawn from unrelated sections (stop words, Japanese scripts, number examples)."
},
{
  topic: "Normalization to Terms",
  difficulty: "medium",
  question: "How does the lecture define a term?",
  options: [
    "A (normalized) word type, which is an entry in the IR system's dictionary",
    "Any raw character sequence extracted from a document before processing",
    "A phonetic code representing pronunciation",
    "A word explicitly excluded from the index"
  ],
  correct: 0,
  explanation: "The lecture states: 'Result is terms: a term is a (normalized) word type, which is an entry in our IR system dictionary.' The other definitions describe tokens, Soundex codes, and stop words respectively."
},
{
  topic: "Equivalent Terms",
  difficulty: "medium",
  question: "The lecture says we 'most commonly implicitly define equivalence classes of terms' by doing what?",
  options: [
    "Operations like deleting periods or deleting hyphens to unify variant spellings into one term",
    "Manually asking every user to pick their preferred spelling",
    "Translating every term into Latin",
    "Assigning random numeric IDs to each spelling variant"
  ],
  correct: 0,
  explanation: "The two concrete examples given are deleting periods (U.S.A., USA -> USA) and deleting hyphens (anti-discriminatory, antidiscriminatory -> antidiscriminatory). None of the other options are described in the lecture."
},
{
  topic: "U.S.A. vs USA",
  difficulty: "easy",
  question: "Deleting periods from 'U.S.A.' and 'USA' to form a single term illustrates which concept?",
  options: [
    "Defining an equivalence class of terms",
    "Removing a stop word",
    "Applying Soundex",
    "Splitting a compound word"
  ],
  correct: 0,
  explanation: "This is the lecture's direct example of forming an equivalence class via period deletion. It is not stop word removal, Soundex, or compound splitting."
},
{
  topic: "Hyphen Removal",
  difficulty: "medium",
  question: "'anti-discriminatory' and 'antidiscriminatory' are unified into a single term by which operation, per the lecture?",
  options: [
    "Deleting hyphens to form the term 'antidiscriminatory'",
    "Deleting vowels",
    "Applying case folding only",
    "Applying Soundex phonetic coding"
  ],
  correct: 0,
  explanation: "The lecture explicitly gives this as the hyphen-deletion equivalence-class example. Vowel deletion, case folding alone, and Soundex are not what's described here."
},

// ===================== Normalization: other languages (accents, umlauts, dates) =====================
{
  topic: "Accent Removal",
  difficulty: "easy",
  question: "Which example does the lecture give for accent normalization?",
  options: [
    "French résumé vs. resume",
    "German Tübingen vs. Tuebingen",
    "Japanese 7月30日 vs. 7/30",
    "English Fed vs. fed"
  ],
  correct: 0,
  explanation: "The slide lists 'Accents: e.g., French résumé vs. resume.' as its accent example. The Tübingen example is given under umlauts, the date example is separate, and 'Fed vs. fed' is a case-folding example."
},
{
  topic: "Umlauts",
  difficulty: "easy",
  question: "The lecture gives 'Tuebingen vs. Tübingen' as an example of what normalization issue?",
  options: [
    "Umlauts, which the lecture says should be treated as equivalent",
    "Case folding exceptions",
    "Phrase query preservation",
    "Compound splitting"
  ],
  correct: 0,
  explanation: "The lecture explicitly labels this as an umlaut example and states these forms 'should be equivalent'. It is not about case-folding exceptions, phrase queries, or compound splitting."
},
{
  topic: "Language-dependent Normalization",
  difficulty: "hard",
  question: "For accents and umlauts, what does the lecture say is the 'most important criterion' for deciding how to normalize?",
  options: [
    "How users are likely to write their queries for these words",
    "Whichever spelling appears most often in printed dictionaries",
    "Whichever spelling is grammatically 'correct' according to the source language",
    "Whichever spelling is shortest"
  ],
  correct: 0,
  explanation: "The slide states: 'Most important criterion: How are your users like to write their queries for these words?' This is a user-behavior-driven criterion, not dictionary frequency, grammatical correctness, or brevity."
},
{
  topic: "Accent Removal",
  difficulty: "medium",
  question: "The lecture notes that even in languages that standardly use accents, what do users often do when typing queries?",
  options: [
    "They often may not type the accents",
    "They always type accents perfectly",
    "They avoid using that language's search engine",
    "They switch to a different alphabet entirely"
  ],
  correct: 0,
  explanation: "The lecture states: 'Even in languages that standardly have accents, users often may not type them' — motivating normalizing to a de-accented form. The other options are not claims made in the lecture."
},
{
  topic: "Accent Removal",
  difficulty: "medium",
  question: "Given the example 'Tuebingen, Tübingen, Tubingen -> Tubingen', what normalization strategy does the lecture recommend?",
  options: [
    "Normalizing to a de-accented term",
    "Keeping all three spellings as separate, unrelated terms",
    "Normalizing to the fully accented form only",
    "Deleting the word entirely as a stop word"
  ],
  correct: 0,
  explanation: "The lecture states it's 'Often best to normalize to a de-accented term', and the arrow shows all three variants collapsing to the de-accented 'Tubingen'. The other options contradict this guidance."
},
{
  topic: "Date Normalization",
  difficulty: "medium",
  question: "What date-related normalization example does the lecture give for Japanese?",
  options: [
    "7月30日 vs. 7/30",
    "3/20/91 vs. Mar. 12, 1991",
    "55 B.C. vs. 55BC",
    "(800) 234-2333 vs. 8002342333"
  ],
  correct: 0,
  explanation: "The lecture's 'Normalization: other languages' slide specifically gives '7月30日 vs. 7/30' as a Japanese date normalization example. The 3/20/91 example is from the earlier 'Numbers' slide about tokenization, not normalization."
},
{
  topic: "Date Normalization",
  difficulty: "hard",
  question: "The lecture ties date normalization to what broader issue involving Japanese?",
  options: [
    "The use of kana vs. Chinese characters, and that tokenization/normalization may depend on the language and be intertwined with language detection",
    "The complete absence of numbers in Japanese text",
    "The requirement to always use Romaji for dates",
    "The need to remove all dates as stop words"
  ],
  correct: 0,
  explanation: "The slide connects the date example to 'Japanese use of kana vs. Chinese characters' and notes tokenization/normalization can depend on language, tying into language detection. It doesn't claim an absence of numbers, a Romaji-only rule, or stop-word removal of dates."
},
{
  topic: "Date Normalization",
  difficulty: "hard",
  question: "The lecture's 'Morgen will ich in MIT' example (is this German 'mit' or English 'MIT'?) illustrates what crucial point?",
  options: [
    "The need to normalize indexed text and query terms identically, which can be language-dependent and ambiguous",
    "That MIT should always be treated as a stop word",
    "That German text should never be normalized",
    "That case folding should never be applied to acronyms"
  ],
  correct: 0,
  explanation: "This example directly follows the lecture's statement that it's 'Crucial: Need to normalize indexed text as well as query terms identically', showing the ambiguity language-dependent normalization must resolve. It doesn't argue MIT is a stop word or that German text/acronyms should be exempt from processing."
},

// ===================== Case folding =====================
{
  topic: "Case Folding",
  difficulty: "easy",
  question: "What does case folding mean, according to the lecture?",
  options: [
    "Reducing all letters to lower case",
    "Splitting compound words into parts",
    "Removing stop words from a query",
    "Assigning phonetic codes to words"
  ],
  correct: 0,
  explanation: "The lecture defines case folding simply as: 'Reduce all letters to lower case.' It is unrelated to compound splitting, stop word removal, or phonetic coding."
},
{
  topic: "Lowercase Conversion",
  difficulty: "medium",
  question: "Why does the lecture say it is often best to lowercase everything?",
  options: [
    "Because users will use lowercase regardless of the 'correct' capitalization",
    "Because uppercase letters are not supported in Unicode",
    "Because lowercase text compresses better than uppercase text",
    "Because search engines cannot index uppercase letters"
  ],
  correct: 0,
  explanation: "The slide states: 'Often best to lower case everything, since users will use lowercase regardless of 'correct' capitalization…' The other reasons (Unicode support, compression, indexing limits on uppercase) are not given in the lecture and are not accurate."
},
{
  topic: "Exceptions to Case Folding",
  difficulty: "medium",
  question: "What potential exception to blanket case folding does the lecture raise?",
  options: [
    "Upper case occurring mid-sentence, e.g., in 'General Motors'",
    "Upper case occurring only at the start of a sentence",
    "Upper case occurring in numbers like B-52",
    "Upper case occurring in stop words"
  ],
  correct: 0,
  explanation: "The lecture asks 'exception: upper case in mid-sentence? e.g., General Motors', flagging that meaningful capitalization (like a proper noun mid-sentence) can be lost by naive lowercasing. The other options are not the exception discussed."
},
{
  topic: "Exceptions to Case Folding",
  difficulty: "medium",
  question: "Which pair of examples does the lecture use to show that case can carry meaningful distinctions?",
  options: [
    "Fed vs. fed, and SAIL vs. sail",
    "USA vs. U.S.A.",
    "Windows vs. windows vs. window",
    "Tübingen vs. Tuebingen"
  ],
  correct: 0,
  explanation: "The case-folding slide gives 'Fed vs. fed' and 'SAIL vs. sail' as examples where capitalization changes meaning (e.g., the Federal Reserve vs. the verb 'fed', or the SAIL institution vs. the verb 'sail'). The USA/U.S.A. pair is a period-deletion example, Windows/windows/window is an asymmetric expansion example, and Tübingen/Tuebingen is an umlaut example."
},
{
  topic: "Exceptions to Case Folding",
  difficulty: "hard",
  question: "The lecture's Google 'C.A.T.' example (fixed in 2011) shows what consequence of over-aggressive case folding / normalization?",
  options: [
    "A query for the acronym C.A.T. returned 'cats' results (e.g., Lolcats) instead of Caterpillar Inc., because the distinct-case meaning was lost",
    "Google stopped indexing any text containing periods",
    "Google began indexing only uppercase acronyms",
    "Google merged all search engines into a single index"
  ],
  correct: 0,
  explanation: "The slide's punchline is that the #1 result for 'C.A.T.' was for 'cats' (Lolcats), not Caterpillar Inc., showing how folding away distinctions like C.A.T. vs. cat can produce unintended matches. The other statements are not part of the example."
},
{
  topic: "Case Folding",
  difficulty: "hard",
  question: "Comparing case folding to normalization in general, which statement is most accurate based on the lecture?",
  options: [
    "Case folding is one specific type of normalization, focused specifically on letter case, alongside other normalization operations like accent or hyphen removal",
    "Case folding and normalization are entirely unrelated processes covered in different lecture chapters",
    "Case folding always happens before tokenization",
    "Case folding replaces the need for equivalence classing entirely"
  ],
  correct: 0,
  explanation: "Case folding is presented under 'Sec. 2.2.3' alongside other normalization topics (accents, umlauts, dates), i.e., it is a specific normalization operation. It's not from a separate chapter, doesn't precede tokenization, and doesn't replace equivalence classing — it's an example of it (case-insensitive matching is itself a kind of equivalence class)."
},

// ===================== Asymmetric expansion =====================
{
  topic: "Asymmetric Expansion",
  difficulty: "medium",
  question: "What is asymmetric expansion, as presented in the lecture?",
  options: [
    "An alternative to equivalence classing where a query term is expanded into a set of related forms based on what was actually entered",
    "A method of translating queries into multiple languages simultaneously",
    "A way to shrink the dictionary by merging all case variants",
    "A phonetic matching technique similar to Soundex"
  ],
  correct: 0,
  explanation: "The slide introduces it as: 'An alternative to equivalence classing is to do asymmetric expansion,' with the window/windows/Windows example. It is not translation, dictionary shrinking, or phonetic matching."
},
{
  topic: "Query Expansion",
  difficulty: "hard",
  question: "In the lecture's asymmetric expansion example, entering the query 'window' expands the search to which forms?",
  options: [
    "window, windows",
    "Windows only",
    "window, windows, Windows",
    "No expansion occurs"
  ],
  correct: 0,
  explanation: "The slide shows: 'Enter: window -> Search: window, windows' (lowercase 'window' expands to include 'windows' but not the capitalized product name 'Windows'). The full 3-way expansion is instead shown for entering lowercase 'windows'."
},
{
  topic: "Query Expansion",
  difficulty: "hard",
  question: "In the lecture's asymmetric expansion example, why does entering 'Windows' (capitalized) search only for 'Windows'?",
  options: [
    "Because the capitalization signals the user likely means the specific product, so expansion is not applied the same way as for the lowercase forms",
    "Because capitalized queries are always treated as stop words",
    "Because 'Windows' cannot be tokenized",
    "Because the system always ignores capital letters entirely"
  ],
  correct: 0,
  explanation: "The asymmetry in the example — window -> {window, windows}, windows -> {Windows, windows, window}, Windows -> {Windows} — reflects that the specific capitalized query is treated as unambiguous. It's not about stop words, tokenization failure, or ignoring capitals (ignoring capitals entirely would be plain case folding, not asymmetric expansion)."
},
{
  topic: "Asymmetric Expansion",
  difficulty: "hard",
  question: "What tradeoff does the lecture identify for asymmetric expansion compared to equivalence classing?",
  options: [
    "It is potentially more powerful, but less efficient",
    "It is always faster and always more accurate with no downsides",
    "It eliminates the need for a dictionary",
    "It only works for numbers, not words"
  ],
  correct: 0,
  explanation: "The slide states directly: 'Potentially more powerful, but less efficient.' This rules out the 'no downsides' claim, and the technique is not limited to numbers nor does it eliminate the dictionary."
},

// ===================== Thesaurus / synonyms / homonyms =====================
{
  topic: "Thesaurus",
  difficulty: "easy",
  question: "What problem does a thesaurus (hand-constructed equivalence classes) address, according to the lecture?",
  options: [
    "Handling synonyms, such as car = automobile or color = colour",
    "Handling numbers embedded in text",
    "Handling right-to-left scripts like Arabic",
    "Handling stop words in phrase queries"
  ],
  correct: 0,
  explanation: "The slide asks 'Do we handle synonyms and homonyms? E.g., by hand-constructed equivalence classes' with car=automobile, color=colour as synonym examples. It is unrelated to numbers, script direction, or stop words."
},
{
  topic: "Synonyms",
  difficulty: "medium",
  question: "The lecture describes two ways to use synonym equivalence classes: rewriting into class terms, or expanding a query. What does 'rewriting to form equivalence-class terms' mean in the car/automobile example?",
  options: [
    "When a document contains 'automobile', it is indexed under a combined form like 'car-automobile' (and vice versa)",
    "The word 'automobile' is deleted from the document entirely",
    "The word 'automobile' is translated into French",
    "The word 'automobile' is treated as a stop word"
  ],
  correct: 0,
  explanation: "The slide states: 'When the document contains automobile, index it under car-automobile (and vice-versa)' as the rewriting approach. It's not deletion, translation, or stop-word treatment."
},
{
  topic: "Synonyms",
  difficulty: "medium",
  question: "What is the alternative to rewriting equivalence-class terms, described in the lecture's synonym handling?",
  options: [
    "Expanding a query: when the query contains 'automobile', also look under 'car'",
    "Deleting synonyms from the query entirely",
    "Requiring the user to manually pick the correct synonym",
    "Rejecting queries that contain synonyms"
  ],
  correct: 0,
  explanation: "The lecture states: 'Or we can expand a query: When the query contains automobile, look under car as well.' This is query-time expansion, distinct from document-time rewriting, and not deletion or manual selection."
},
{
  topic: "Homonyms",
  difficulty: "medium",
  question: "The lecture pairs 'synonyms' with which other concept when asking 'Do we handle synonyms and homonyms?'",
  options: [
    "Homonyms",
    "Antonyms",
    "Acronyms",
    "Stop words"
  ],
  correct: 0,
  explanation: "The slide's exact phrasing pairs synonyms with homonyms as the two phenomena a thesaurus-like approach might need to address. Antonyms, acronyms, and stop words are not mentioned in this context."
},

// ===================== Soundex =====================
{
  topic: "Soundex",
  difficulty: "easy",
  question: "What problem is Soundex introduced to address, according to the lecture?",
  options: [
    "Spelling mistakes",
    "German compound words",
    "Numbers with embedded spaces",
    "Right-to-left text direction"
  ],
  correct: 0,
  explanation: "The slide poses 'What about spelling mistakes?' and answers 'One approach is Soundex'. It is not designed for German compounds, embedded-space numbers, or bidirectional text."
},
{
  topic: "Soundex",
  difficulty: "medium",
  question: "How does the lecture describe the mechanism Soundex uses to form equivalence classes?",
  options: [
    "Based on phonetic heuristics — grouping words that sound similar",
    "Based on exact character-for-character string matching",
    "Based on the alphabetical order of words",
    "Based on translating words into a reference language"
  ],
  correct: 0,
  explanation: "The lecture states Soundex 'forms equivalence classes of words based on phonetic heuristics'. This is about sound-alike grouping, not exact string matching, alphabetical order, or translation."
},
{
  topic: "Phonetic Matching",
  difficulty: "hard",
  question: "How does Soundex's phonetic approach differ conceptually from a thesaurus's synonym-based approach, based on the lecture?",
  options: [
    "Soundex groups words by how they sound (useful for spelling variation), while a thesaurus groups words by meaning (useful for true synonyms like car/automobile)",
    "They are identical techniques with different names",
    "Soundex only works on numbers, while a thesaurus only works on words",
    "A thesaurus is a phonetic technique, while Soundex is a meaning-based technique"
  ],
  correct: 0,
  explanation: "The lecture separates these: thesaurus handles synonyms/homonyms via hand-built meaning-based equivalence classes, while Soundex specifically targets spelling mistakes via phonetic heuristics. They are not identical, not number-only, and the meaning/phonetic association in option D is reversed."
},
{
  topic: "Soundex",
  difficulty: "medium",
  question: "According to the lecture, where can students find more detail on Soundex?",
  options: [
    "IIR chapters 3 and 9",
    "IIR chapters 5 and 7",
    "IIR chapter 2 only",
    "No further reference is given"
  ],
  correct: 0,
  explanation: "The slide notes: 'More in IIR 3 and IIR 9.' IIR 5 and 7 are instead referenced earlier for compression and query optimization (in the stop-words discussion)."
},

// ===================== Comparison / synthesis questions =====================
{
  topic: "Query Expansion",
  difficulty: "hard",
  question: "Which of the following pairs correctly matches a normalization technique with its primary purpose, per the lecture?",
  options: [
    "Soundex -> handling spelling mistakes; Thesaurus -> handling synonyms/homonyms",
    "Soundex -> handling German compounds; Thesaurus -> handling numbers",
    "Soundex -> handling case folding; Thesaurus -> handling stop words",
    "Soundex -> handling stop words; Thesaurus -> handling case folding"
  ],
  correct: 0,
  explanation: "This matches the lecture directly: Soundex addresses spelling mistakes via phonetic heuristics, while a thesaurus (hand-built equivalence classes) addresses synonyms and homonyms. The other pairings mix in unrelated topics (compounds, numbers, case folding, stop words) that the lecture does not connect to Soundex or thesauri."
},
{
  topic: "Normalization",
  difficulty: "hard",
  question: "Which of the following is the odd one out — NOT an equivalence-class normalization example from the lecture?",
  options: [
    "Breaking 'state-of-the-art' into 4 tokens",
    "Deleting periods: U.S.A., USA -> USA",
    "Deleting hyphens: anti-discriminatory, antidiscriminatory -> antidiscriminatory",
    "De-accenting: Tuebingen, Tübingen, Tubingen -> Tubingen"
  ],
  correct: 0,
  explanation: "Breaking a hyphenated sequence into separate tokens is a tokenization issue (Chapter 2), not a normalization equivalence-class example (Chapter 3). The other three are all explicit equivalence-class examples under normalization."
},
{
  topic: "Normalization",
  difficulty: "medium",
  question: "Which statement about tokenization vs. normalization best matches the lecture's overall structure?",
  options: [
    "Tokenization decides what character sequences count as tokens; normalization further transforms tokens (e.g., merging variants) into terms for the dictionary",
    "Normalization happens first and produces the raw tokens that tokenization later refines",
    "Tokenization and normalization are two names for exactly the same step",
    "Normalization only applies to numbers, while tokenization only applies to words"
  ],
  correct: 0,
  explanation: "The lecture's two chapters follow this order and relationship: Tokens (tokenization, raw candidate tokens) then Terms (normalization into dictionary entries). The reversed order, the 'same step' claim, and the numbers/words split in the other options are not supported by the slides."
},
{
  topic: "Stop Words",
  difficulty: "hard",
  question: "A modern web search engine keeps stop words in its index rather than excluding them, unlike older systems. Which combination of lecture points best explains this design choice?",
  options: [
    "Good compression and query optimization make keeping them cheap, and phrase/relational queries (e.g., 'King of Denmark', 'flights to London') need them to work correctly",
    "Stop words are now considered rare words with high semantic value",
    "Modern systems no longer support Boolean queries",
    "Stop words were reclassified as numbers in modern IR"
  ],
  correct: 0,
  explanation: "The lecture gives exactly these two combined reasons — cheap storage/retrieval (compression, query optimization) plus the functional need for stop words in phrase and relational queries. The other options are not claims in the lecture and are inconsistent with it (stop words are still described as having little semantic content)."
},
{
  topic: "Tokenization",
  difficulty: "hard",
  question: "Which scenario best illustrates why the lecture treats tokenization as language-dependent rather than a single universal algorithm?",
  options: [
    "English tokenization mainly deals with hyphens/apostrophes, German must consider compound splitting, and Chinese/Japanese must handle the total absence of spaces between words",
    "Every language uses exactly the same whitespace-splitting rule with no exceptions",
    "Only English text needs to be tokenized; other languages are indexed as whole documents",
    "Tokenization rules are decided randomly for each document regardless of language"
  ],
  correct: 0,
  explanation: "The lecture walks through language-specific issues — English hyphens/apostrophes, French articles, German compounds, Chinese/Japanese lack of spaces, Arabic bidirectionality — showing tokenization must adapt per language. The other options directly contradict this language-by-language treatment."
},
{
  topic: "Normalization",
  difficulty: "medium",
  question: "Which of the following best distinguishes equivalence classing from asymmetric expansion, per the lecture?",
  options: [
    "Equivalence classing treats variant forms as fully interchangeable at index time, while asymmetric expansion applies query-dependent expansion that can differ depending on exactly what was typed",
    "They are two different names for exactly the same operation",
    "Equivalence classing only works for numbers, and asymmetric expansion only works for dates",
    "Asymmetric expansion happens before tokenization, while equivalence classing happens after"
  ],
  correct: 0,
  explanation: "The window/windows/Windows example shows expansion depends on the exact query form typed (asymmetric), whereas equivalence classing (e.g., U.S.A./USA) merges forms uniformly. They are not the same operation, are not limited to numbers/dates, and the ordering claim in option D is unsupported."
},

// ===================== More application/scenario style =====================
{
  topic: "Tokenization Problems",
  difficulty: "medium",
  question: "A search system tokenizes 'San Francisco' as two separate tokens 'San' and 'Francisco' with no special handling. Based on the lecture's discussion, what risk does this create?",
  options: [
    "Queries or documents that treat 'San Francisco' as a single conceptual unit (a city name) may not be matched or ranked as intended",
    "The system will automatically apply Soundex to the two tokens",
    "The system will treat both tokens as stop words",
    "The system will fail to index any other multi-word names"
  ],
  correct: 0,
  explanation: "The lecture's 'San Francisco' example exists precisely to highlight this boundary-decision risk for multi-word expressions. It doesn't trigger automatic Soundex, stop-word treatment, or a general indexing failure for other names."
},
{
  topic: "Multi-word Expressions",
  difficulty: "hard",
  question: "Why might treating every hyphen as a token separator (as with 'state-of-the-art' -> state, of, the, art) sometimes be undesirable?",
  options: [
    "It can break apart a multi-word expression that functions as a single meaningful unit, potentially harming retrieval of the intended concept",
    "It always produces exactly one token from any hyphenated phrase",
    "It converts the phrase into a stop word automatically",
    "It requires switching the document's language"
  ],
  correct: 0,
  explanation: "The concern (echoed across the hyphen examples) is that splitting can lose the compound meaning. It does not produce a single token (it does the opposite — multiple tokens), doesn't create a stop word, and has nothing to do with switching languages."
},
{
  topic: "Tokenization Problems",
  difficulty: "medium",
  question: "Which of these is presented in the lecture purely as an OPEN QUESTION (no single correct answer given), rather than a technique with a defined procedure?",
  options: [
    "Whether 'Hewlett-Packard' should be one or two tokens",
    "The definition of a stop list",
    "The formula used for deleting periods to normalize U.S.A. to USA",
    "The list of Japanese scripts (Katakana, Hiragana, Kanji, Romaji)"
  ],
  correct: 0,
  explanation: "The lecture poses the Hewlett-Packard hyphenation case as an open issue ('...as two tokens?') without resolving it, unlike the stop list definition, the period-deletion normalization example, or the listed Japanese scripts, all of which are stated as facts/techniques."
},
{
  topic: "Query Optimization",
  difficulty: "hard",
  question: "The lecture references 'good query optimization techniques (IIR 7)' as a reason stop words can be kept cheaply. What does this imply about the relationship between preprocessing decisions (like stop word removal) and system engineering?",
  options: [
    "Preprocessing choices can be influenced by advances elsewhere in the system (e.g., in query processing efficiency), not just by linguistic considerations alone",
    "Query optimization has no effect on whether stop words should be removed",
    "Stop word removal is purely a linguistic decision unrelated to system performance",
    "Query optimization techniques replace the need for any tokenization"
  ],
  correct: 0,
  explanation: "The lecture explicitly ties the stop-word trend to engineering advances (compression and query optimization), showing preprocessing and systems considerations interact. The other options understate or misstate this connection."
},
{
  topic: "Dictionary",
  difficulty: "easy",
  question: "In the lecture's terminology, what is the 'dictionary' of an IR system made up of?",
  options: [
    "Terms — normalized word types that serve as index entries",
    "Raw, unprocessed tokens exactly as they appear in documents",
    "Only the stop words removed from documents",
    "A list of all documents in the collection"
  ],
  correct: 0,
  explanation: "The lecture states a term 'is an entry in our IR system dictionary', so the dictionary consists of terms, not raw tokens, not stop words (which are excluded), and not a document list."
},

// ===================== Additional coverage / true-false / except style =====================
{
  topic: "Tokenization",
  difficulty: "easy",
  question: "All of the following are tokenization issues discussed in the lecture EXCEPT:",
  options: [
    "Deciding phonetic equivalence classes with Soundex",
    "Hyphenated words like Hewlett-Packard",
    "Apostrophes like Finland's",
    "Numbers with embedded spaces like phone numbers"
  ],
  correct: 0,
  explanation: "Soundex is a Terms-chapter (normalization) technique for spelling variation, not a tokenization issue. Hyphenation, apostrophes, and embedded-space numbers are all raised specifically in the Tokens chapter."
},
{
  topic: "Normalization",
  difficulty: "medium",
  question: "Which statement about normalization is TRUE according to the lecture?",
  options: [
    "Normalization must be applied identically to both indexed text and query terms for matching to work correctly",
    "Normalization is only ever applied to query terms, never to indexed documents",
    "Normalization removes the need for a dictionary entirely",
    "Normalization is identical across all languages with no exceptions"
  ],
  correct: 0,
  explanation: "The lecture states it's 'Crucial: Need to normalize indexed text as well as query terms identically'. It applies to both documents and queries (not queries only), still results in a dictionary of terms, and is explicitly shown to vary by language (e.g., German vs. Japanese examples)."
},
{
  topic: "Case Folding",
  difficulty: "medium",
  question: "Which statement about case folding is FALSE according to the lecture?",
  options: [
    "Case folding always preserves distinctions like 'Fed' vs. 'fed' without exception",
    "Case folding reduces all letters to lower case",
    "Blanket case folding can cause unwanted matches, as in the Google C.A.T. example",
    "It's often best to lowercase everything because users type in lowercase regardless of correct capitalization"
  ],
  correct: 0,
  explanation: "This is false — the lecture explicitly flags 'Fed vs. fed' and 'SAIL vs. sail' as cases where blanket case folding LOSES a meaningful distinction, which is presented as a concern, not something case folding 'always preserves'. The other three statements are directly supported by the slides."
},
{
  topic: "Stop Words",
  difficulty: "medium",
  question: "Which of the following is NOT given in the lecture as a reason you might need to keep stop words?",
  options: [
    "They significantly improve Soundex phonetic accuracy",
    "Phrase queries like 'King of Denmark'",
    "Song titles like 'Let it be'",
    "Relational queries like 'flights to London'"
  ],
  correct: 0,
  explanation: "Soundex accuracy is never linked to stop words in the lecture — Soundex addresses phonetic/spelling variation, an entirely separate topic. Phrase queries, song titles, and relational queries are all explicitly listed reasons to keep stop words."
},
{
  topic: "Tokenization in Different Languages",
  difficulty: "medium",
  question: "Which of the following language-specific tokenization facts is INCORRECTLY paired, based on the lecture?",
  options: [
    "Arabic — has no word boundaries at all, exactly like Chinese",
    "German — noun compounds are not segmented by default",
    "Chinese — no spaces between words",
    "Japanese — multiple intermingled alphabets"
  ],
  correct: 0,
  explanation: "This pairing is incorrect: the lecture says Arabic words ARE separated (unlike Chinese, which lacks spaces); Arabic's complication is complex ligatures within words and right-to-left direction with numbers left-to-right, not a total lack of word boundaries. The other three pairings match the lecture exactly."
},
{
  topic: "Numbers in Information Retrieval",
  difficulty: "medium",
  question: "Which statement about numbers in IR is TRUE according to the lecture?",
  options: [
    "Older IR systems may not index numbers, even though numbers can be very useful (e.g., for error codes)",
    "Numbers are always treated as stop words",
    "Numbers never appear with embedded spaces",
    "Numbers are indexed identically to metadata in every system"
  ],
  correct: 0,
  explanation: "This directly matches the lecture: 'Older IR systems may not index numbers... But often very useful.' Numbers are not framed as stop words, they do have embedded-space examples (phone numbers), and metadata is discussed as a separate, distinct category."
},

// ===================== Additional batch: broader coverage =====================
{
  topic: "Tokenization",
  difficulty: "easy",
  question: "Which chapter/topic pairing matches the lecture's own organization?",
  options: [
    "Tokens deals with tokenization issues; Terms deals with normalization and the dictionary",
    "Tokens deals with stop words; Terms deals with hyphenation",
    "Tokens and Terms cover exactly the same material twice",
    "Tokens deals with Soundex; Terms deals with tokenization"
  ],
  correct: 0,
  explanation: "The 'Tokens' deck covers tokenization (hyphens, apostrophes, numbers, language issues) while the 'Terms' deck covers stop words, normalization, case folding, expansion, thesauri, and Soundex — building the dictionary. The other pairings swap topics incorrectly."
},
{
  topic: "Candidate Tokens",
  difficulty: "medium",
  question: "Before further processing, what is a raw token best described as?",
  options: [
    "A candidate for an index entry",
    "A finalized dictionary term",
    "A stop word awaiting removal",
    "A phonetic hash code"
  ],
  correct: 0,
  explanation: "The lecture explicitly calls each token 'a candidate for an index entry, after further processing' — it is not yet a finalized term, not necessarily a stop word, and not a phonetic code."
},
{
  topic: "Index Entries",
  difficulty: "medium",
  question: "What must happen to a token before it becomes a full index entry, according to the lecture's framing?",
  options: [
    "Further processing, described later as normalization into terms",
    "It must be translated into English",
    "It must be assigned a random ID",
    "It must be manually approved by a human editor"
  ],
  correct: 0,
  explanation: "The lecture says tokens become candidates for index entries 'after further processing... described below', which the Terms chapter fleshes out as normalization. Translation, random IDs, and manual approval are not mentioned."
},
{
  topic: "Hyphenated Words",
  difficulty: "hard",
  question: "If a system always keeps hyphenated words as single tokens (never splitting them), what tradeoff does this create based on the lecture's framing of the hyphen problem?",
  options: [
    "It may fail to match a query that uses the unhyphenated or split form of the same concept, since the lecture shows both splitting and non-splitting cause issues depending on the case",
    "It guarantees perfect retrieval for every hyphenated phrase",
    "It automatically converts the word into a stop word",
    "It has no effect on retrieval whatsoever"
  ],
  correct: 0,
  explanation: "Since the lecture shows hyphenation is genuinely ambiguous (sometimes splitting helps, as in state-of-the-art; sometimes keeping together matters, as in Hewlett-Packard as a single company name), always choosing one policy creates mismatches in some cases. It doesn't guarantee perfection, isn't related to stop words, and clearly does affect retrieval."
},
{
  topic: "Apostrophes",
  difficulty: "medium",
  question: "Which of these tokenization outcomes for \"Finland's\" does the lecture explicitly pose as a candidate option?",
  options: [
    "Finland AND s",
    "Finlandish",
    "Finland_possessive",
    "FIN"
  ],
  correct: 0,
  explanation: "The slide lists 'Finland AND s?' 'Finlands?' and 'Finland's?' as the candidate tokenizations it considers. The other forms are not mentioned in the lecture."
},
{
  topic: "Compound Words",
  difficulty: "medium",
  question: "The 'San Francisco' tokenization question is analogous to which other lecture example in terms of the underlying issue (single vs. multiple token boundary)?",
  options: [
    "Hewlett-Packard as one or two tokens",
    "Soundex phonetic coding",
    "Deleting periods in U.S.A.",
    "Case folding of Fed vs. fed"
  ],
  correct: 0,
  explanation: "Both San Francisco and Hewlett-Packard raise the same underlying question: should a multi-part name be one token or split into several? Soundex, period deletion, and case folding are different kinds of processing (phonetic matching and normalization), not boundary-decision issues."
},
{
  topic: "Numbers in Information Retrieval",
  difficulty: "medium",
  question: "'55 B.C.' and 'Mar. 12, 1991' both appear in the lecture's Numbers slide. What do they have in common as tokenization challenges?",
  options: [
    "They combine numeric and non-numeric text into a single meaningful unit, complicating simple tokenization rules",
    "They are both stop words",
    "They both require Soundex",
    "They both need to be translated into another language"
  ],
  correct: 0,
  explanation: "Both examples mix digits, letters, and punctuation into one meaningful date expression — a token boundary challenge like the lecture's other number examples. Stop words, Soundex, and translation are unrelated."
},
{
  topic: "Numbers in Information Retrieval",
  difficulty: "medium",
  question: "The example '(800) 234-2333' appears in the lecture's Numbers slide primarily to illustrate what?",
  options: [
    "That numbers (like phone numbers) can have embedded spaces and punctuation, complicating tokenization",
    "That phone numbers should always be excluded as stop words",
    "That phone numbers require case folding",
    "That phone numbers are a form of metadata only"
  ],
  correct: 0,
  explanation: "This example directly supports the 'Often have embedded spaces' point on the Numbers slide. It's not framed as a stop word, doesn't involve case (letters), and isn't described purely as metadata (metadata examples given are creation date/format)."
},
{
  topic: "Metadata",
  difficulty: "medium",
  question: "Which of these would the lecture most likely classify as 'metadata' rather than ordinary body-text tokens?",
  options: [
    "A document's creation date and file format",
    "The main paragraph text of an article",
    "A stop word appearing in a sentence",
    "A hyphenated compound word in the title"
  ],
  correct: 0,
  explanation: "The lecture explicitly names creation date and format as metadata examples indexed separately. Body text, stop words in sentences, and hyphenated title words are ordinary tokenization/indexing concerns, not the metadata example given."
},
{
  topic: "Internationalization",
  difficulty: "medium",
  question: "Which single word appears directly on the lecture's French tokenization slide, summarizing the broader theme of that discussion?",
  options: [
    "Internationalization",
    "Digitization",
    "Standardization",
    "Optimization"
  ],
  correct: 0,
  explanation: "The slide literally includes the heading/word 'Internationalization!' right after the l'ensemble/un ensemble discussion, signaling this is part of a broader internationalization theme. The other terms do not appear there."
},
{
  topic: "German Compound Words",
  difficulty: "medium",
  question: "Which statement correctly reflects the lecture's claim about German compound nouns and English compound phrases?",
  options: [
    "German compounds are written as a single unsegmented word by default, unlike many English multi-word equivalents that are written with spaces or hyphens",
    "German and English handle compounds identically with no differences",
    "German never forms compound words",
    "German compounds are always shorter than their English translations"
  ],
  correct: 0,
  explanation: "The lecture's example ('Lebensversicherungsgesellschaftsangestellter' = 'life insurance company employee') shows German fusing many words into one, unlike the spaced English phrase. This contradicts the 'identical', 'never', and 'always shorter' claims."
},
{
  topic: "Chinese Tokenization",
  difficulty: "medium",
  question: "Given that Chinese has no spaces between words, what does the lecture imply is needed to tokenize Chinese text effectively?",
  options: [
    "Some method of word segmentation beyond simple whitespace splitting, since multiple valid segmentations may exist",
    "Nothing special — regular whitespace splitting works fine for Chinese",
    "Translation into Japanese first",
    "Conversion into Arabic script first"
  ],
  correct: 0,
  explanation: "Because Chinese lacks spaces and may have multiple valid segmentations, some dedicated segmentation approach is implied as necessary — plain whitespace splitting (which relies on spaces) would not work. Translation into Japanese or Arabic is not mentioned."
},
{
  topic: "Japanese Tokenization",
  difficulty: "medium",
  question: "The lecture example 'フォーチュン500社は情報不足のため時間あた$500K(約6,000万円)' is used to demonstrate what in Japanese text processing?",
  options: [
    "Dates/amounts appearing in multiple formats intermixed with multiple scripts, adding to tokenization complexity",
    "That Japanese text never contains numbers",
    "That Japanese uses only Kanji, never other scripts",
    "That Japanese text must be fully translated before indexing"
  ],
  correct: 0,
  explanation: "This example accompanies the point about 'Dates/amounts in multiple formats' and multiple intermingled alphabets, showing real complexity in Japanese tokenization. It contains numbers/currency, contradicting the 'never contains numbers' and 'only Kanji' options, and translation is not proposed."
},
{
  topic: "Arabic Tokenization",
  difficulty: "medium",
  question: "Which languages does the lecture group together when discussing right-to-left writing with left-to-right numeric exceptions?",
  options: [
    "Arabic and Hebrew",
    "Chinese and Japanese",
    "French and German",
    "English and French"
  ],
  correct: 0,
  explanation: "The slide states 'Arabic (or Hebrew) is basically written right to left...' explicitly grouping these two. Chinese/Japanese are discussed for lack of spaces, and French/German/English appear in separate, unrelated examples."
},
{
  topic: "Unicode",
  difficulty: "medium",
  question: "What broader lesson about text representation does the Arabic Unicode example (complex surface form, straightforward stored form) support?",
  options: [
    "How text is displayed to a user can be more complex than how it is stored/processed internally by the IR system",
    "Unicode always makes storage more complicated than display",
    "Unicode is unnecessary for right-to-left languages",
    "Displayed and stored forms are always identical in every language"
  ],
  correct: 0,
  explanation: "The lecture's point is precisely that display complexity (ligatures, bidirectionality) doesn't necessarily mean the stored representation is equally complex. This contradicts the other three options, especially the claim that stored/displayed forms are 'always identical'."
},
{
  topic: "Token vs Term",
  difficulty: "medium",
  question: "If a system indexes 'Friends', 'Romans', and 'Countrymen' as tokens and later lowercases them to 'friends', 'romans', 'countrymen' as dictionary entries, what has happened in the lecture's terminology?",
  options: [
    "Tokenization produced the tokens, and normalization (case folding) turned them into terms",
    "Normalization produced the tokens, and tokenization turned them into terms",
    "Nothing changed; tokens and terms are identical at every stage",
    "The words became stop words"
  ],
  correct: 0,
  explanation: "This matches the lecture's pipeline: tokenization first yields raw tokens, then normalization (here, case folding) yields terms. The reversed order, the 'always identical' claim, and 'became stop words' are not correct here."
},
{
  topic: "Stop Words",
  difficulty: "easy",
  question: "Which of these is listed in the lecture as one of the 'commonest words' typically placed on a stop list?",
  options: [
    "to",
    "Denmark",
    "Windows",
    "Tübingen"
  ],
  correct: 0,
  explanation: "'to' is one of the exact stop-word examples given (the, a, and, to, be). Denmark appears in the phrase-query example, Windows in the asymmetric-expansion example, and Tübingen in the umlaut example — none are listed as stop words."
},
{
  topic: "Stop Lists",
  difficulty: "medium",
  question: "How does using a stop list affect the dictionary, according to the lecture?",
  options: [
    "It excludes the commonest words from the dictionary entirely",
    "It adds every common word as a separate weighted entry",
    "It merges all common words into a single wildcard term",
    "It has no effect on the dictionary, only on query display"
  ],
  correct: 0,
  explanation: "The lecture is explicit: a stop list means you 'exclude from the dictionary entirely the commonest words'. It doesn't add weighted entries, merge into a wildcard, or leave the dictionary unaffected."
},
{
  topic: "Advantages of Removing Stop Words",
  difficulty: "medium",
  question: "Historically, before compression and query optimization advances, why would removing stop words have been more attractive?",
  options: [
    "It reduced the size of the index/postings for very little loss of semantic content, saving space and processing cost",
    "It made phrase queries more accurate",
    "It was required for Unicode compatibility",
    "It eliminated the need for tokenization"
  ],
  correct: 0,
  explanation: "The lecture frames the historical rationale around space and cost savings (many postings, little meaning). Phrase queries are actually harmed by removal (the opposite of 'more accurate'), and Unicode/tokenization are unrelated."
},
{
  topic: "Disadvantages of Removing Stop Words",
  difficulty: "medium",
  question: "Which of the following would be a realistic disadvantage of removing stop words, based on the lecture's examples?",
  options: [
    "A search for the exact phrase 'to be or not to be' could fail if the words 'to' and 'be' were excluded from the index",
    "The dictionary would become impossibly large",
    "Case folding would no longer be possible",
    "Numbers could no longer be indexed"
  ],
  correct: 0,
  explanation: "This directly follows from the lecture's own example of 'To be or not to be' as a phrase that depends on 'stop words'. Removing stop words shrinks (not grows) the dictionary, and it has no direct bearing on case folding or number indexing."
},
{
  topic: "Normalization to Terms",
  difficulty: "medium",
  question: "Which best explains why the lecture calls equivalence classes 'implicit'?",
  options: [
    "They arise naturally from applying a rule (like deleting periods or hyphens) rather than being manually listed word-by-word",
    "They are kept completely secret from the search engine's users",
    "They are generated randomly by the system",
    "They only apply to numbers, never to words"
  ],
  correct: 0,
  explanation: "The lecture says equivalence classes are 'most commonly implicitly' defined via rules like period/hyphen deletion — the rule implicitly groups many word variants without listing each pair by hand (which would be the thesaurus's explicit, hand-constructed approach instead). It's not about secrecy, randomness, or being number-only."
},
{
  topic: "Equivalent Terms",
  difficulty: "medium",
  question: "Which of the following pairs would most plausibly be unified by the period-deletion rule described in the lecture?",
  options: [
    "U.S.A. and USA",
    "resume and résumé",
    "car and automobile",
    "window and windows"
  ],
  correct: 0,
  explanation: "U.S.A./USA is the lecture's exact period-deletion example. Resume/résumé is handled by accent removal, car/automobile by a thesaurus, and window/windows by asymmetric expansion — different mechanisms."
},
{
  topic: "Accent Removal",
  difficulty: "medium",
  question: "If a search system stores 'resume' (de-accented) as the term for both 'résumé' and 'resume', which lecture principle is it following?",
  options: [
    "Normalizing to a de-accented term, since users often don't type accents",
    "Case folding exceptions for proper nouns",
    "Asymmetric expansion of queries",
    "The Soundex phonetic algorithm"
  ],
  correct: 0,
  explanation: "This matches the lecture's recommendation to normalize accented variants to a de-accented form because users often omit accents when typing. It's unrelated to case-folding exceptions, asymmetric expansion, or Soundex."
},
{
  topic: "Language-dependent Normalization",
  difficulty: "hard",
  question: "Suppose in one language users almost always type accents correctly, while in another they almost never do. What does the lecture's 'most important criterion' suggest about normalization strategy?",
  options: [
    "The normalization approach may reasonably differ between the two languages, since it should be based on how users are likely to write their queries",
    "Both languages must use the exact same normalization rule regardless of user behavior",
    "Only the second language needs any preprocessing at all",
    "Accent-typing behavior is irrelevant to normalization design"
  ],
  correct: 0,
  explanation: "Since the lecture's key criterion is user query-writing behavior, differing behavior across languages would reasonably justify differing normalization strategies. The other options ignore or contradict this user-centered criterion."
},
{
  topic: "Case Folding",
  difficulty: "medium",
  question: "Which of these best summarizes the tension the lecture presents around case folding?",
  options: [
    "Uniform lowercasing usually helps matching since users type in lowercase, but it can also erase meaningful distinctions in some cases like acronyms or mid-sentence proper nouns",
    "Case folding always helps with no downsides in any scenario",
    "Case folding always hurts retrieval and should never be used",
    "Case folding is unrelated to how users type their queries"
  ],
  correct: 0,
  explanation: "The lecture shows both sides: it recommends lowercasing broadly (user behavior) while flagging exceptions (General Motors, Fed vs. fed, SAIL vs. sail, C.A.T. vs. cat). It is not framed as purely beneficial or purely harmful, and it is explicitly tied to user typing behavior."
},
{
  topic: "Exceptions to Case Folding",
  difficulty: "hard",
  question: "'SAIL vs. sail' is used in the lecture in the same way as which other example?",
  options: [
    "Fed vs. fed",
    "U.S.A. vs. USA",
    "window vs. windows",
    "Tuebingen vs. Tübingen"
  ],
  correct: 0,
  explanation: "SAIL vs. sail and Fed vs. fed are the lecture's two paired examples showing capitalization can distinguish a proper noun/acronym from an ordinary word. The other pairs illustrate different phenomena: period deletion, asymmetric expansion, and umlaut normalization."
},
{
  topic: "Asymmetric Expansion",
  difficulty: "medium",
  question: "Compared to simple equivalence classing (merging all variants into one term), what extra capability does asymmetric expansion offer?",
  options: [
    "It can tailor the set of matched forms to the specificity of what the user actually typed, rather than always treating all variants as identical",
    "It removes the need for any query processing at all",
    "It guarantees the fastest possible query response time",
    "It only works for languages other than English"
  ],
  correct: 0,
  explanation: "The window/windows/Windows example shows expansion varies depending on the exact input — more specific input (Windows) yields a narrower expansion. It doesn't remove query processing, isn't about speed guarantees, and isn't restricted to non-English languages."
},
{
  topic: "Thesaurus",
  difficulty: "medium",
  question: "Which best describes how a thesaurus's equivalence classes are typically constructed, according to the lecture?",
  options: [
    "By hand (hand-constructed equivalence classes)",
    "Automatically via phonetic analysis",
    "Automatically via period and hyphen deletion",
    "Automatically via n-gram statistics"
  ],
  correct: 0,
  explanation: "The lecture specifically says 'hand-constructed equivalence classes' for the thesaurus/synonym approach. Phonetic analysis describes Soundex, and period/hyphen deletion and n-grams are separate techniques mentioned elsewhere."
},
{
  topic: "Synonyms",
  difficulty: "medium",
  question: "'color = colour' is used in the lecture as an example of what?",
  options: [
    "A synonym pair handled via hand-constructed equivalence classes",
    "A case-folding exception",
    "An asymmetric expansion pair",
    "An example of numbers with embedded spaces"
  ],
  correct: 0,
  explanation: "It appears directly alongside 'car = automobile' as a thesaurus/synonym example. It is not a case-folding, asymmetric-expansion, or numbers example."
},
{
  topic: "Homonyms",
  difficulty: "hard",
  question: "Why might handling homonyms be more challenging than handling synonyms in an IR system, based on the general framing in the lecture?",
  options: [
    "A homonym has the same form but different meanings, so blindly grouping it with related terms (as with synonym equivalence classing) could incorrectly conflate unrelated senses",
    "Homonyms never appear in any language",
    "Homonyms are always numbers",
    "Homonyms are automatically removed as stop words"
  ],
  correct: 0,
  explanation: "The lecture raises synonyms and homonyms together as things 'we handle', implying homonyms need care since equivalence-class techniques designed for synonyms (same meaning, different form) don't straightforwardly apply to homonyms (same form, different meaning). The other options are unsupported claims."
},
{
  topic: "Soundex",
  difficulty: "medium",
  question: "Which scenario would Soundex most directly help with, based on the lecture?",
  options: [
    "A user misspells a name, and the system still needs to find documents with the correctly spelled name",
    "A user wants to find synonyms of 'automobile'",
    "A user wants German compound words split into parts",
    "A user wants stop words removed from their query"
  ],
  correct: 0,
  explanation: "Soundex is introduced specifically to address spelling mistakes via phonetic matching. Synonym-finding is the thesaurus's job, compound splitting is a German-specific tokenization tool, and stop-word removal is a separate topic entirely."
},
{
  topic: "Phonetic Matching",
  difficulty: "medium",
  question: "Soundex equivalence classes are based on which principle?",
  options: [
    "Phonetic heuristics (how words sound)",
    "Exact spelling match only",
    "Word length only",
    "Alphabetical proximity only"
  ],
  correct: 0,
  explanation: "The lecture states Soundex groups words 'based on phonetic heuristics'. Exact spelling, word length, and alphabetical proximity are not the basis described."
},
{
  topic: "Spelling Variations",
  difficulty: "medium",
  question: "Which lecture technique is specifically aimed at handling spelling variations/mistakes, as opposed to intentional word-form differences like plurals or case?",
  options: [
    "Soundex",
    "Case folding",
    "Stop word removal",
    "Deleting hyphens"
  ],
  correct: 0,
  explanation: "The lecture ties Soundex specifically to 'spelling mistakes', while case folding addresses letter case, stop word removal addresses common-word exclusion, and hyphen deletion addresses hyphenation — none targeting misspellings directly."
},
{
  topic: "Tokenization Problems",
  difficulty: "hard",
  question: "Considering the full set of tokenization issues in the lecture (hyphens, apostrophes, multi-word names, numbers, language differences), what common theme unites them?",
  options: [
    "Deciding token boundaries is often ambiguous and can depend on domain, language, and intended use, rather than following one simple universal rule",
    "All tokenization issues are solved once and for all by lowercasing text",
    "Tokenization issues only occur in non-English languages",
    "Tokenization issues are irrelevant to actual search quality"
  ],
  correct: 0,
  explanation: "Across every example (Hewlett-Packard, Finland's, San Francisco, phone numbers, German compounds, Chinese/Japanese spacing, Arabic direction), the throughline is genuine boundary ambiguity requiring judgment calls. Lowercasing addresses case, not boundaries; English also has many of these issues; and the lecture frames these as directly affecting retrieval quality."
},
{
  topic: "Normalization",
  difficulty: "medium",
  question: "Which of these operations is explicitly described in the lecture as a way to define equivalence classes for normalization?",
  options: [
    "Deleting hyphens",
    "Adding hyphens to all compound words",
    "Doubling every letter",
    "Reversing the word"
  ],
  correct: 0,
  explanation: "Deleting hyphens (e.g., anti-discriminatory -> antidiscriminatory) is explicitly given. Adding hyphens, doubling letters, and reversing words are not techniques mentioned in the lecture."
},
{
  topic: "Query Optimization",
  difficulty: "medium",
  question: "According to the lecture, what two technical advances specifically reduced the cost of keeping stop words in the index?",
  options: [
    "Compression techniques and query optimization techniques",
    "Soundex and thesaurus construction",
    "Case folding and accent removal",
    "Unicode support and internationalization"
  ],
  correct: 0,
  explanation: "The lecture names 'Good compression techniques (IIR 5)' and 'Good query optimization techniques (IIR 7)' as the two relevant advances. The other pairs are unrelated techniques discussed elsewhere in the material."
},
{
  topic: "Dictionary",
  difficulty: "medium",
  question: "If a stop word like 'the' is excluded via a stop list, what is the direct consequence for the dictionary, per the lecture's definition of a stop list?",
  options: [
    "'the' would not appear as an entry in the dictionary",
    "'the' would appear twice in the dictionary",
    "'the' would be converted into a number",
    "'the' would automatically become a Soundex code"
  ],
  correct: 0,
  explanation: "Since a stop list excludes commonest words 'from the dictionary entirely', the direct consequence is the word does not appear as a dictionary entry at all. The other outcomes are not implied by the definition."
},
{
  topic: "Terms",
  difficulty: "easy",
  question: "What does the opening slide of the 'Terms' lecture describe terms as?",
  options: [
    "The things indexed in an IR system",
    "The things excluded from an IR system",
    "The raw output of tokenization only",
    "A synonym for 'documents'"
  ],
  correct: 0,
  explanation: "The lecture's title slide for Terms reads: 'Terms — The things indexed in an IR system.' It is not describing exclusion, raw tokenization output, or a synonym for documents."
},
{
  topic: "Normalization",
  difficulty: "hard",
  question: "Consider a query-log analysis showing users almost never type periods in acronyms (e.g., always typing 'USA', never 'U.S.A.'). Which lecture-based normalization decision would this best justify?",
  options: [
    "Normalizing by deleting periods, so both forms map to a single term",
    "Keeping U.S.A. and USA as entirely separate, unrelated terms",
    "Removing 'USA' entirely as a stop word",
    "Applying Soundex to convert 'USA' into a phonetic code"
  ],
  correct: 0,
  explanation: "This matches both the lecture's period-deletion example and its stated criterion of following how users actually type queries. Keeping them separate would work against matching user intent, and stop-word removal or Soundex are not appropriate tools for this specific normalization goal."
},
{
  topic: "Case Folding",
  difficulty: "hard",
  question: "The lecture's 'General Motors' example is best understood as raising which specific question about case folding policy?",
  options: [
    "Whether upper case appearing mid-sentence (not just at the start) should be preserved as meaningful rather than folded away",
    "Whether General Motors should be treated as a stop word",
    "Whether General Motors requires Soundex matching",
    "Whether General Motors should be split into two separate tokens by a hyphen rule"
  ],
  correct: 0,
  explanation: "The slide raises this exact question: 'exception: upper case in mid-sentence? e.g., General Motors' — about whether meaningful capitalization mid-sentence should survive folding. It is not about stop words, Soundex, or hyphen splitting."
},
{
  topic: "Query Expansion",
  difficulty: "hard",
  question: "Which of the following would be a fair summary comparing thesaurus-based query expansion and asymmetric expansion, based on the lecture?",
  options: [
    "Both can expand a query to related forms, but a thesaurus expands based on hand-built meaning relationships (e.g., automobile -> car), while asymmetric expansion expands based on the specific surface form typed (e.g., windows -> Windows, windows, window)",
    "They are the exact same technique described twice",
    "Thesaurus expansion only works on numbers, and asymmetric expansion only works on proper nouns",
    "Neither technique is ever used at query time"
  ],
  correct: 0,
  explanation: "Both are forms of query-time expansion but driven by different logic — meaning-based (thesaurus) vs. form-based (asymmetric expansion tied to capitalization/spelling of the exact query). They are not identical, not restricted to numbers/proper nouns, and both are explicitly query-time techniques."
},
{
  topic: "Tokenization Problems",
  difficulty: "easy",
  question: "Which of the following words is used by the lecture specifically as a French tokenization example?",
  options: [
    "L'ensemble",
    "Lebensversicherungsgesellschaftsangestellter",
    "莎拉波娃",
    "Tübingen"
  ],
  correct: 0,
  explanation: "L'ensemble is the lecture's French example. The German compound example is Lebensversicherungsgesellschaftsangestellter, the Chinese example includes 莎拉波娃, and Tübingen is the German umlaut example — all from different language sections."
},
{
  topic: "Terms",
  difficulty: "medium",
  question: "Why does the lecture emphasize that a term is a '(normalized)' word type rather than just any word type?",
  options: [
    "Because the normalization step is what unifies variant spellings/forms into the single dictionary entry that becomes a term",
    "Because 'normalized' means translated into a fixed reference language",
    "Because 'normalized' means the word has passed a spell-checker",
    "Because 'normalized' means the word appears in a thesaurus"
  ],
  correct: 0,
  explanation: "The parenthetical 'normalized' points to the equivalence-classing process (periods, hyphens, accents, case, etc.) that produces the single dictionary entry — i.e., the term. It does not imply translation, spell-checking, or thesaurus membership specifically."
},
{
  topic: "Stop Words",
  difficulty: "hard",
  question: "If a modern IR system removed the word 'to' entirely from its index, which two lecture examples would most directly fail to work as intended?",
  options: [
    "\"To be or not to be\" and \"flights to London\"",
    "\"Hewlett-Packard\" and \"co-education\"",
    "\"U.S.A.\" and \"USA\"",
    "\"window\" and \"windows\""
  ],
  correct: 0,
  explanation: "Both examples rely on 'to' carrying real meaning in context (a song/phrase title and a relational query), matching the lecture's stated reasons for keeping stop words. The other pairs are unrelated to stop words (hyphenation and normalization examples instead)."
},
{
  topic: "Normalization to Terms",
  difficulty: "easy",
  question: "The result of normalizing tokens, as described in the lecture, is referred to as what?",
  options: [
    "Terms",
    "Stems only",
    "Postings only",
    "Queries"
  ],
  correct: 0,
  explanation: "The lecture states plainly: 'Result is terms...'. Stemming, postings, and queries are related IR concepts but are not what the lecture names as the direct 'result' of normalization here."
},
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = QUESTION_BANK;
}
