import { QueryConfig } from '@/lib/react-query';
import { Discussion } from '@/types/api';
export declare const getDiscussion: ({ discussionId, }: {
    discussionId: string;
}) => Promise<{
    data: Discussion;
}>;
export declare const getDiscussionQueryOptions: (discussionId: string) => import("@tanstack/react-query").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    data: Discussion;
}, Error, {
    data: Discussion;
}, string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/react-query").QueryFunction<{
        data: Discussion;
    }, string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            data: Discussion;
        };
        [dataTagErrorSymbol]: Error;
    };
};
type UseDiscussionOptions = {
    discussionId: string;
    queryConfig?: QueryConfig<typeof getDiscussionQueryOptions>;
};
export declare const useDiscussion: ({ discussionId, queryConfig, }: UseDiscussionOptions) => import("@tanstack/react-query").UseQueryResult<{
    data: Discussion;
}, Error>;
export {};
//# sourceMappingURL=get-discussion.d.ts.map