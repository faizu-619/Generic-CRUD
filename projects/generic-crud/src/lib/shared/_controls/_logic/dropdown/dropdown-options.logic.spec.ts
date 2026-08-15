import { DropdownOptionsLogic } from './dropdown-options.logic';

describe('DropdownOptionsLogic', () => {
  let logic: DropdownOptionsLogic;

  beforeEach(() => {
    logic = new DropdownOptionsLogic();
  });

  it('should map source records into key-value options', () => {
    const options = logic.mapOptions(
      [
        { id: '1', title: 'One' },
        { id: '2', title: 'Two' }
      ],
      'id',
      'title'
    );

    expect(options).toEqual([
      { key: '1', value: 'One' },
      { key: '2', value: 'Two' }
    ]);
  });

  it('should return empty array for non-array input', () => {
    expect(logic.mapOptions(undefined as any, 'id', 'title')).toEqual([]);
  });
});