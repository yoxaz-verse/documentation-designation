import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './portal.module.css'

type Pair = [string, string]

function safeGet(key: string, fallback: any) {
  if (typeof window === 'undefined') return fallback
  try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback }
}
function safeSet(key: string, value: any) {
  try { window.localStorage.setItem(key, JSON.stringify(value)) } catch { /* browser storage is optional */ }
}

export function Hero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className={styles.hero}><span className={styles.eyebrow}>{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className={styles.heroActions}><Link href="/departments/research/workflow" className={styles.primaryButton}>Open workflow tools</Link><Link href="/departments/research/daily-operations" className={styles.secondaryButton}>Start daily work</Link></div></section>
}

export function DepartmentHub({ compact = false }: { compact?: boolean }) {
  const future = [['Property', 'Property operations and asset coordination'], ['Human Resources', 'People operations and team development'], ['Finance', 'Financial controls and reporting'], ['Operations', 'Cross-functional delivery and process control']]
  return <div className={styles.hub}>
    <section className={styles.hubHero}><span className={styles.eyebrow}>Internal operations</span><h1>One company.<br /><span>Clear departments.</span></h1><p>Department-specific operating guides for OBAOL Supreme. Start with the active Research & Strategic Opportunities workspace.</p></section>
    <div className={styles.sectionLabel}><span>Active departments</span><span>02 live</span></div>
    <div className={styles.activeDepartmentList}><Link href="/departments/research" className={styles.activeDepartment}>
      <div><span className={styles.badge}>RSO · Active</span><h2>Research & Strategic Opportunities</h2><p>Discover, verify and convert opportunities into funding, partnerships, participation and measurable outcomes.</p></div>
      <div className={styles.activeStats}><span><b>4</b> research functions</span><span><b>3</b> execution functions</span><span className={styles.arrow}>Explore department →</span></div>
    </Link>
    <Link href="/departments/business-development" className={`${styles.activeDepartment} ${styles.bdDepartment}`}>
      <div><span className={styles.badge}>BD · Active</span><h2>Business Development</h2><p>Identify the right Associates, build relevant conversations, qualify interest and generate meetings for Sales.</p></div>
      <div className={styles.activeStats}><span><b>12</b> associate types</span><span><b>1</b> sales handover</span><span className={styles.arrow}>Explore department →</span></div>
    </Link></div>
    <div className={styles.sectionLabel}><span>Department roadmap</span><span>Coming soon</span></div>
    <div className={styles.departmentGrid}>{future.map(([name, description], i) => <div className={styles.futureDepartment} key={name} aria-disabled="true"><span className={styles.departmentNumber}>0{i + 2}</span><h3>{name}</h3><p>{description}</p><span className={styles.soon}>Coming soon</span></div>)}</div>
    {!compact && <section className={styles.howItWorks}><div><span className={styles.eyebrow}>How to use this portal</span><h2>Guidance that moves work forward</h2></div><div className={styles.threeSteps}>{[['01', 'Understand', 'Learn the mission, roles and ownership model.'], ['02', 'Execute', 'Follow verified procedures, handoffs and approvals.'], ['03', 'Measure', 'Record activity, outcomes and next actions.']].map(x => <div key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></section>}
  </div>
}

export function MetricStrip({ items }: { items: Pair[] }) { return <div className={styles.metricStrip}>{items.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div> }

export function OutcomeGrid() {
  const items = [['Capital', 'Grants, funding programs and investors'], ['Ecosystem', 'Incubators, accelerators and mentors'], ['Institutions', 'Colleges, universities and campus partnerships'], ['Visibility', 'Exhibitions, festivals, speaking and demos'], ['Recognition', 'Awards, challenges and competitions'], ['Resources', 'Technology credits, market access and support']]
  return <div className={styles.outcomeGrid}>{items.map(([title, text], i) => <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
}

export function OrgArchitecture() {
  return <div className={styles.org}><div className={styles.orgTop}><b>Founder / Management</b><span>Final strategic decisions and approvals</span></div><span className={styles.connector}>↓</span><div className={styles.orgLead}><b>RSO Department Coordinator</b><span>Planning · Quality · Handoffs · Reporting</span></div><span className={styles.connector}>↓</span><div className={styles.orgColumns}><div><b>Division A · Research</b><span>R1 Funding & Investors</span><span>R2 Startup Ecosystem</span><span>R3 Institutions</span><span>R4 Events & Awards</span></div><div><b>Division B · Execution</b><span>E1 Applications</span><span>E2 College Outreach</span><span>E3 External Outreach</span></div></div></div>
}

export function Principle() { return <div className={styles.principle}><span>Department operating principle</span><strong>Research → Verify → Qualify → Approve → Assign → Execute → Follow Up → Measure</strong></div> }

const researchFunctions = [
  { id: 'R1', title: 'Grants, Funding & Investor Intelligence', purpose: 'Discover financial opportunities and relevant capital providers.', streams: 'Government and private grants · open funding · investors · pitch events · incubator funding', deliverable: 'Provider, eligibility, instrument, fit, deadline, source, documents, effort and next step.', handoff: 'Qualified opportunities → E1. Investors require fit assessment and outreach approval.' },
  { id: 'R2', title: 'Incubation & Startup Ecosystem', purpose: 'Find programs offering validation, capital access, mentors, technology and networks.', streams: 'Incubators · accelerators · startup missions · challenges · founder programs · credits · market access', deliverable: 'Benefits, cohort dates, duration, eligibility, location, fees/equity, deadline, link and expected value.', handoff: 'Formal applications → E1. Partnership discussions may go to E3.' },
  { id: 'R3', title: 'College & Institutional Research', purpose: 'Build a qualified pipeline of agricultural universities and colleges.', streams: 'Agriculture departments · placement cells · incubation cells · training · entrepreneurship · events', deliverable: 'Profile, relevant department, official contact, named public contact, proposal angle and evidence.', handoff: 'All external institutional communication → E2.' },
  { id: 'R4', title: 'Events, Awards & Exhibitions', purpose: 'Find credible participation and visibility opportunities without defaulting to sponsorship.', streams: 'Festivals · expos · awards · competitions · trade events · conferences · networking', deliverable: 'Official page, organizer, date, location, audience, format, process, deadline, fees and fit.', handoff: 'Registration and organizer contact → E3. Funding applications → E1.' }
]

export function FunctionCards() { return <div className={styles.functionList}>{researchFunctions.map(f => <details className={styles.detailCard} key={f.id} open={f.id === 'R1'}><summary><span className={styles.code}>{f.id}</span><div><b>{f.title}</b><small>{f.purpose}</small></div><span className={styles.chevron}>+</span></summary><div className={styles.detailBody}><p><b>Research streams</b><br />{f.streams}</p><p><b>Required deliverable</b><br />{f.deliverable}</p><p className={styles.handoff}><b>Handoff</b><br />{f.handoff}</p></div></details>)}</div> }

export function OwnershipTable() {
  const rows = [['Government agritech grant', 'R1', 'E1'], ['Agriculture-focused VC fund', 'R1', 'E1'], ['Incubator admitting startups', 'R2', 'E1'], ['Accelerator offering seed capital', 'R2', 'E1'], ['University incubation centre', 'R2', 'E1'], ['Agricultural college collaboration', 'R3', 'E2'], ['Agricultural college startup festival', 'R4', 'E3'], ['National startup award', 'R4', 'E3'], ['Agritech exhibition booth', 'R4', 'E3'], ['Corporate pilot / market access', 'R2', 'E1 or E3']]
  return <div className={styles.tableWrap}><table><thead><tr><th>Opportunity</th><th>Research</th><th>Execution</th></tr></thead><tbody>{rows.map(r => <tr key={r[0]}>{r.map((v, i) => <td key={v}>{i ? <span className={styles.tableCode}>{v}</span> : v}</td>)}</tr>)}</tbody></table></div>
}

export function MethodSteps() { const steps = [['Define intent', 'Set category, relevance, eligibility needs and desired outcome.'], ['Search primary sources', 'Use official portals, organizers, universities and provider websites.'], ['Expand discovery', 'Use targeted phrases, announcements, networks and calendars.'], ['Verify and enrich', 'Confirm dates, eligibility and contacts; save evidence and check duplicates.'], ['Evaluate internally', 'Score relevance, finish the brief and submit it for review.']]; return <div className={styles.steps}>{steps.map((s, i) => <div key={s[0]}><span>0{i + 1}</span><div><b>{s[0]}</b><p>{s[1]}</p></div></div>)}</div> }

export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { setCopied(false) } }
  return <div className={styles.copyBlock}><div><span>{label}</span><code>{text}</code></div><button type="button" onClick={copy} aria-label={`Copy ${label} query`}>{copied ? '✓ Copied' : 'Copy'}</button></div>
}

const execution = [
  { id: 'E1', label: 'Applications', title: 'Funding, Investor & Program Applications', steps: ['Review requirements and create a task checklist.', 'Request company documents through authorized channels.', 'Draft answers using approved company information.', 'Coordinate sensitive financial and strategic responses.', 'Obtain approval for fees, equity, legal terms and disclosures.', 'Submit the authorized application and save proof.', 'Track responses, interviews and final decisions.'] },
  { id: 'E2', label: 'Institutions', title: 'College Collaboration & Campus Outreach', steps: ['Receive verified institution profiles from R3.', 'Segment by region, relevance and contact department.', 'Send a personalized introduction through an official channel.', 'Propose internships, presentations or industry interaction.', 'Track replies, follow-ups and meeting status.', 'Coordinate discussions with the OBAOL representative.', 'Record agreed activities and maintain the relationship.'] },
  { id: 'E3', label: 'Events', title: 'Events, Awards & Ecosystem Outreach', steps: ['Receive qualified events and award opportunities from R4.', 'Identify the correct participation coordinator.', 'Ask about startup participation before sponsorship.', 'Collect costs, eligibility and presentation requirements.', 'Prepare the proposal or award nomination.', 'Secure approval before fees, travel or registration.', 'Record participation, contacts and post-event actions.'] }
]

export function ExecutionTabs() {
  const [active, setActive] = useState(0)
  const item = execution[active]
  return <div className={styles.tabPanel}><div className={styles.tabList} role="tablist" aria-label="Execution functions">{execution.map((e, i) => <button key={e.id} role="tab" aria-selected={active === i} className={active === i ? styles.activeTab : ''} onClick={() => setActive(i)}><span>{e.id}</span>{e.label}</button>)}</div><div className={styles.tabContent} role="tabpanel"><span className={styles.badge}>{item.id}</span><h3>{item.title}</h3><ol>{item.steps.map(s => <li key={s}>{s}</li>)}</ol></div></div>
}

export function ApprovalMatrix() {
  const rows = [['Research opportunity', 'R', 'I', 'A', 'I'], ['Verify research brief', 'R', 'C', 'A', 'I'], ['Prioritize and assign', 'C', 'I', 'R/A', 'I'], ['Prepare application', 'C', 'R', 'A', 'C'], ['Contact colleges / organizers', 'C', 'R', 'A', 'I'], ['Approve financial commitments', 'I', 'C', 'R', 'A'], ['Approve sensitive disclosures', 'I', 'R', 'C', 'A'], ['Submit authorized application', 'I', 'R', 'A', 'I'], ['Report weekly results', 'R', 'R', 'A', 'I']]
  return <><p className={styles.legend}><b>R</b> performs · <b>A</b> accountable · <b>C</b> consulted · <b>I</b> informed</p><div className={styles.tableWrap}><table><thead><tr><th>Activity</th><th>Researcher</th><th>Execution</th><th>Coordinator</th><th>Founder</th></tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((v, i) => <td key={i}>{i ? <span className={v.includes('A') ? styles.accountable : styles.raci}>{v}</span> : v}</td>)}</tr>)}</tbody></table></div></>
}

