import { QueryConfig } from '@/lib/react-query';
import { Team } from '@/types/api';
export declare const getTeams: () => Promise<{
    data: Team[];
}>;
export declare const getTeamsQueryOptions: () => import("@tanstack/react-query").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    data: Team[];
}, Error, {
    data: Team[];
}, string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/react-query").QueryFunction<{
        data: Team[];
    }, string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            data: Team[];
        };
        [dataTagErrorSymbol]: Error;
    };
};
type UseTeamsOptions = {
    queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};
export declare const useTeams: ({ queryConfig }?: UseTeamsOptions) => import("@tanstack/react-query").UseQueryResult<{
    data: Team[];
}, Error>;
export {};
//# sourceMappingURL=get-teams.d.ts.map