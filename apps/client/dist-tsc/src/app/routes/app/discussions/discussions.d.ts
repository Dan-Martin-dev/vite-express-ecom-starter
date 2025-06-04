import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';
export declare const clientLoader: (queryClient: QueryClient) => ({ request }: LoaderFunctionArgs) => Promise<{
    data: import("../../../../types/api").Discussion[];
    meta: import("../../../../types/api").Meta;
}>;
declare const DiscussionsRoute: () => import("react/jsx-runtime").JSX.Element;
export default DiscussionsRoute;
//# sourceMappingURL=discussions.d.ts.map