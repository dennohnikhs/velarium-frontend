export function processRefs<
  T extends object = object,
  F extends keyof T = keyof T
>(
  data: T[] | undefined | null,
  page_info: PageInfo,
  _refs: StateRefObject,
  field: F = "id" as F
): typeof _refs {
  const _defaults = { ...(_refs ?? {}) };
  if (!data) return _defaults;
  return data?.reduce(
    (prev, current) => ({
      ...prev,
      [current[field as any]]: { page: page_info.page },
    }),
    _defaults
  );
}
