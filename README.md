# 🎓 University Subjects Study Hub (`Subjects_In_Uni`)

[![GitHub Repo](https://img.shields.io/badge/Repository-princedarkness369%2FSubjects__In__Uni-blue?logo=github)](https://github.com/princedarkness369/Subjects_In_Uni)
[![Platform - Browser](https://img.shields.io/badge/Platform-Web%20%2F%20Browser-orange?logo=googlechrome)](#-how-to-use)
[![Tech - HTML5 / CSS3 / JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-yellow?logo=javascript)](#-courses-overview)
[![Framework - React / Vite](https://img.shields.io/badge/Framework-React%2018%20%7C%20Vite%20%7C%20Tailwind-61DAFB?logo=react)](#-information-retrieval-ir)
[![Backend - PHP & MySQL](https://img.shields.io/badge/Backend-PHP%20%7C%20MySQL-777BB4?logo=php)](#-php--mysql-web-development)

An all-in-one university revision portal and interactive exam preparation suite. This repository features self-grading exam simulators, comprehensive study hubs, interactive flashcards, and chapter-by-chapter quizzes for core Computer Science courses.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Courses Overview](#-courses-overview)
  - [1. Operating Systems (OS)](#1--operating-systems-os)
  - [2. Information Retrieval (IR)](#2--information-retrieval-ir)
  - [3. PHP & MySQL](#3--php--mysql-web-development)
- [Repository Structure](#-repository-structure)
- [How to Use](#-how-to-use)
- [Study Guide Web App (Vite + React)](#-study-guide-web-app-vite--react)
- [License & Acknowledgements](#-license--acknowledgements)

---

## 🌟 Overview

Preparing for computer science exams requires practicing with realistic questions under timed conditions. **Subjects_In_Uni** provides interactive, zero-dependency browser-based simulators that mimic real exam environments, complete with:
- Countdown timers and question navigation palettes.
- Detailed step-by-step rationales and solution steps (e.g., Banker's Algorithm safety vectors, address translation formulas).
- Instant scoring, percentage breakdowns, and performance analytics.

---

## 🚀 Key Features

- **⚡ Zero Configuration**: Standalone HTML simulators run instantly in any modern web browser—no local server or database setup required.
- **🎨 Sleek Modern UI**: Responsive design with curated dark and light mode themes, code highlighting, and fluid animations.
- **🧠 Comprehensive Question Banks**: Covers multiple-choice questions (MCQs), true/false, code tracing, algorithmic calculations, and architectural scenarios.
- **⏱️ Timed Simulation & Review Modes**: Test your knowledge under pressure, then review correct vs. incorrect answers with thorough explanations.
- **📱 Fully Responsive**: Optimized for desktop monitors, tablets, and mobile devices.

---

## 📚 Courses Overview

### 1. 🖥️ Operating Systems (OS)

Covers foundational concepts through advanced topics based on standard operating systems curricula (Silberschatz, Galvin, Gagne).

| Module / Topic | Resource | Key Concepts Covered |
| :--- | :--- | :--- |
| **Chapter 1: OS Introduction** | [`OS/Quiz_Chapter1/os_ch1_exam.html`](./OS/Quiz_Chapter1/os_ch1_exam.html) | Dual-mode operation (User vs. Kernel mode), system calls, hardware interrupts, trap instructions, memory protection, timers. |
| **Chapter 2: OS Structures** | [`OS/Quiz_Chapter2/os-ch2-exam.html`](./OS/Quiz_Chapter2/os-ch2-exam.html) | Operating system services, user interfaces (CLI/GUI), system call parameter passing, microkernel vs. monolithic kernels, system boot. |
| **Chapter 3: Processes** | [`OS/Quiz_Chapter3/process-states-quiz-v2.html`](./OS/Quiz_Chapter3/process-states-quiz-v2.html) | Process control block (PCB), 5-state process model, context switching overhead, process queues, CPU-bound vs. I/O-bound, IPC mechanisms. |
| **Chapter 4: Threads** | [`OS/Quiz_Chapter4/OS_Chapter4_Threads_Exam.html`](./OS/Quiz_Chapter4/OS_Chapter4_Threads_Exam.html) | User threads vs. kernel threads, multithreading models (1:1, M:1, M:M), thread pools, Pthreads, implicit threading, thread cancellation. |
| **Chapter 5: CPU Scheduling** | [`OS/Quiz_Chapter5/cpu-scheduling-exam.html`](./OS/Quiz_Chapter5/cpu-scheduling-exam.html) | Scheduling metrics (Turnaround, Waiting, Response time), FCFS, SJF (Preemptive/Non-preemptive), Round Robin (time quantum tuning), Priority Scheduling, Multi-Level Queue. |
| **Chapter 6: Process Synchronization** | [`OS/final/chapter_6.html`](./OS/final/chapter_6.html) | Critical Section Problem, Peterson's Solution, Hardware instructions (`TestAndSet`, `CompareAndSwap`), Mutex locks, Counting & Binary Semaphores, Monitors, Classic Problems (Bounded-Buffer, Readers-Writers, Dining Philosophers). |
| **Chapter 8: Deadlocks** | [`OS/final/chapter_8.html`](./OS/final/chapter_8.html) | 4 Coffman conditions, Resource Allocation Graphs (RAG), Deadlock Prevention vs. Avoidance, **Banker's Algorithm** (Safety vector calculations & Resource Request algorithm), Detection & Recovery strategies. |
| **Chapter 9: Main Memory** | [`OS/final/chapter_9.html`](./OS/final/chapter_9.html) | Logical vs. Physical address space, Memory Management Unit (MMU), Base & Limit registers, Contiguous allocation (First-fit, Best-fit, Worst-fit), Fragmentation (Internal vs. External), Paging, Page tables, Translation Lookaside Buffer (TLB), Inverted Page Tables, Segmentation. |

---

### 2. 🔍 Information Retrieval (IR)

Focuses on classic search engine architectures, vector representations, relevance metrics, and modern neural retrieval techniques.

| Module / Topic | Resource | Key Concepts Covered |
| :--- | :--- | :--- |
| **Master Study Hub** | [`IR/Summry IR/ir-summary.html`](./IR/Summry%20IR/ir-summary.html) | Central study guide covering inverted index pipelines, tokenization, lemmatization, Porter stemmer, stop words, and dictionary data structures. |
| **Lecture 6: Scoring & Vector Space** | [`IR/ir chp6/lecture6-exam.html`](./IR/ir%20chp6/lecture6-exam.html) | Term Frequency ($TF$), Inverse Document Frequency ($IDF$), $TF\text{-}IDF$ weighting, Vector Space Model, Cosine Similarity, document length normalization. |
| **IR & LLMs Practice Exam** | [`IR/final/ir-llm-practice-exam.html`](./IR/final/ir-llm-practice-exam.html) | Modern Information Retrieval, dense vs. sparse embeddings, Bi-encoders/Cross-encoders, BERT/Transformer architectures for search, Retrieval-Augmented Generation (RAG). |
| **Interactive Exam Simulator** | [`IR/ir-exam/index.html`](./IR/ir-exam/index.html) | Modular exam testing system with customizable question banks and instant score evaluation. |
| **React Study Guide Application** | [`IR/ir-study-guide/`](./IR/ir-study-guide/) | Full-featured web app built with React, Vite, Tailwind CSS, and Framer Motion containing searchable concept grids, flashcards, and comparison tables. |

---

### 3. 🐘 PHP & MySQL Web Development

A comprehensive path covering server-side scripting, structured data processing, and secure database interactions.

| Module / Topic | Resource | Key Concepts Covered |
| :--- | :--- | :--- |
| **PHP Basics & Syntax** | [`PHP/open_to_php/index.html`](./PHP/open_to_php/index.html) | PHP tags, variable declarations, data types, type casting, arithmetic/logical operators, control flow (`if`/`else`, `switch`, loops). |
| **Strings & Built-in Methods** | [`PHP/string/index.html`](./PHP/string/index.html) | String manipulation (`strlen`, `strpos`, `substr`, `str_replace`, `explode`, `implode`), string interpolation, trimming, escaping. |
| **Arrays & Data Manipulation** | [`PHP/array/index.html`](./PHP/array/index.html) | Indexed arrays, associative arrays (key-value pairs), multidimensional arrays, `foreach` loops, array sorting functions (`sort`, `ksort`, `asort`). |
| **Functions & Scope** | [`PHP/functions/index.html`](./PHP/functions/index.html) | User-defined functions, default arguments, return values, variable scope (`global`, `local`, `static`), pass-by-value vs. pass-by-reference. |
| **MySQL & Database Integration** | [`PHP/mysql/php-mysql-final-exam.html`](./PHP/mysql/php-mysql-final-exam.html) | Connecting via `PDO` and `MySQLi`, SQL CRUD statements, parameterized queries & prepared statements, SQL injection mitigation, error handling. |
| **Final Exam Simulator** | [`PHP/final/php_mysql_exam_simulator.html`](./PHP/final/php_mysql_exam_simulator.html) | Full simulated final exam with timed questions covering core PHP and relational MySQL engineering practices. |

---

## 📂 Repository Structure

```text
Subjects_In_Uni/
├── OS/                                   # Operating Systems
│   ├── Quiz_Chapter1/
│   │   └── os_ch1_exam.html              # Chapter 1 Exam Simulator
│   ├── Quiz_Chapter2/
│   │   └── os-ch2-exam.html              # Chapter 2 Exam Simulator
│   ├── Quiz_Chapter3/
│   │   └── process-states-quiz-v2.html   # Chapter 3 Process States Quiz
│   ├── Quiz_Chapter4/
│   │   └── OS_Chapter4_Threads_Exam.html # Chapter 4 Threads & Concurrency
│   ├── Quiz_Chapter5/
│   │   └── cpu-scheduling-exam.html      # Chapter 5 CPU Scheduling
│   └── final/
│       ├── chapter_6.html                # Chapter 6 Synchronization
│       ├── chapter_8.html                # Chapter 8 Deadlocks & Banker's Alg
│       └── chapter_9.html                # Chapter 9 Memory Management
│
├── IR/                                   # Information Retrieval
│   ├── Summry IR/
│   │   └── ir-summary.html               # Master Study Hub & Summaries
│   ├── final/
│   │   └── ir-llm-practice-exam.html     # IR & LLM Practice Exam
│   ├── ir chp6/
│   │   └── lecture6-exam.html            # TF-IDF & Scoring Quiz
│   ├── ir-exam/                          # Modular Quiz Engine
│   │   ├── index.html
│   │   ├── questions.js
│   │   ├── script.js
│   │   └── style.css
│   └── ir-study-guide/                   # Vite + React + Tailwind Web App
│       ├── package.json
│       ├── vite.config.ts
│       └── README.md
│
├── PHP/                                  # PHP & MySQL Web Development
│   ├── open_to_php/
│   │   └── index.html                    # Introduction to PHP
│   ├── string/
│   │   └── index.html                    # String Functions Guide
│   ├── array/
│   │   └── index.html                    # Arrays & Manipulations
│   ├── functions/
│   │   └── index.html                    # Functions & Variable Scopes
│   ├── mysql/
│   │   └── php-mysql-final-exam.html     # PHP + MySQL Database Exam
│   └── final/
│       └── php_mysql_exam_simulator.html # Comprehensive Final Exam Simulator
│
└── README.md                             # Project Documentation
```

---

## 💻 How to Use

### Quick Start (Standalone HTML Simulators)
1. Clone the repository:
   ```bash
   git clone https://github.com/princedarkness369/Subjects_In_Uni.git
   cd Subjects_In_Uni
   ```
2. Open any exam or study guide directly in your browser:
   - On Windows: Double-click any `.html` file or run:
     ```powershell
     Start-Process "OS/final/chapter_8.html"
     ```
   - On macOS:
     ```bash
     open OS/final/chapter_8.html
     ```
   - On Linux:
     ```bash
     xdg-open OS/final/chapter_8.html
     ```

---

## ⚡ Study Guide Web App (Vite + React)

For the interactive Information Retrieval study portal in `IR/ir-study-guide`:

```bash
cd IR/ir-study-guide
npm install
npm run dev
```

Visit `http://localhost:5173` to explore:
- Filterable concept cards and keyword search.
- Interactive flashcards with shuffle mode.
- Side-by-side comparison tables (e.g., *Precision vs. Recall*, *Boolean vs. Ranked Retrieval*).

---

## 🤝 Contributing & License

Contributions, corrections, or additional practice questions are welcome!
- To report a bug or errata in a question, please open an Issue.
- To add new question banks or enhance simulators, submit a Pull Request.

Happy studying and best of luck on your exams! 🚀
