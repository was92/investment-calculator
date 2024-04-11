document.querySelector('.calculator-form').addEventListener('submit', handleSubmit)
document.querySelector('.reset-button').addEventListener('click', reset)
document.querySelector('.increase-rate').addEventListener('click', () => adjustRate(1))
document.querySelector('.decrease-rate').addEventListener('click', () => adjustRate(-1))

function handleSubmit(e) {
    e.preventDefault()

    let principal = document.querySelector('.initial-investment')
    principal = principal.value
    principal = parseFloat(principal)

    let monthlyContribution = document.querySelector('.monthly-contribution')
    monthlyContribution = monthlyContribution.value
    monthlyContribution = parseFloat(monthlyContribution)

    let years = document.querySelector('.years')
    years = years.value
    years = parseFloat(years)

    let rate = document.querySelector('.interest-rate')
    rate = rate.textContent
    rate = parseFloat(rate)

    let futureValue = calculate(principal, monthlyContribution, years, rate)
    futureValue = formatCurrency(futureValue)

    let result = `Future Investment Value: $${futureValue}`

    document.querySelector('.result').innerText = result
}


function calculate(principal, monthlyContribution, years, rate) {
    let annualRate = rate / 100
    let futureValue = principal

    for (let i = 0; i < years; i++) {
      futureValue = futureValue * (1 + annualRate) + (monthlyContribution * 12)
    }

    return futureValue
}

function reset() {
    document.querySelector('.initial-investment').value = ''
    document.querySelector('.monthly-contribution').value = ''
    document.querySelector('.years').value = ''
    document.querySelector('.interest-rate').textContent = '1'
    document.querySelector('.result').innerText = ''
}

function adjustRate(amount) {
    let rateElement = document.querySelector('.interest-rate')
    let rate = parseInt(rateElement.textContent)

    rate += amount

    if (rate < 1) {
      rate = 1
    }

    rateElement.textContent = rate.toString()
}

function formatCurrency(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
