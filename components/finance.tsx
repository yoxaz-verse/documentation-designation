import { useMemo, useState } from 'react'
import styles from './finance.module.css'

type TransactionInputs = {
  quantity: number
  unitPrice: number
  unitCost: number
  discountRate: number
  quality: number
  packaging: number
  warehousing: number
  inlandLogistics: number
  freight: number
  documentation: number
  serviceFeeRate: number
  taxRate: number
  advanceRate: number
  creditDays: number
}

type Field = {
  key: keyof TransactionInputs
  label: string
  suffix?: string
  step?: number
  max?: number
  hint: string
}

const example: TransactionInputs = {
  quantity: 1000,
  unitPrice: 120,
  unitCost: 98,
  discountRate: 2,
  quality: 2500,
  packaging: 6000,
  warehousing: 3000,
  inlandLogistics: 8500,
  freight: 12000,
  documentation: 2000,
  serviceFeeRate: 1,
  taxRate: 5,
  advanceRate: 30,
  creditDays: 30,
}

const fieldGroups: { title: string; fields: Field[] }[] = [
  {
    title: 'Goods and margin',
    fields: [
      { key: 'quantity', label: 'Quantity', suffix: 'kg', hint: 'Illustrative traded quantity' },
      { key: 'unitPrice', label: 'Selling price per kg', suffix: '₹', step: .01, hint: 'Illustrative buyer price' },
      { key: 'unitCost', label: 'Goods cost per kg', suffix: '₹', step: .01, hint: 'Illustrative seller cost' },
      { key: 'discountRate', label: 'Commercial discount', suffix: '%', step: .1, max: 100, hint: 'Reduction from gross goods value' },
    ],
  },
  {
    title: 'Execution costs',
    fields: [
      { key: 'quality', label: 'Quality / inspection', suffix: '₹', hint: 'Testing or inspection example' },
      { key: 'packaging', label: 'Packaging', suffix: '₹', hint: 'Packing-material and handling example' },
      { key: 'warehousing', label: 'Warehousing', suffix: '₹', hint: 'Storage example' },
      { key: 'inlandLogistics', label: 'Inland logistics', suffix: '₹', hint: 'Origin-to-dispatch movement example' },
      { key: 'freight', label: 'Freight', suffix: '₹', hint: 'Main transport example' },
      { key: 'documentation', label: 'Documentation', suffix: '₹', hint: 'Document-preparation example' },
    ],
  },
  {
    title: 'Terms and payment',
    fields: [
      { key: 'serviceFeeRate', label: 'Service / commission rate', suffix: '%', step: .1, max: 100, hint: 'Editable example—not an OBAOL rate' },
      { key: 'taxRate', label: 'Illustrative tax rate', suffix: '%', step: .1, max: 100, hint: 'Confirm the applicable tax independently' },
      { key: 'advanceRate', label: 'Advance payment', suffix: '%', step: 1, max: 100, hint: 'Share paid before the outstanding balance' },
      { key: 'creditDays', label: 'Credit period', suffix: 'days', max: 3650, hint: 'Time allowed before balance becomes due' },
    ],
  },
]

const glossary = [
  {
    title: 'Transaction value',
    terms: [
      ['Gross goods value', 'Quantity multiplied by the agreed unit price, before discount.'],
      ['Net goods value', 'Gross goods value less the stated commercial discount.'],
      ['Taxable value', 'The example value on which the selected tax rate is calculated. Confirm the actual tax treatment.'],
      ['Landed cost', 'Goods and execution costs required to bring the consignment to the defined destination.'],
    ],
  },
  {
    title: 'Payment structure',
    terms: [
      ['Advance', 'The agreed portion paid before later transaction milestones.'],
      ['Outstanding balance', 'The remaining amount after the advance is deducted.'],
      ['Credit period', 'The agreed number of days allowed for payment. It is not a guarantee of payment.'],
      ['Settlement', 'Confirmation that the amounts due under the agreed terms have been completed.'],
    ],
  },
  {
    title: 'Commercial outcome',
    terms: [
      ['Gross margin', 'Net goods value less the illustrative goods cost in this learning example.'],
      ['Margin percentage', 'Gross margin divided by net goods value. It is different from markup.'],
      ['Commission / service fee', 'An agreed charge for a defined service. The responsible party and basis must be documented.'],
      ['Execution cost', 'A cost for quality, packaging, storage, movement, freight or documentation.'],
    ],
  },
  {
    title: 'Risk concepts',
    terms: [
      ['Receivable', 'An amount contractually due but not yet received.'],
      ['Overdue balance', 'A receivable that remains unpaid after its agreed due date.'],
      ['Working-capital exposure', 'Cash committed to goods or execution before corresponding funds are received.'],
      ['Currency risk', 'Potential value change when costs and receipts use different currencies. No conversion is modelled here.'],
    ],
  },
]