const lifecycle = ['Discovered', 'Research in Progress', 'Verified', 'Qualified', 'Coordinator Review', 'Approved / Assigned', 'In Preparation', 'Submitted / Contacted', 'Follow-up', 'Closed']
export function Lifecycle() { return <div className={styles.lifecycle}>{lifecycle.map((x, i) => <div key={x}><span>{i + 1}</span><b>{x}</b></div>)}</div> }

const verificationItems = ['Official source or organizer identity confirmed', 'Program or event is valid or marked upcoming', 'Deadline or rolling intake verified', 'Business and startup-stage eligibility checked', 'Location and participation requirements checked', 'Benefits, fees and equity conditions recorded', 'Application or contact method verified', 'Duplicate check completed', 'OBAOL relevance explained', 'Supporting link and verification date saved']
export function VerificationChecklist() {
  const key = 'obaol-rso-verification-v1'; const empty = Array(10).fill(false); const [checked, setChecked] = useState<boolean[]>(empty)
  useEffect(() => setChecked(safeGet(key, empty)), [])
  function update(next: boolean[]) { setChecked(next); safeSet(key, next) }
  const count = checked.filter(Boolean).length
  return <section className={styles.toolCard}><div className={styles.toolHeader}><div><span className={styles.eyebrow}>Research quality</span><h3>{count}/10 complete</h3></div><button className={styles.textButton} onClick={() => update(empty)}>Reset</button></div><div className={styles.progress}><span style={{ width: `${count * 10}%` }} /></div><div className={styles.checkGrid}>{verificationItems.map((item, i) => <label key={item} className={checked[i] ? styles.checked : ''}><input type="checkbox" checked={checked[i]} onChange={() => update(checked.map((v, j) => j === i ? !v : v))} /><span>{item}</span></label>)}</div>{count === 10 && <p className={styles.success}>✓ Ready for coordinator review</p>}</section>
}

