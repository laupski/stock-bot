import PriceCommand from './price';

describe('Price Slash Command', () => {
  test('Name and description are set as expected', () => {
    expect(PriceCommand.data.name).toBe('price');
    expect(PriceCommand.data.description).toBe('Get price of a ticker');
  });
});
