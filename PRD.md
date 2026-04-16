# Product Requirements Document (PRD): SkillSwipe
**Event:** Liberec Ideathon 2026 
**Mission:** Smarter Students, Richer Region
**Tech Stack:** React, Tailwind CSS, Lucide Icons (Progressive Web App - Mobile First)

## 1. Project Overview & The "Red Line"
SkillSwipe is a gamified, mobile-first web app designed to guide high school students toward higher education. The "Red Line" (core objective) is to seamlessly engage students with the idea of university using technology as a guide, not an obstacle. 

## 2. Target Audience
Students (14-18 years old) from regions like Semily or Turnov. No one in their family went to university. They lack information, and their fear of failure is stronger than their ambition. 

## 3. Core Architecture (The 4 Screens)
The application must strictly follow this user journey to satisfy the Ideathon rubric (Innovation, Feasibility, Cohesion, Pitch):

### Screen 1: The "Life Cycle" Roadmap (Home)
* **Concept:** Maps to the student's natural life cycle. A Duolingo-style vertical path/skill tree starting at 8th grade and ending at University.
* **UI Elements:** User avatar, Total XP progress bar, winding path with 3-4 nodes (e.g., 'Curiosity' [Completed], 'Core Skills' [Active], 'Logistics' [Locked]). Bottom tab navigation.

### Screen 2: The Core "Swipe" (Discovery Engine)
* **Concept:** Tinder-style gamified UI. Students swipe left/right on short scenarios (e.g., "Taking apart a radio" vs "Writing a story") to map their skills without psychological profiling (100% GDPR compliant).
* **UI Elements:** Large central card with shadow. Top status bar showing current "Level" and "Streak". Large floating action buttons below the card (Red 'X', Green 'Heart'). 

### Screen 3: The Community Bridge (The Reward)
* **Concept:** "A good gift is a good feeling." Replaces standard badges with real human connection.
* **UI Elements:** Celebratory glowing UI. A 'Match' card showing an Alumni from their exact high school ("You have a lot in common with Jakub"). A prominent CTA button: "Ask Jakub a question anonymously". 

### Screen 4: The Impact Dashboard (For Teachers/Sponsors)
* **Concept:** Solves the "Sponsor Trust" and "Feasibility" rubric requirement. Shows regional engagement.
* **UI Elements:** Clean, data-heavy dashboard. Shows aggregated, anonymized statistics (e.g., "85% of 9th graders completed this month's drop").

## 4. Design System Constraints
* **Vibe:** Modern, sleek, highly polished (shadcn/ui aesthetic). 
* **Layout:** Must be constrained to a mobile-app dimension container (e.g., max-w-md, rounded-3xl, centered on screen) to simulate a native app during the web demo.