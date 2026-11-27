# Chatbot evaluation: CampusFest Growth Center

Run on 27 Nov 2026 on https://campusfest-growth-center-eight.vercel.app (Gemini Flash-Lite via `api/chat.js`). Dates are 2025, the dataset's edition.

**Result: 31 of 32 questions passed (97%).** Expected answers were computed separately in Python from the raw dataset. Every answer carried the "✓ Numbers checked" line; median answer time was 3 s.

**The one failure:** question 21 answered ₹136.77; the true value is ₹136.76 (₹93,000 ÷ 680). The fact-check tolerates rounding differences, so it let a ₹0.01 slip through. Next fix: round money to whole rupees in tool outputs.

The 'Changed data' questions were asked after adding a ₹50,000 Paid Social entry in the Data tab (then removed). The 'Action' questions pass only if a proposal card appears and nothing is saved before Confirm.

| # | Category | As of | Question | Expected | Pass |
|---|---|---|---|---|---|
| 1 | Fact | 20 Apr | How many verified visitors did the fest get? | 2,050 | ✅ |
| 2 | Fact | 20 Apr | How many walk-ins were there? | 125 | ✅ |
| 3 | Fact | 20 Apr | What was the total marketing spend? | ₹274,000 | ✅ |
| 4 | Calculation | 20 Apr | What was the cost per verified visitor? | ₹134 | ✅ |
| 5 | Fact | 20 Apr | How many registrations were there in total? | 2,800 | ✅ |
| 6 | Fact | 20 Apr | How many registrations are on the waitlist, and how many were cancelled? | 88 and 183 | ✅ |
| 7 | Comparison | 20 Apr | Which campaign had the highest cost per verified visitor? | Creators ₹337 | ✅ |
| 8 | Comparison | 20 Apr | Which campaign was the cheapest per verified visitor? | Referrals ₹69 | ✅ |
| 9 | Fact | 20 Apr | What was Paid Social's show-up rate? | 50% | ✅ |
| 10 | Fact | 20 Apr | How many verified visitors came through College Partnerships? | 385 | ✅ |
| 11 | Comparison | 20 Apr | How many people from Creator Partners opted out, and how does that compare with Student Referrals? | 43 vs 14 | ✅ |
| 12 | Calculation | 20 Apr | What share of total spend went to Paid Social and Creator Partners combined? | 55.5% | ✅ |
| 13 | Calculation | 20 Apr | If we move ₹20,000 from Paid Social to Student Referrals, how many net verified visitors would we gain? | ≈96 | ✅ |
| 14 | Calculation | 20 Apr | What percentage of registrations came from College Partnerships? | 16.1% | ✅ |
| 15 | Calculation | 20 Apr | How many more verified visitors did we need to hit the goal? | 150 | ✅ |
| 16 | As-of date | 1 Mar | How many registrations do we have so far? | 1,144 | ✅ |
| 17 | As-of date | 1 Mar | What is our verified visitor goal right now? | 1,800 | ✅ |
| 18 | As-of date | 15 Feb | How much have we spent so far? | ₹73,475 | ✅ |
| 19 | As-of date | 12 Apr | How many verified visitors so far, and how much has been spent? | 1,430 and ₹276,500 | ✅ |
| 20 | Follow-up | 20 Apr | Which campaign had the most registrations? | Paid Social 680 | ✅ |
| 21 | Follow-up | 20 Apr | And what was its cost per registration? | ₹136.76 (answered ₹136.77) | ❌ |
| 22 | Follow-up | 20 Apr | How many people opted out in total? | 229 | ✅ |
| 23 | Follow-up | 20 Apr | Which campaign accounts for most of them? | Paid Social 117 | ✅ |
| 24 | Can't answer | 20 Apr | What was the weather in Bengaluru on the fest days? | says data doesn't have it | ✅ |
| 25 | Can't answer | 20 Apr | How many attendees came from Christ University? | says data doesn't have it | ✅ |
| 26 | Can't answer | 20 Apr | What was the revenue from ticket sales? | says data doesn't have it | ✅ |
| 27 | Can't answer | 20 Apr | What will Instagram ad prices be next year? | says data doesn't have it | ✅ |
| 28 | Changed data | 20 Apr | (after adding a ₹50,000 Paid Social entry) What is the total marketing spend now? | ₹324,000 | ✅ |
| 29 | Changed data | 20 Apr | What is Paid Social's cost per registration now? | ₹210.3 | ✅ |
| 30 | Action | 20 Apr | Create a task for the Creator Partners owner to cut its early-weeks budget. | proposal card, nothing saved | ✅ |
| 31 | Action | 20 Apr | Pause the Paid Social campaign. | proposal card, nothing saved | ✅ |
| 32 | Diagnosis | 20 Apr | Why did Paid Social underperform? | spend share vs visitor share, cost, show-up | ✅ |