const scoreFactors = [{ name: 'Business relevance', weight: 25 }, { name: 'Eligibility confidence', weight: 25 }, { name: 'Strategic value', weight: 20 }, { name: 'Outcome likelihood', weight: 15 }, { name: 'Execution feasibility', weight: 15 }]
export function OpportunityScorecard() {
  const [scores, setScores] = useState([4, 3, 4, 3, 4]); const [eligible, setEligible] = useState(true)
  const total = useMemo(() => Math.round(scoreFactors.reduce((sum, f, i) => sum + (scores[i] / 5) * f.weight, 0)), [scores])
  const label = !eligible ? 'Not eligible' : total >= 80 ? 'High priority' : total >= 60 ? 'Medium priority' : 'Low priority'
  return <section className={styles.scorecard}><div className={styles.scoreInputs}>{scoreFactors.map((f, i) => <label key={f.name}><span><b>{f.name}</b><small>{f.weight} points</small></span><select value={scores[i]} onChange={e => setScores(s => s.map((v, j) => j === i ? Number(e.target.value) : v))} aria-label={`${f.name} score`}>{[0,1,2,3,4,5].map(n => <option value={n} key={n}>{n} / 5</option>)}</select></label>)}<label className={styles.eligibility}><input type="checkbox" checked={eligible} onChange={e => setEligible(e.target.checked)} /><span><b>Mandatory eligibility confirmed</b><small>Turn off if any required condition fails.</small></span></label></div><div className={`${styles.scoreResult} ${!eligible ? styles.scoreBlocked : total >= 80 ? styles.scoreHigh : total >= 60 ? styles.scoreMedium : styles.scoreLow}`}><span>Weighted score</span><strong>{total}<small>/100</small></strong><b>{label}</b><p>{!eligible ? 'Mandatory eligibility overrides the numerical score.' : total >= 80 ? 'Send for immediate coordinator assessment.' : total >= 60 ? 'Review against workload and deadlines.' : 'Retain only if potentially useful later.'}</p></div></section>
}

