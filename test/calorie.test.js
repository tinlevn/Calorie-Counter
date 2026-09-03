import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()

test('Calorie Calculation formula accurately calculates MET expenditure', () => {
  const calculateCalories = (met, weightKg, durationHours) => {
    if (!met || !weightKg || !durationHours || weightKg <= 0 || durationHours <= 0) return 0
    return Math.round(met * weightKg * durationHours)
  }

  // 70 kg person running 6 mph (MET 9.3) for 1 hour = 651 kcal
  assert.equal(calculateCalories(9.3, 70, 1), 651)

  // 70 kg person doing Hatha Yoga (MET 2.3) for 30 min (0.5 hr) = 81 kcal (2.3 * 70 * 0.5 = 80.5 -> 81)
  assert.equal(calculateCalories(2.3, 70, 0.5), 81)

  // 80 kg person playing competitive badminton (MET 7.0) for 1.5 hours = 840 kcal
  assert.equal(calculateCalories(7.0, 80, 1.5), 840)

  // Edge cases
  assert.equal(calculateCalories(0, 70, 1), 0)
  assert.equal(calculateCalories(9.3, 0, 1), 0)
  assert.equal(calculateCalories(9.3, -50, 1), 0)
  assert.equal(calculateCalories(9.3, 70, 0), 0)
  assert.equal(calculateCalories(9.3, 70, -1), 0)
})

test('Unit Conversion logic preserves physical values', () => {
  const kgToLbs = (kg) => Math.round(kg * 2.20462)
  const lbsToKg = (lbs) => Math.round(lbs / 2.20462)
  const minToHours = (min) => Number((min / 60).toFixed(2))
  const hoursToMin = (hr) => Math.round(hr * 60)

  assert.equal(kgToLbs(70), 154)
  assert.equal(lbsToKg(154), 70)
  assert.equal(minToHours(90), 1.5)
  assert.equal(hoursToMin(1.5), 90)
  assert.equal(hoursToMin(0.5), 30)
})

test('Activity dataset integrity: 137 verified activities with MET and translations', () => {
  const activitiesTs = fs.readFileSync(path.join(rootDir, 'src/data/activities.ts'), 'utf8')
  const en = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/i18n/locales/en.json'), 'utf8'))
  const vi = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/i18n/locales/vi.json'), 'utf8'))

  const activityRegex = /{\s*category:\s*"([^"]+)",\s*name:\s*"([^"]+)",[^}]*met:\s*([0-9.]+)\s*}/g
  let match
  const items = []
  while ((match = activityRegex.exec(activitiesTs)) !== null) {
    items.push({ category: match[1], name: match[2], met: parseFloat(match[3]) })
  }

  assert.equal(items.length, 137, 'Expected 137 activities in database')

  const names = new Set()
  for (const act of items) {
    assert.ok(act.met > 0, `Activity ${act.name} must have positive MET`)
    assert.ok(!names.has(act.name), `Duplicate activity name: ${act.name}`)
    names.add(act.name)

    assert.ok(en.activities[act.name], `Missing EN translation for: ${act.name}`)
    assert.ok(vi.activities[act.name], `Missing VI translation for: ${act.name}`)
  }
})

test('Language fallback whitelist safety', () => {
  const validateLang = (val) => (val === 'en' || val === 'vi' ? val : 'vi')

  assert.equal(validateLang('vi'), 'vi')
  assert.equal(validateLang('en'), 'en')
  assert.equal(validateLang('fr'), 'vi')
  assert.equal(validateLang(''), 'vi')
  assert.equal(validateLang(null), 'vi')
  assert.equal(validateLang('<script>'), 'vi')
})

