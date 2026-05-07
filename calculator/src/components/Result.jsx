import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Result({ userInput }) {
    const result = calculateInvestmentResults(userInput);
    const initialInvestment = result[0].valueEndOfYear - result[0].interest - result[0].annualInvestment;

    return (
        <table id="result">
            <thead>
                <tr>
                    <th>year</th>
                    <th>Investment year</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {result.map((data) => {
                    const totalInterest = data.valueEndOfYear - data.annualInvestment * data.year - initialInvestment;
                   
                    const totalAmountInvested = data.valueEndOfYear - totalInterest;

                 return (
                        <tr key={data.year}>
                        <td>{data.year}</td>
                        <td>{formatter.format(data.valueEndOfYear)}</td>
                        <td>{formatter.format(data.interest)}</td>
                        <td>{formatter.format(totalInterest)}</td>
                        <td>{formatter.format(totalAmountInvested)}</td>
                    </tr>
                )})
                }

            </tbody>
        </table>
    );
}