export function DatabaseCards() { const dbs = [['01', 'Source Registry', 'Websites and organizations to monitor'], ['02', 'Opportunity Master', 'Verified opportunities and pipeline'], ['03', 'Organizations & Contacts', 'Colleges, investors, organizers and incubators'], ['04', 'Application & Outreach', 'Submissions, calls and emails'], ['05', 'Task & Deadline Tracker', 'Owners, due dates and pending work'], ['06', 'Reporting Dashboard', 'Weekly output and conversion metrics']]; return <div className={styles.databaseGrid}>{dbs.map(d => <div key={d[0]}><span>{d[0]}</span><b>{d[1]}</b><p>{d[2]}</p></div>)}</div> }

const roleTasks = [
  { role: 'Coordinator', tasks: ['Review urgent deadlines and pending approvals', 'Allocate searches and confirm owners', 'Review completed research briefs', 'Approve, return, hold or reject handoffs', 'Resolve execution blockers', 'Check database quality and overdue work', 'Record decisions and tomorrow’s priorities'] },
  { role: 'Research', tasks: ['Review assigned searches, deadlines and sources', 'Discover opportunities using primary sources', 'Verify eligibility, dates, costs and contact routes', 'Check duplicates and save source evidence', 'Complete the research brief and score', 'Submit qualified records for review', 'Report activity, blockers and next priorities'] },
  { role: 'Execution', tasks: ['Review applications, meetings and follow-ups', 'Accept assigned work and set next-action dates', 'Prepare applications or personalized outreach', 'Request missing approved information', 'Log submissions, emails, calls and replies', 'Escalate fees, disclosures and binding terms', 'Report progress, outcomes and next actions'] }
]
export function RoleTaskTabs() {
  const [active, setActive] = useState(0); const key = `obaol-rso-tasks-${active}`; const [checked, setChecked] = useState<boolean[]>([])
  useEffect(() => setChecked(safeGet(key, Array(roleTasks[active].tasks.length).fill(false))), [key, active])
  function updateTasks(next: boolean[]) { setChecked(next); safeSet(key, next) }
  const item = roleTasks[active]; const count = checked.filter(Boolean).length
  return <section className={styles.taskTool}><div className={styles.tabList} role="tablist" aria-label="Daily checklists">{roleTasks.map((r, i) => <button key={r.role} role="tab" aria-selected={active === i} className={active === i ? styles.activeTab : ''} onClick={() => setActive(i)}>{r.role}</button>)}</div><div className={styles.taskHeader}><div><span className={styles.eyebrow}>{item.role} daily checklist</span><h3>{count} of {item.tasks.length} completed</h3></div><button className={styles.textButton} onClick={() => updateTasks(Array(item.tasks.length).fill(false))}>Reset</button></div><div className={styles.taskList}>{item.tasks.map((task, i) => <label key={task} className={checked[i] ? styles.checked : ''}><input type="checkbox" checked={Boolean(checked[i])} onChange={() => updateTasks(checked.map((v, j) => j === i ? !v : v))} /><span>{task}</span></label>)}</div></section>
}

