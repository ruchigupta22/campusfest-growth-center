# CampusFest Growth Center: Attendee Growth (Challenge A)

**Ruchi Gupta** (23MT10043, IIT Kharagpur) · RISA Labs Growth APM assignment · CampusFest Bengaluru, April 2027

| Deliverable | Where |
|---|---|
| 3-slide strategy | `Ruchi_Gupta_RISA_Growth_Strategy.pdf` |
| Growth Center (dashboard, campaign and task manager, AI analyst) | **https://campusfest-growth-center-eight.vercel.app** · code: https://github.com/ruchigupta22/campusfest-growth-center |
| Model behind the slides (live formulas) | `Target_Model_Ruchi_Gupta.xlsx` |
| Chatbot test results | Section 3 below |

---

## 1. Check this in 5 minutes

1. **Open the app.** The header date picker sets "data as of". Move it to **1 Mar 2025**: everything recalculates using only data up to that day, including the target version that was active then (goal 1,800, not 2,200).
2. **Diagnose → click "Paid Social".** You see cost per registration rising against its scale and stop lines, plus an automatic diagnosis (fatigue, weak show-up, opt-outs).
3. **Ask the AI analyst:** "Which channel should we cut, and why?" Then: "Create a task for its owner." A card appears; nothing is saved until you click **Confirm**. The task then shows in **Campaigns & tasks**.
4. **Change the data:** Data → add a ₹50,000 Paid Social entry, then ask "What is total spend now?" (it answers ₹3,24,000). Click "Remove last" to undo.
5. **Ask something the data can't answer**, such as "How many came from Christ University?". It says the data doesn't record colleges instead of guessing.

**Rubric map:**

| Criterion | Where |
|---|---|
| Ambition and quantitative reasoning | Slide 1; Excel tabs Target Model and Audiences & City |
| Ideas, prioritisation and trade-offs | Slide 2; Excel tab Slide 2 Bets |
| Experimentation and adaptability | Slide 3; Excel tab Slide 3 Signals; app → Decide |
| Dashboard and management | App → Overview, Diagnose, Decide, Campaigns & tasks |
| AI chatbot | App → AI Growth Analyst; test results in Section 3 |
| Ownership and communication | This README: decisions, setup, limitations |

---

## 2. Decisions I made, and why

1. **I added a fact-check to the chatbot after it gave a wrong number.** In testing, the fast model got a correct tool result (1,905 Day 1 check-ins) and wrote 1,505 in its answer. Now every number in an answer is checked against what the tools computed. A mismatch makes the AI correct itself, and if it can't, the answer is flagged "couldn't verify".
2. **I added a 4-week ramp-up rule.** Replaying 1 March showed my own thresholds would have flagged Student Referrals as "Stop". It went on to become the cheapest channel. New channels now get 4 weeks of spend before a Stop.
3. **I price every extra rupee at 2× last year's cost.** Scaling referrals and clubs to 2–2.6× their 2025 spend will not stay as cheap. The commitment of 2,578 already includes this penalty.
4. **I commit to the base case, not the stretch.** 2,578 is the commitment. I'd staff and book the venue for 3,009, and fund the moonshot (+491) only if its pilots pass by 2 March. **Downside:** if channels saturate (3× cost), the show-up fixes deliver nothing and the cuts hurt more, all at once, the plan still reaches **2,179 (+6%)**.
5. **I cut before adding.** Paid Social and Creators took 55% of spend for 25% of verified visitors. Cutting them frees ₹77K for channels that got cheaper as they grew.
6. **I treat correlations as hypotheses.** "Early registrants show up less" and "brochure downloaders show up more" may be selection effects, not causes. That's why the show-up engine starts as an A/B test against a holdout half (about 613 each), not a blanket rollout.
7. **I kept the API key on the server.** GitHub's secret scanning blocked an early attempt to put it in the code. The key now lives only in a server function, which also checks the request's origin, rate-limits each visitor and caps response length.

---

## 3. Chatbot evaluation (live site, run on 27 Nov 2026)

**Result: 31 of 32 questions passed (97%)**, run against the live site with Gemini Flash-Lite.

Each test has an expected answer computed separately in Python from the raw dataset. A question passes only if the answer contains the right number (or, for the 'can't answer' tests, says the data doesn't have it without inventing a figure).

