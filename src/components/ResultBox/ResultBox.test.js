import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';

describe('Component ResultBox', () => {

    it('should render proper info about conversion when PLN -> USD', () => {

        const testCases = [
            { amount: 100},
            { amount: 20},
            { amount: 200},
            { amount: 345,},
        ];

        for(const testObj of testCases) {

            render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

            const output = screen.getByTestId('output');

            const expectedOutput = `${formatAmountInCurrency(testObj.amount, 'PLN')} = ${convertPLNToUSD(testObj.amount)}`;

            expect(output).toHaveTextContent(expectedOutput);

            cleanup();
        }



    });

    it('should render proper info about conversion when USD -> PLN', () => {

        const testCases = [
            { amount: 100},
            { amount: 20},
            { amount: 200},
            { amount: 345,},
        ];

        for(const testObj of testCases) {

            render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

            const output = screen.getByTestId('output');

            const expectedOutput = `${formatAmountInCurrency(testObj.amount, 'USD')} = ${convertUSDToPLN(testObj.amount)}`;

            expect(output).toHaveTextContent(expectedOutput);

            cleanup();
        }



    });

    it('should render same amount when conversion options are the same', () => {

        const testCases = [
            { amount: 100, fromAndTo: 'PLN'},
            { amount: 20, fromAndTo: 'PLN'},
            { amount: 200, fromAndTo: 'USD'},
            { amount: 345, fromAndTo: 'USD'},
        ];

        for(const testObj of testCases) {

            render(<ResultBox from={testObj.fromAndTo} to={testObj.fromAndTo} amount={testObj.amount} />);

            const output = screen.getByTestId('output');

            const expectedOutput = `${formatAmountInCurrency(testObj.amount, testObj.fromAndTo)} = ${formatAmountInCurrency(testObj.amount, testObj.fromAndTo)}`;

            expect(output).toHaveTextContent(expectedOutput);

            cleanup();
        }
    });

    it('should render "Wrong value..." message when wrong value', () => {
        const testCases= [
            { amount: -100 },
            { amount: -61262 },
            { amount: -321 },
        ];

        for(const testObj of testCases) {

            render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

            const output = screen.getByTestId('output');

            expect(output).toHaveTextContent('Wrong value...');

            cleanup();
        }
    });

});