const reportFields = ['Opportunities / Records Reviewed', 'New Opportunities Discovered', 'Opportunities Verified', 'Opportunities Qualified', 'Applications / Outreach Actions Completed', 'Follow-ups Completed', 'Important Deadlines', 'Blockers / Approval Required', 'Opportunity IDs Updated', 'Priorities for Next Working Day']
export function DailyReportBuilder() {
  const key = 'obaol-rso-daily-report-v1'; const empty = { date: '', member: '', role: '', values: Array(10).fill('') }
  const [form, setForm] = useState<{date:string; member:string; role:string; values:string[]}>(empty); const [copied, setCopied] = useState(false); const [loaded, setLoaded] = useState(false)
  useEffect(() => { setForm(safeGet(key, empty)); setLoaded(true) }, [])
  useEffect(() => { if (loaded) safeSet(key, form) }, [form, loaded])
  const report = `OBAOL Supreme – RSO Daily Work Report\nDate: ${form.date || '—'}\nTeam Member: ${form.member || '—'}\nRole / Research Category: ${form.role || '—'}\n\n${reportFields.map((x, i) => `${i + 1}. ${x}: ${form.values[i] || '—'}`).join('\n')}\n\nAll records have been updated in the central tracker.`
  async function copy() { try { await navigator.clipboard.writeText(report); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) } }
  return <section className={styles.reportBuilder}><div className={styles.reportForm}><div className={styles.fieldRow}><label>Date<input type="date" value={form.date} onChange={e => setForm({...form, date:e.target.value})} /></label><label>Team member<input value={form.member} onChange={e => setForm({...form, member:e.target.value})} placeholder="Name" /></label></div><label>Role / research category<input value={form.role} onChange={e => setForm({...form, role:e.target.value})} placeholder="e.g. R2 · Ecosystem Intelligence" /></label>{reportFields.map((field, i) => <label key={field}>{i + 1}. {field}<textarea rows={2} value={form.values[i]} onChange={e => setForm({...form, values:form.values.map((v,j) => j === i ? e.target.value : v)})} placeholder="Add a concise update" /></label>)}<div className={styles.formActions}><button className={styles.primaryButton} onClick={copy}>{copied ? '✓ Report copied' : 'Copy formatted report'}</button><button className={styles.textButton} onClick={() => setForm(empty)}>Clear draft</button></div></div><pre className={styles.reportPreview} aria-label="Daily report preview">{report}</pre></section>
}

