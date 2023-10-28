import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function updateQuery<Result, Query>(
  cache: Cache,
  input: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(input, (data) => fn(result, data as any) as any);
}
