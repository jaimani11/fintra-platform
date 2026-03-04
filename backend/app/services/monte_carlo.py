import random

def run_monte_carlo(
    revenue,
    payroll_ratio,
    other_burn,
    simulations=2000
):

    runway_results = []

    for _ in range(simulations):

        rev = revenue
        payroll = rev * payroll_ratio
        cash = 800000

        for _ in range(6):  # 6 month projection

            rev *= 1 + random.uniform(-0.15, 0.15)
            payroll = rev * payroll_ratio * \
                (1 + random.uniform(-0.1, 0.1))

            burn = payroll + other_burn
            cash += rev - burn

        runway_results.append(cash / burn)

    runway_results.sort()

    return {
        "avg_runway": round(sum(runway_results)/len(runway_results),1),
        "worst_runway": round(runway_results[0],1),
        "p10": runway_results[int(len(runway_results)*0.1)]
    }
