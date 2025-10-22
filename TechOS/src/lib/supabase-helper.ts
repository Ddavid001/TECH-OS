// Local stub for DB client in local mode (no Supabase)
type QueryResult<T = any> = { data: T | null; error: null };

function createStub() {
  return {
    from() {
      const chain = {
        select: () => chain,
        insert: () => ({ data: null, error: null } as QueryResult),
        update: () => ({ data: null, error: null } as QueryResult),
        delete: () => ({ data: null, error: null } as QueryResult),
        eq: () => chain,
        order: () => chain,
        single: () => ({ data: null, error: null } as QueryResult),
        not: () => chain,
        // for head count queries
        // @ts-ignore
        selectHead: () => ({ count: 0, error: null }),
      };
      return chain;
    },
  } as any;
}

export const db = createStub();
