export const weatherScenarios = [
  {
    windSpeed: '12 km/h',
    rain: 'Light',
    temperature: '29°C',
    flightSafety: 'Safe',
    alert: null,
  },
  {
    windSpeed: '22 km/h',
    rain: 'Moderate',
    temperature: '27°C',
    flightSafety: 'Caution',
    alert: {
      titleKey: 'weather.alertTitle',
      messageKey: 'weather.alertCautionMessage',
    },
  },
  {
    windSpeed: '35 km/h',
    rain: 'Heavy',
    temperature: '25°C',
    flightSafety: 'Unsafe',
    alert: {
      titleKey: 'weather.alertTitle',
      messageKey: 'weather.alertUnsafeMessage',
    },
  },
]

export const environmentalImpactData = {
  co2Saved: '14.2 kg',
  fuelSaved: '5.1 L',
  greenDeliveries: 34,
  weeklyReductionPct: 68,
}
