import { QueryConfig } from '@/lib/react-query';
import { Comment, Meta } from '@/types/api';
export declare const getComments: ({ discussionId, page, }: {
    discussionId: string;
    page?: number;
}) => Promise<{
    data: Comment[];
    meta: Meta;
}>;
export declare const getInfiniteCommentsQueryOptions: (discussionId: string) => import("@tanstack/react-query").OmitKeyof<import("@tanstack/react-query").UseInfiniteQueryOptions<{
    data: Comment[];
    meta: Meta;
}, Error, import("@tanstack/react-query").InfiniteData<{
    data: Comment[];
    meta: Meta;
}, unknown>, {
    data: Comment[];
    meta: Meta;
}, string[], number>, "queryFn"> & {
    queryFn?: import("@tanstack/react-query").QueryFunction<{
        data: Comment[];
        meta: Meta;
    }, string[], number> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: import("@tanstack/react-query").InfiniteData<{
            data: Comment[];
            meta: Meta;
        }, unknown>;
        [dataTagErrorSymbol]: Error;
    };
};
type UseCommentsOptions = {
    discussionId: string;
    page?: number;
    queryConfig?: QueryConfig<typeof getComments>;
};
export declare const useInfiniteComments: ({ discussionId }: UseCommentsOptions) => import("@tanstack/react-query").UseInfiniteQueryResult<import("@tanstack/react-query").InfiniteData<{
    data: Comment[];
    meta: Meta;
}, unknown>, Error>;
export {};
//# sourceMappingURL=get-comments.d.ts.map