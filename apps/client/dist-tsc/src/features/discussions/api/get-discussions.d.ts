import { QueryConfig } from '@/lib/react-query';
import { Discussion, Meta } from '@/types/api';
export declare const getDiscussions: (page?: number) => Promise<{
    data: Discussion[];
    meta: Meta;
}>;
export declare const getDiscussionsQueryOptions: ({ page, }?: {
    page?: number;
}) => import("@tanstack/react-query").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    data: Discussion[];
    meta: Meta;
}, Error, {
    data: Discussion[];
    meta: Meta;
}, (string | {
    page: number;
})[]>, "queryFn"> & {
    queryFn?: import("@tanstack/react-query").QueryFunction<{
        data: Discussion[];
        meta: Meta;
    }, (string | {
        page: number;
    })[], never> | undefined;
} & {
    queryKey: (string | {
        page: number;
    })[] & {
        [dataTagSymbol]: {
            data: Discussion[];
            meta: Meta;
        };
        [dataTagErrorSymbol]: Error;
    };
};
type UseDiscussionsOptions = {
    page?: number;
    queryConfig?: QueryConfig<typeof getDiscussionsQueryOptions>;
};
export declare const useDiscussions: ({ queryConfig, page, }: UseDiscussionsOptions) => import("@tanstack/react-query").UseQueryResult<{
    data: Discussion[];
    meta: Meta;
}, Error>;
export {};
//# sourceMappingURL=get-discussions.d.ts.map