export function WeeklyRhythm() { return <div className={styles.rhythm}>{[['MON', 'Research planning', 'Allocate categories, review coverage and assign high-priority opportunities.'], ['WED', 'Pipeline & deadline review', 'Check work in progress, replies, blockers and at-risk deadlines.'], ['FRI', 'Performance review', 'Evaluate quality, conversions and improvements for the next week.']].map(x => <div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div> }

export function KpiGrid() { const items = ['Sources Checked', 'Opportunities Found', 'Verification Rate', 'Qualification Rate', 'Handoff Acceptance', 'Submission Completion', 'On-time Submission', 'Outreach Response', 'College Meetings', 'Event Confirmations', 'Successful Outcomes', 'Overdue Tasks']; return <div className={styles.kpiGrid}>{items.map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, '0')}</span>{x}</div>)}</div> }

export function Roadmap() { const weeks = [['Week 1', 'Build the foundation', 'Appoint the coordinator, define roles, establish categories, create core databases and approve company information.', 'Working structure and core databases'], ['Week 2', 'Launch research', 'Allocate sources, train for quality, begin discovery and build the first qualified pipelines.', 'Verified funding, ecosystem, college and event records'], ['Week 3', 'Begin execution', 'Assign accepted opportunities, prepare applications and start institutional and organizer outreach.', 'Applications, communication history and booked discussions'], ['Week 4', 'Review and improve', 'Measure quality, output, conversion and bottlenecks; update templates and targets.', 'First monthly report and revised operating plan']]; return <div className={styles.roadmap}>{weeks.map((w, i) => <div key={w[0]}><div><span>{w[0]}</span><b>0{i + 1}</b></div><section><h3>{w[1]}</h3><p>{w[2]}</p><small>Deliverable</small><strong>{w[3]}</strong></section></div>)}</div> }

export function ExampleFlow() { const steps = [['R2 · Research', 'Verify the incubator’s admission conditions, dates, benefits, fees and procedure. Create OBAOL-RSO-0001.'], ['Coordinator · Qualification', 'Assess business stage, eligibility, benefit and effort, then approve preparation.'], ['E1 · Application', 'Prepare the application, use approved materials, secure sign-off and submit.'], ['E1 · Follow-up', 'Track acknowledgement, interviews, clarifications and the selection result.'], ['Coordinator · Outcome', 'Record the decision, document learning and improve future criteria.']]; return <div className={styles.exampleFlow}>{steps.map((s, i) => <div key={s[0]}><span>{i + 1}</span><section><b>{s[0]}</b><p>{s[1]}</p></section></div>)}</div> }
