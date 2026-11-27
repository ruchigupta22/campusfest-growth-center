# CampusFest Growth Center: Attendee Growth (Challenge A)

**Ruchi Gupta** · RISA Labs Growth APM assignment

Goal: grow verified attendance at a Tier-1 college fest. City: **Bengaluru**.

| Deliverable | Where |
|---|---|
| 3-slide strategy PDF | `Ruchi_Gupta_RISA_Growth_Strategy.pdf` |
| Growth Center (dashboard, campaign and task manager, AI analyst) | `index.html` + `api/chat.js`, live at **https://campusfest-growth-center-eight.vercel.app** |
| Target model (all formulas live) | Spreadsheet: Target Model, Audiences & City, Slide 2 Bets, Slide 3 Signals |

---

## 1. Headline

Last edition reached 2,050 verified visitors on ₹2.74L of spend. The plan targets these numbers:

| | Base | Stretch | Moonshot |
|---|---|---|---|
| Verified visitors | **2,578** (+26%) | 3,009 (+47%) | 3,500 (+71%) |
| Spend | ₹3L | ₹3L | ₹3.4L |

The extra visitors come from two places:
- **Moving budget** from Paid Social and Creators into referrals, college club passes and ambassadors. This adds about 410 visitors.
- **Fixing leaks after registration:** promoting the waitlist, reconfirming early registrants and following up abandoned forms. This adds 116 visitors for ₹10K.

---

## 2. Data cleaning

These rules follow the dataset's own read-me.

- **Duplicates removed** by stable ID: 20 check-ins, 4 status rows and 2 spend rows.
- **People counted:** only `external` people count toward goals. That excludes 40 internal, 10 staff and 10 test people.
- **Verified visitor:** a distinct person with at least one `admitted` + `verified` check-in. Denied and pending check-ins don't count, and a person who came on both days counts once. Walk-ins (125) count as visitors but have no campaign.
- **Registration status:** taken from the latest history row on or before the selected date.
- **No future data:** every number is computed **as of** the selected date (end of day, IST), so nothing from later leaks into an earlier view.
- **Reach, impressions and clicks** are anonymous platform counts and are never summed as people.

---

## 3. Key findings (computed from the data)

1. **Paid channels were inefficient.** Paid Social and Creators took 55% of spend but brought 27% of registered visitors, and only 50% of their registrants showed up.
2. **Paid Social wore out.** Cost per registration was about ₹130 in February and rose to ₹370–660 in late March.
3. **Peer channels got cheaper as they grew.** Referrals fell from ₹177 to ₹29 per registration; college partnerships fell to ₹32–74 from mid-March.
4. **The waitlist was never used.** 88 people stayed on the waitlist while 183 people cancelled, and only one waitlisted person was ever promoted.
5. **Reminder emails didn't work.** Nurture emails had no effect on show-up (68.9% vs 68.7%).
6. **Two actions do predict show-up:**
   - brochure download: 74.7% vs 61.9%
   - asking a question: 79.4% vs 68.0%
7. **Early registrants are less reliable.** Confirmed people who registered more than 28 days ahead showed up 73.9% of the time, against 80.6% for later registrants.
8. **Forms were abandoned.** 275 people started the registration form and never finished it.

---

## 4. The model and its assumptions

**Base and stretch calculation.** Each channel's visitors are recalculated from its change in spend:
- Extra spend is priced at **2× (base)** or **1.3× (stretch)** last year's average cost per visitor for that channel. This builds in diminishing returns.
- Cut spend loses visitors at **1.5×** the channel's average cost per visitor, because the spend being cut was the least efficient spend.

**Leak fixes:**

| Fix | Calculation | Base | Stretch |
|---|---|---|---|
| Waitlist promotion | 88 × 77% × (50% base / 100% stretch) | 34 | 68 |
| Reconfirming early registrants | 1,331 × 6.7 pts × (50% / 100%) | 45 | 89 |
| Abandoned-form follow-up | 275 × 68.8% × (20% / 40%) | 38 | 76 |

**Moonshot.** Two new bets with no data behind them, so every input is an assumption:
- **Inter-college competitions:** 15 × 12 teams × 5 members × 50% new × 90% show-up = **+405**
- **Metro shuttle:** 575 no-shows × 30% caused by travel × 50% fixed = **+86**. The 30% is untested, and a student survey would be its first test.

**Market size:**
- Bengaluru Urban has 1,107 colleges (AISHE 2022-23). Karnataka averages 433 students per college (AISHE 2023-24), giving about 4.8 lakh students.
- Segment sizes apply national AISHE 2021-22 undergraduate discipline shares, so they are **estimates**.

**Bengaluru constraints:**
- **Exams:** autonomous colleges hold exams from late April, so the fest has to happen by mid-April.
- **Rival fests:** avoid the weekends of PES Aatmatrisha (3–4 Apr 2026) and Presidency Invincia (10–11 Apr 2026).
- **Traffic:** Bengaluru was the world's 2nd most congested city in 2025 (TomTom), so the venue should be near the metro (Namma Metro: 96.1 km, 83 stations).

---

## 5. Prioritisation framework

**Score = extra visitors (base) × confidence ÷ extra spend in ₹K.** This is confidence-weighted visitors per ₹1,000.

| Bet | Confidence | Why |
|---|---|---|
| Show-up engine, referrals, college club passes | 70% | Direct evidence in last year's data |
| Search and community | 50% | Capped by how many people search |
| Ambassadors | 60% | Results varied a lot between ambassadors |

