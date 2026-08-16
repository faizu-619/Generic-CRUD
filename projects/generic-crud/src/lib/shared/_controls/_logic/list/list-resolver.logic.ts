import { GenericModel } from '../../_models/generic.model';

export function extractResolvedModel(data: any): GenericModel | null {
  if (!data) {
    return null;
  }

  const candidates = [
    data?.[0],
    data?.GenericResolver,
    ...Object.values(data)
  ];

  for (const candidate of candidates) {
    if (
      candidate
      && typeof candidate === 'object'
      && (candidate.tableName || candidate.listColumns || candidate.controls)
    ) {
      return candidate as GenericModel;
    }
  }

  return null;
}
