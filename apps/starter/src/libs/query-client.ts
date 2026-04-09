import {
	MutationCache,
	matchQuery,
	QueryClient,
	type QueryKey,
} from "@tanstack/react-query";

export type AppRouterContext = {
	queryClient: QueryClient;
};

type MutationMeta = {
	invalidateQueries?:
		| QueryKey
		| QueryKey[]
		| ((variables: unknown) => QueryKey | QueryKey[]);
	successMessage?: string;
	errorMessage?: string;
};

export function createQueryClient() {
	const queryClient = new QueryClient({
		mutationCache: new MutationCache({
			onSuccess: (_data, variables, _context, mutation) => {
				if (mutation.options?.meta?.invalidateQueries) {
					const invalidateQueries = mutation.options.meta.invalidateQueries;

					const queryKeys =
						typeof invalidateQueries === "function"
							? invalidateQueries(variables)
							: invalidateQueries;

					queryClient.invalidateQueries({
						...(Array.isArray(queryKeys[0])
							? {
									predicate: (key) =>
										queryKeys.some((queryKey: QueryKey) =>
											matchQuery({ queryKey }, key),
										),
								}
							: { queryKey: queryKeys }),
						refetchType: "active",
					});
				}

				if (mutation.options?.meta?.successMessage) {
					// return toast.success(mutation.options.meta.successMessage as string);
				}
			},
			onError: (_error, _variables, _context, mutation) => {
				const meta = mutation.options.meta as MutationMeta | undefined;
				const errorMessage = meta?.errorMessage;

				if (errorMessage) {
					// toast.error(errorMessage);
				}
			},
		}),
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60,
				networkMode: "offlineFirst",
				retry: false,
				retryOnMount: true,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
				throwOnError: (error) => {
					const status = (error as { response?: { status?: number } }).response
						?.status;

					return typeof status === "number" ? status >= 400 : false;
				},
			},
			mutations: {
				networkMode: "offlineFirst",
				retry: false,
			},
		},
	});

	return queryClient;
}
