import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryProviderProps = {
	children: React.ReactNode;
	client: QueryClient;
};

export function QueryProvider({ children, client }: QueryProviderProps) {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
