import { AddEditLogic } from './add-edit.logic';

describe('AddEditLogic', () => {
  let logic: AddEditLogic;

  beforeEach(() => {
    logic = new AddEditLogic();
  });

  it('should create default form actions', () => {
    const actions = logic.createDefaultActions();

    expect(actions.length).toBe(2);
    expect(actions[0].label).toBe('Save');
    expect(actions[1].label).toBe('Reset');
  });

  it('should resolve edit mode and title', () => {
    const mode = logic.resolveModeState('11', 'User');

    expect(mode.id).toBe(11);
    expect(mode.isEditMode).toBeTrue();
    expect(mode.title).toBe('Edit User');
  });

  it('should resolve create mode and title', () => {
    const mode = logic.resolveModeState('0', 'User');

    expect(mode.isEditMode).toBeFalse();
    expect(mode.title).toBe('New User');
  });

  it('should map route data and patch decision correctly', () => {
    const mapped = logic.mapModelFromRouteData([{ title: 'Title' }]);

    expect(mapped.title).toBe('Title');
    expect(logic.shouldPatchForm({}, true)).toBeTrue();
    expect(logic.shouldPatchForm(null, true)).toBeFalse();
  });

  it('should build list back route with prefix when present', () => {
    expect(logic.getBackRoute('Posts', 'bootstrap/add/:modelName')).toEqual(['/', 'bootstrap', 'list', 'Posts']);
    expect(logic.getBackRoute('Posts', 'ionic/edit/:modelName/:id')).toEqual(['/', 'ionic', 'list', 'Posts']);
  });

  it('should build list back route without prefix', () => {
    expect(logic.getBackRoute('Posts', 'add/:modelName')).toEqual(['/', 'list', 'Posts']);
    expect(logic.getBackRoute('Posts')).toEqual(['/', 'list', 'Posts']);
  });
});