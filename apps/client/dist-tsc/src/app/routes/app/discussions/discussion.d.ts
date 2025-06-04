import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';
export declare const clientLoader: (queryClient: QueryClient) => ({ params }: LoaderFunctionArgs) => Promise<{
    discussion: {
        data: import("../../../../types/api").Discussion;
    };
    comments: import("@tanstack/react-query").InfiniteData<{
        data: import("../../../../types/api").Comment[];
        meta: import("../../../../types/api").Meta;
    }, unknown>;
}>;
declare const DiscussionRoute: () => import("react/jsx-runtime").JSX.Element | null;
export default DiscussionRoute;
//# sourceMappingURL=discussion.d.ts.map