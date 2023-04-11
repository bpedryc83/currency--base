import { cleanup } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLNtoUSD = [
  { amount: 100, conversedAmount: 28.57 },
  { amount: 20, conversedAmount: 5.71, },
  { amount: 200, conversedAmount: 57.14, },
  { amount: 345, conversedAmount: 98.57, },
];

const testCasesUSDtoPLN = [
  { amount: 28.57, conversedAmount: 100 },
  { amount: 5.71, conversedAmount: 19.99 },
  { amount: 57.14, conversedAmount: 199.99 },
  { amount: 98.57, conversedAmount: 345 },
];
const testCasesFromIsEqualTo = [
  { from: 'PLN', amount: 14, to: 'PLN', conversedAmount: 14 },
  { from: 'PLN', amount: 50.5, to: 'PLN', conversedAmount: 50.5 },
  { from: 'USD', amount: 21, to: 'USD', conversedAmount: 21 },
  { from: 'USD', amount: 143.2, to: 'USD', conversedAmount: 143.2 },
];
const testNegativeValue = [
  {amount: -23},
  {amount: -0.5},
  {amount: -324.7},
]

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
      for (const testObj of testCasesPLNtoUSD) {
        render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

        const results = screen.getByTestId('resultsMainDiv');
        expect(results).toHaveTextContent('PLN ' + testObj.amount.toFixed(2) + ' = $' + testObj.conversedAmount);

        cleanup();
      }
    });
    it('should render proper info about conversion when USD -> PLN', () => {
      for (const testObj of testCasesUSDtoPLN) {
        render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

        const results = screen.getByTestId('resultsMainDiv');
        expect(results).toHaveTextContent('$' + testObj.amount.toFixed(2) + ' = PLN ' + testObj.conversedAmount);

        cleanup();
      }
    });
    it('should render the same both values when both currents are the same', () => {
      for (const testObj of testCasesFromIsEqualTo) {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

        const results = screen.getByTestId('resultsMainDiv');
        expect(results).toHaveTextContent(
          (testObj.from === 'PLN' ? 'PLN ' : '$') 
          + testObj.amount.toFixed(2)
          + ' = '
          + (testObj.to === 'PLN' ? 'PLN ' : '$')
          + testObj.conversedAmount.toFixed(2)
        );

        cleanup();
      }
    });
  it('should render "wrong value" when entered amount is negative', () => {
    for (const testObj of testNegativeValue) {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const resultsUSDtoPLN = screen.getByTestId('resultsMainDiv');
        expect(resultsUSDtoPLN).toHaveTextContent("Wrong value");

      cleanup();

      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const resultsPLNtoUSD = screen.getByTestId('resultsMainDiv');
        expect(resultsPLNtoUSD).toHaveTextContent("Wrong value");

      cleanup();
    }
  });
});