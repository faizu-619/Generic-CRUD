export type ListRouteAction = 'add' | 'edit';

export function buildListRouteCommands(
  routePath: string | undefined,
  action: ListRouteAction,
  tableName: string,
  id?: string | number
): Array<string | number> {
  const prefix = (routePath || '')
    .split('/')
    .filter(segment => segment && segment !== 'list' && segment !== ':modelName');

  const commands: Array<string | number> = ['/', ...prefix, action, tableName];

  if (action === 'edit' && id !== undefined && id !== null) {
    commands.push(id);
  }

  return commands;
}