function money(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value)
}

function cleanNumber(value: string, max = 1_000_000_000) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 0
  return Math.min(Math.max(parsed, 0), max)
}

function width(value: number, total: number) {
  return total > 0 ? Math.max((value / total) * 100, value > 0 ? 1.5 : 0) : 0
}

export function FinanceWorkspace() {
  const [inputs, setInputs] = useState<TransactionInputs>(example)
  const totals = useMemo(() => {
    const grossGoods = inputs.quantity * inputs.unitPrice
    const discount = grossGoods * inputs.discountRate / 100
    const netGoods = Math.max(grossGoods - discount, 0)
    const goodsCost = inputs.quantity * inputs.unitCost
    const execution = inputs.quality + inputs.packaging + inputs.warehousing + inputs.inlandLogistics + inputs.freight + inputs.documentation
    const serviceFee = netGoods * inputs.serviceFeeRate / 100
    const taxableValue = netGoods + execution + serviceFee
    const tax = taxableValue * inputs.taxRate / 100
    const finalValue = taxableValue + tax
    const advance = finalValue * inputs.advanceRate / 100
    const balance = Math.max(finalValue - advance, 0)
    const margin = netGoods - goodsCost
    const marginRate = netGoods > 0 ? margin / netGoods * 100 : 0
    const landedCost = goodsCost + execution
    return { grossGoods, discount, netGoods, goodsCost, execution, serviceFee, taxableValue, tax, finalValue, advance, balance, margin, marginRate, landedCost }
  }, [inputs])

  function update(field: Field, raw: string) {
    setInputs(current => ({ ...current, [field.key]: cleanNumber(raw, field.max) }))
  }

  const executionParts = [
    ['Quality', inputs.quality], ['Packaging', inputs.packaging], ['Warehousing', inputs.warehousing],
    ['Inland logistics', inputs.inlandLogistics], ['Freight', inputs.freight], ['Documentation', inputs.documentation],
  ] as [string, number][]
  const maxExecution = Math.max(...executionParts.map(([, value]) => value), 1)
  const composition = [
    ['Net goods', totals.netGoods, styles.goods], ['Execution', totals.execution, styles.execution],
    ['Service fee', totals.serviceFee, styles.fee], ['Tax', totals.tax, styles.tax],
  ] as [string, number, string][]

  return <main className={styles.finance}>
    <section className={styles.hero}>
      <div><span className={styles.eyebrow}>Finance · Internal learning workspace</span><h1>Understand the terms behind a trade.</h1><p>Explore how goods value, execution costs, payment timing and commercial outcomes relate—without treating an example as a quotation or company record.</p></div>
      <aside><span>MODEL</span><b>Illustrative only</b><p>INR examples · no saved data</p></aside>
    </section>

    <aside className={styles.boundary}><b>Responsibility boundary</b><p>Buyer and seller remain the commercial parties. Quality, packaging, warehousing, logistics, freight and documentation may be handled by either party, an existing provider or another execution participant. This page does not define OBAOL as trader, exporter of record, inventory owner, lender or payment guarantor.</p></aside>

    <section className={styles.intro}>
      <div><span className={styles.eyebrow}>Terms library</span><h2>Five financial views of one transaction</h2></div>
      <p>Use the definitions to prepare a conversation. The signed commercial agreement, invoice, tax advice and responsibility allocation remain the source of truth.</p>
    </section>
    <div className={styles.glossary}>{glossary.map(group => <section key={group.title}><h3>{group.title}</h3>{group.terms.map(([term, definition]) => <details key={term}><summary>{term}<span>+</span></summary><p>{definition}</p></details>)}</section>)}</div>

    <section className={styles.calculatorHeading}>
      <div><span className={styles.eyebrow}>Interactive example</span><h2>Build an illustrative transaction</h2></div>
      <button type="button" onClick={() => setInputs(example)}>Reset example</button>
    </section>

    <div className={styles.calculator}>
      <form className={styles.inputs} onSubmit={event => event.preventDefault()}>
        {fieldGroups.map(group => <fieldset key={group.title}><legend>{group.title}</legend><div>{group.fields.map(field => <label key={field.key}><span>{field.label}<small>{field.hint}</small></span><span className={styles.inputWrap}><input type="number" min="0" max={field.max || 1000000000} step={field.step || 1} value={inputs[field.key]} onChange={event => update(field, event.target.value)} aria-label={`${field.label}, ${field.suffix || 'number'}`} /><i>{field.suffix}</i></span></label>)}</div></fieldset>)}
      </form>

      <section className={styles.results} aria-live="polite">
        <span className={styles.eyebrow}>Calculated example</span><h2>{money(totals.finalValue)}</h2><p>Illustrative final transaction value including entered execution costs, service fee and tax.</p>
        <div className={styles.resultGrid}>
          <div><span>Net goods value</span><b>{money(totals.netGoods)}</b></div>
          <div><span>Execution costs</span><b>{money(totals.execution)}</b></div>
          <div><span>Advance</span><b>{money(totals.advance)}</b></div>
          <div><span>Outstanding</span><b>{money(totals.balance)}</b></div>
          <div><span>Landed cost</span><b>{money(totals.landedCost)}</b></div>
          <div className={totals.margin < 0 ? styles.negative : ''}><span>Gross margin</span><b>{money(totals.margin)} · {totals.marginRate.toFixed(1)}%</b></div>
        </div>
      </section>
    </div>

    <section className={styles.visualSection}>
      <div className={styles.sectionTitle}><span className={styles.eyebrow}>Linked visualizations</span><h2>See what changes when the terms change</h2><p>Charts and tables below use the same inputs and formulas as the summary.</p></div>
      <div className={styles.visualGrid}>
        <article className={`${styles.chart} ${styles.wide}`}><header><span>01</span><div><h3>Transaction-value composition</h3><p>What makes up the final illustrative value.</p></div></header><div className={styles.stack} aria-hidden="true">{composition.map(([label, value, tone]) => <span key={label} className={tone} style={{ width: `${width(value, totals.finalValue)}%` }} />)}</div><div className={styles.legend}>{composition.map(([label, value, tone]) => <div key={label}><i className={tone} /><span>{label}</span><b>{money(value)}</b></div>)}</div></article>

        <article className={styles.chart}><header><span>02</span><div><h3>Cost stack</h3><p>Entered execution costs, compared by size.</p></div></header><div className={styles.bars}>{executionParts.map(([label, value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value / maxExecution * 100}%` }} /></i><strong>{money(value)}</strong></div>)}</div></article>

        <article className={styles.chart}><header><span>03</span><div><h3>Advance and balance</h3><p>How the final value is split by payment term.</p></div></header><div className={styles.paymentSplit}><svg viewBox="0 0 42 42" role="img" aria-label={`${inputs.advanceRate}% advance and ${(100 - inputs.advanceRate).toFixed(0)}% balance`}><circle cx="21" cy="21" r="15.915" fill="transparent" stroke="currentColor" strokeWidth="6" /><circle className={styles.advanceArc} cx="21" cy="21" r="15.915" fill="transparent" strokeWidth="6" strokeDasharray={`${inputs.advanceRate} ${100 - inputs.advanceRate}`} strokeDashoffset="25" /><text x="21" y="20" textAnchor="middle">{inputs.advanceRate.toFixed(0)}%</text><text x="21" y="25" textAnchor="middle">advance</text></svg><div><span><i className={styles.advanceKey} />Advance <b>{money(totals.advance)}</b></span><span><i className={styles.balanceKey} />Balance <b>{money(totals.balance)}</b></span></div></div></article>

        <article className={`${styles.chart} ${styles.wide}`}><header><span>04</span><div><h3>Payment timeline</h3><p>Milestones are illustrative; the agreement determines actual triggers and dates.</p></div></header><div className={styles.timeline}><div><i>01</i><b>Terms agreed</b><span>Day 0 · responsibilities confirmed</span></div><div><i>02</i><b>Advance</b><span>{money(totals.advance)} · {inputs.advanceRate}% example</span></div><div><i>03</i><b>Execution milestones</b><span>Evidence and conditions documented</span></div><div><i>04</i><b>Balance due</b><span>{money(totals.balance)} · day {inputs.creditDays}</span></div><div><i>05</i><b>Settlement</b><span>Receipt and closure confirmed</span></div></div></article>

        <article className={`${styles.chart} ${styles.wide}`}><header><span>05</span><div><h3>Margin bridge</h3><p>Net goods value minus illustrative goods cost.</p></div></header><div className={styles.bridge}><div><i style={{ height: '100%' }} /><b>{money(totals.netGoods)}</b><span>Net goods</span></div><em>−</em><div><i style={{ height: `${width(totals.goodsCost, Math.max(totals.netGoods, totals.goodsCost))}%` }} /><b>{money(totals.goodsCost)}</b><span>Goods cost</span></div><em>=</em><div className={totals.margin < 0 ? styles.lossBar : styles.marginBar}><i style={{ height: `${width(Math.abs(totals.margin), Math.max(totals.netGoods, totals.goodsCost))}%` }} /><b>{money(totals.margin)}</b><span>{totals.margin < 0 ? 'Illustrative loss' : 'Gross margin'}</span></div></div></article>
      </div>
    </section>

    <section className={styles.tableSection}><div><span className={styles.eyebrow}>Accessible calculation record</span><h2>Example breakdown</h2></div><div className={styles.tableWrap}><table><thead><tr><th>Line</th><th>Formula or basis</th><th>Illustrative amount</th></tr></thead><tbody>
      <tr><td>Gross goods value</td><td>{inputs.quantity.toLocaleString('en-IN')} kg × {money(inputs.unitPrice)}</td><td>{money(totals.grossGoods)}</td></tr>
      <tr><td>Discount</td><td>{inputs.discountRate}% of gross goods value</td><td>− {money(totals.discount)}</td></tr>
      <tr><td>Net goods value</td><td>Gross value − discount</td><td>{money(totals.netGoods)}</td></tr>
      <tr><td>Execution costs</td><td>Sum of six entered cost items</td><td>{money(totals.execution)}</td></tr>
      <tr><td>Service / commission</td><td>{inputs.serviceFeeRate}% of net goods value</td><td>{money(totals.serviceFee)}</td></tr>
      <tr><td>Tax</td><td>{inputs.taxRate}% of the example taxable value</td><td>{money(totals.tax)}</td></tr>
      <tr className={styles.totalRow}><td>Final transaction value</td><td>Net goods + execution + service fee + tax</td><td>{money(totals.finalValue)}</td></tr>
      <tr><td>Illustrative gross margin</td><td>Net goods value − goods cost</td><td>{money(totals.margin)} ({totals.marginRate.toFixed(1)}%)</td></tr>
    </tbody></table></div></section>

    <aside className={styles.disclaimer}><b>Educational use only</b><p>All values, rates, responsibilities and milestones on this page are editable illustrations. They are not OBAOL quotations, approved fees, tax advice, credit offers, guarantees or records of company performance. Verify the commercial agreement, applicable law, tax treatment and responsible party for each real transaction.</p></aside>
  </main>
}
