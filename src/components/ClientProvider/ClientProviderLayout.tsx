import { QueryClient, QueryClientProvider } from 'react-query';
import './ClientProviderLayout.less';

const queryClient = new QueryClient();

interface IClientProviderLayoutProps {
    children: React.ReactNode;
}

function ClientProviderLayout({ children }: IClientProviderLayoutProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ClientProviderLayout;