The resulting ranking:
1. Show-up engine (score 8.1)
2. Referrals (5.1)
3. College club passes (4.3)
4. Search and community (2.9)
5. Ambassadors (2.8)

**Cut or rejected:** Paid Social always-on, Creators in the early weeks, and generic email blasts.

---

## 6. Thresholds (Slide 3)

- **Review cycle:** every Monday.
- **Minimum data:** don't judge a channel before it has 30 registrations.
- **Measure:** cost per registration over the last two complete weeks combined. Spend is posted in lumps, so single weeks are noisy.
- **Threshold lines** come from last year's data. For example, Paid Social's ₹130 scale line is what it cost while it was working.
- **Checkpoints** follow last year's registration pace: 22% of registrations by 16 Feb, 42% by 2 Mar, 69% by 23 Mar and 94% by 6 Apr.

---

## 7. The Growth Center app

**Tabs:**
- **Overview:** KPIs against the target version active on that date, the funnel, a projection when the date is before the event, weekly spend and registrations, and computed insights.
- **Diagnose:** a sortable campaign table. Clicking a row shows that campaign's weekly cost-per-registration trend against its scale and stop lines, plus an automatic bottleneck diagnosis.
- **Decide:** scale, change or stop signals with editable thresholds, a "create task" button for each signal, a budget-shift simulator, and budget planning (planned against spent against the strategy).
- **Campaigns & tasks:** edit a campaign's owner, status, budget, end date and notes; add campaigns; create, edit and delete tasks with owner, due date, priority and status, plus filters and overdue flags.
- **Data:**
  - add marketing activity entries
  - import an updated workbook (.xlsx) or a backup (.json)
  - reset to the original data
  - a data-quality report and metric definitions

**Saving.** Edits are saved in the browser (IndexedDB), so they survive a reload. Every change recalculates every view and the AI analyst's answers.

**AI Growth Analyst.** The chatbot works by **tool calling** on the live data. The model never sees a pre-written summary; it has to call functions that compute from the cleaned records as of the selected date:
- `get_overview`, `get_campaign_metrics`, `get_weekly_trend`, `get_threshold_status`, `get_insights`
- `query_data`: a flexible count, sum or average with filters and group-by, for questions the other tools don't cover
- `list_tasks`, `list_campaign_plans`, `simulate_budget_shift`, `calculate`
- `propose_task`, `propose_campaign_update`

The rules that keep it honest:
- **Actions need confirmation.** A proposal only shows a card, and nothing changes until the user clicks **Confirm**.
- **No invented numbers.** The system prompt forbids made-up figures and requires the analyst to say when the data can't answer.
- **Follow-ups work.** Questions can refer back to earlier turns.

**Which AI it uses.** Inside Claude it uses Claude automatically. On the hosted site it calls Gemini through a small serverless function, `api/chat.js`. The API key is stored only as a server environment variable, `GEMINI_API_KEY`, so it is never shipped to the browser or committed to the repo. A user can also paste their own key into ⚙ settings; it stays in their browser.

---

## 8. Setup

The app is a static `index.html` with the dataset embedded, plus one serverless function, `api/chat.js`, for the AI analyst.

**Deploy on Vercel:**
1. Import this GitHub repo at vercel.com/new. Set Framework preset to "Other"; no build step is needed.
2. Add an environment variable: `GEMINI_API_KEY` = your Google AI Studio key.
3. Click Deploy.

**Other ways to run it:**
- **GitHub Pages, or opening `index.html` locally:** the dashboard works fully, but the AI analyst needs a key pasted into ⚙ settings, because there is no server function there.

**Security:** the key never appears in the client code or the git history. GitHub secret scanning blocked an earlier attempt to commit it, which is why the key moved to the server.

---

## 9. Tools used

- **Claude:** data analysis (Python and pandas), model building, research, deck, app code and this README. I reviewed the data cleaning, the assumptions and every number against the source data.
- **Claude Sheets:** the live target model.
- **Python and pandas:** analysis and data export.
- **Plain HTML, CSS and JavaScript:** the app. No framework; charts are inline SVG.
- **SheetJS (CDN):** only used when importing an .xlsx file.
- **Gemini or Claude:** the analyst's AI.

**Sources:** AISHE 2021-22, 2022-23 and 2023-24 (Ministry of Education); TomTom Traffic Index 2025; Namma Metro (Wikipedia and news, Nov 2026); fest dates from the PES, Presidency, ABBS and ISME listings.

---

## 10. Known limitations

- **One past edition.** Channel economics come from a single fictional edition. Scaling spend 2–2.6× on referrals and college clubs is the biggest risk, which is why the base case prices extra spend at 2× cost.
- **Estimated audiences.** Audience sizes use national discipline shares, not Bengaluru-specific data.
- **Untested moonshot.** The moonshot bets, and the 30% travel no-show assumption, have not been tested.
- **Saving is per browser.** Edits live in each viewer's own browser, not on a shared server. A shared database such as Supabase would be the next step.
- **Simple projection.** Before the event, the projection assumes the last 14 days' registration pace continues, with 0.69 visitors per registration and 125 walk-ins.
- **Threshold signals use cost per registration only.** Show-up thresholds need check-in data, which exists only after the event.
- **Inside Claude, backup download doesn't work** (the viewer blocks file downloads). It works on the hosted site.
- **No rate limiting on the server function.** For a real launch, add per-IP rate limiting to `api/chat.js`.
