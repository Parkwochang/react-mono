// ! object type

export type Obj = Record<string, unknown>;

export type NullRecord<K extends Obj> = Record<
  keyof K,
  K[keyof K] extends Obj ? NullRecord<K[keyof K]> : K[keyof K] | null
>;

export type ValueOf<T> = T extends Obj ? T[keyof T] : unknown;

export type KeyOf<T> = T extends Obj ? keyof T : unknown;

export type ValueOfKey<T, K extends keyof T> = T[K];

export type ObjKeyToArr<T extends Obj> = { [K in number]: keyof T };

// ----------------------------------------------------------------------
// ! array type

export type ArrayToUnion<A extends any[]> = A[number];
// ArrayObjToUnion<A, 'accessorKey'> = 'A' | 'B' | 'C' | 'D'
export type ArrayObjToUnion<A extends Record<string, any>[], K extends string> = A[number][K];
// ArrayToObject<B> = { a: 'a', b: 'b', c: 'c', d: 'd' }
export type ArrayToObject<V extends Array<string | number>> = {
  [K in V[number]]: string;
};

// ----------------------------------------------------------------------
// ! union type

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;

export type Push<T extends any[], V> = [...T, V];

export type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<UnionToTuple<Exclude<T, L>>, L>;

// type UnionToTuple<U> = U extends any ? (U extends infer I ? I[] : never) : never;

export type UnionToObj<U extends string> = { [K in U]: K };

// ----------------------------------------------------------------------
// ! react type

// type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

// type GetComponentProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never;

// ----------------------------------------------------------------------
// ! function type

// type Parameter<T> = T extends Function ? Parameters<T> : never;

// type Return<T> = T extends Function ? ReturnType<T> : never;

// type Parameter<T> = T extends (param: infer U) => any ? U : never;