| Category | Passed |
|---|---|
| Fact | 7 / 7 |
| Calculation | 5 / 5 |
| Comparison | 3 / 3 |
| As-of date | 4 / 4 |
| Follow-up | 3 / 4 |
| Can't answer | 4 / 4 |
| Changed data | 2 / 2 |
| Action | 2 / 2 |
| Diagnosis | 1 / 1 |

Median answer time: 3 s. Answers marked "✓ Numbers checked": 32 of 32.

**The one failure:** test 21 answered ₹136.77; the true value is ₹136.76 (₹93,000 ÷ 680). The fact-check tolerates rounding differences, so it let a ₹0.01 slip through. Next fix: round money to whole rupees in tool outputs, so there is nothing to mis-round.

**Fixes that came from earlier testing:**
- The model copied 1,905 as 1,505 → added the automatic number fact-check with one retry.
- Thresholds flagged Student Referrals as Stop on 1 Mar → added the 4-week ramp-up rule.
- Weeks with no spend looked free → cost per registration uses two-week windows.

Full question list and answers: `EVAL.md`.

---

## 4. Data cleaning

These rules follow the dataset's own read-me.

- **Duplicates removed** by stable ID: 20 check-ins, 4 status rows, 2 spend rows.
- **Only `external` people count.** That excludes 40 internal, 10 staff and 10 test people.
- **Verified visitor:** a distinct person with at least one `admitted` + `verified` check-in. Each person counts once across both days, and walk-ins (125) count too.
- **Status as of a date:** the latest history row on or before that day.
- **No future data in past views:** e.g. spend as of 12 Apr 2025 is ₹2,76,500, more than the final ₹2,74,000, because refunds were posted after the fest.
- **Reach, impressions and clicks** are anonymous counts and are never summed as people.

**Definitions used everywhere:**
- **Show-up rate** = verified visitors ÷ all registrations (68.8% in 2025).
- **Confirmed show-up** = verified visitors ÷ confirmed registrations (77%).

## 5. Key findings

1. **Paid Social and Creators:** 55% of spend, 25% of verified visitors, 50% show-up.
2. **Paid Social wore out:** about ₹130 per registration in February, rising to ₹370–660 in late March.
3. **Referrals and college partnerships got cheaper as they grew:** referrals fell from ₹177 to ₹29 per registration.
4. **The waitlist was unused:** 88 people stayed waitlisted while 183 cancelled, and only one was ever promoted.
5. **Nurture emails did nothing:** show-up was 68.9% with them and 68.7% without.
6. **Hypotheses (correlation only):**
   - Brochure downloaders showed up 74.7% vs 61.9%.
   - Question askers showed up 79.4% vs 68.0%.
   - Confirmed early registrants (more than 28 days ahead) showed up 73.9% vs 80.6% for later registrants.
7. **275 people abandoned the registration form.**

## 6. Model and assumptions (all in the Excel file)

- **Channel plan:** extra spend at 2× (base) or 1.3× (stretch) the 2025 cost per visitor; cut spend loses visitors at 1.5×.
- **Leak fixes:**
  - waitlist: 88 × 77% × 50%
  - reconfirmation: 1,331 × 6.7 pts × 50%
  - form recovery: 275 × 68.8% × 20%
  
  Together they add +116 in the base case.
- **Bridge:** 2,050 + 702 (bets) − 174 (cuts) = 2,578. Budget: ₹2.74L + ₹103K − ₹77K = ₹3L.
- **Moonshot (assumptions only):**
  - competitions: 15 × 12 teams × 5 × 50% new × 90% show-up = +405
  - metro shuttle: 575 no-shows × 30% travel × 50% fixed = +86. The 30% should be tested first with a short student survey.
- **Market:** 1,107 colleges in Bengaluru Urban (AISHE 2022-23) × 433 students per college (Karnataka, AISHE 2023-24) ≈ 4.8 lakh students. Segment sizes use national discipline shares, so they are estimates.
- **City constraints:**
  - Exams start in late April, so the fest is in the first half of April 2027.
  - Rival fests were on early-April weekends in 2026 (PES 3–4 Apr, Presidency 10–11 Apr); confirm their 2027 dates.
  - Bengaluru is the world's 2nd most congested city (TomTom 2025), so the venue goes near the metro.
  - The venue must handle 1,745 (commit) to 2,370 (moonshot) people on the peak day.

