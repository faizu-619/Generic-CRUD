import { ListActionLogic, ListActionType } from './list-action.logic';

describe('ListActionLogic', () => {
  let logic: ListActionLogic;

  beforeEach(() => {
    logic = new ListActionLogic();
  });

  it('should resolve remove action and parse numeric id', () => {
    const result = logic.resolveAction('Remove', '12');

    expect(result.type).toBe(ListActionType.Remove);
    expect(result.id).toBe(12);
  });

  it('should resolve edit action with raw value preserved', () => {
    const result = logic.resolveAction('Edit', 'abc');

    expect(result.type).toBe(ListActionType.Edit);
    expect(result.rawValue).toBe('abc');
    expect(result.id).toBeNull();
  });

  it('should return none for unsupported action', () => {
    const result = logic.resolveAction('Unknown', 1);

    expect(result.type).toBe(ListActionType.None);
  });
});