## 7. Prioritisation and thresholds

- **Ranking score:** extra visitors × confidence ÷ extra ₹K. Confidence is 70% for the first three bets (direct 2025 evidence), 50% for search and community (capped by search demand) and 60% for ambassadors (high variance).
- **Ranking:**
  1. Show-up engine (8.1)
  2. Referrals (5.1)
  3. College club passes (4.3)
  4. Search and community (2.9)
  5. Ambassadors (2.8)
- **Thresholds:** per bet, taken from 2025 data. Review every Monday, judge a channel only after 30 registrations, and stop only after 2 bad weeks (with the ramp-up rule above).
- **Gates (2027):** each gate has an owner from the 2025 campaign team.

  | Date | Registrations needed | Owner | Decision |
  |---|---|---|---|
  | 31 Jan | – | Dev, Meera | Show-up flows built, ambassadors recruited |
  | 16 Feb | ≥ 781 | Arjun | Paid burst on track or ended |
  | 2 Mar | ≥ 1,468 | Meera | Club pilot result, moonshot go/no-go |
  | 23 Mar | ≥ 2,414 | Dev | Held-back 10% to the top bet |
  | 6 Apr | ≥ 3,290 | Arjun | Final reconfirmations, venue lanes |

## 8. The Growth Center

- **Overview:** KPIs against the target version active on the selected date, the funnel, a projection before the event, weekly charts and computed insights.
- **Diagnose:** a sortable campaign table; clicking a campaign shows its trend against its lines and an automatic bottleneck diagnosis.
- **Decide:** scale, change, stop or ramp-up signals with editable thresholds, a "Create task" button, a budget what-if tool and budget planning.
- **Campaigns & tasks:** edit owner, status, budget and dates; create and track tasks.
- **Data:** add spend entries, import an updated .xlsx, back up, reset, plus data-quality checks and definitions.

Edits are saved in the browser, and every change recalculates every view and the AI's answers.

**How the AI analyst works:**
- **Tools, not summaries:** it answers through 12 tools that compute from the cleaned records as of the selected date (`get_overview`, `get_campaign_metrics`, `get_weekly_trend`, `get_threshold_status`, `get_insights`, a flexible `query_data`, `list_tasks`, `list_campaign_plans`, `simulate_budget_shift`, `calculate`, `propose_task`, `propose_campaign_update`).
- **Confirmation:** actions only create a card; nothing is saved until you confirm.
- **Fact-check:** every number is checked against the tool results (see Decision 1).

**Server function (`api/chat.js`):**
- holds the Gemini key in an environment variable
- accepts requests only from this site
- allows 150 model calls per visitor every 10 minutes
- caps responses at 1,024 tokens
- falls back to a second model if the first fails

The AI model is Gemini Flash-Lite. It answers in about 1 second per call, against 13–40 seconds for the larger Flash model. Accuracy is protected by the fact-check.

## 9. Setup

- **Vercel:** import the GitHub repo (preset "Other", no build step), add `GEMINI_API_KEY`, and deploy.
- **Locally:** open `index.html`. The dashboard works fully; the analyst needs a key in ⚙ settings.

## 10. Tools used

I built this with Claude as a coding and analysis partner: Python and pandas for the analysis, plain HTML, CSS and JavaScript for the app (charts are inline SVG, SheetJS is used only for .xlsx import), and Gemini for the analyst. The decisions in Section 2 are mine; I checked every number in the deck against the source data and the Excel model.

**Sources:**
- AISHE 2021-22, 2022-23 and 2023-24 (Ministry of Education)
- TomTom Traffic Index 2025
- Namma Metro figures (Nov 2026)
- 2026 fest dates from the PES, Presidency, ABBS and ISME listings

## 11. Known limitations

- **One edition of data.** Channel economics come from a single fictional edition, and scaling them is the biggest risk (hence the 2× penalty and the downside test).
- **Estimated segments.** Audience sizes use national discipline shares.
- **No student input yet.** The moonshot bets and the 30% travel no-show assumption are untested, and a student survey is the first step.
- **Per-browser saving.** Edits are saved per browser, not on a shared server; a shared database would be next.
- **Best-effort rate limit.** The limit is per server instance.
- **Show-up thresholds need check-ins.** Before the fest, the live signals use cost per registration.
