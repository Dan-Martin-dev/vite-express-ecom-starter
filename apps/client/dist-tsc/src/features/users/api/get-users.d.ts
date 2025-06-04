import { QueryConfig } from '@/lib/react-query';
import { User } from '@/types/api';
export declare const getUsers: () => Promise<{
    data: User[];
}>;
export declare const getUsersQueryOptions: () => import("@tanstack/react-query").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    data: User[];
}, Error, {
    data: User[];
}, string[]>, "queryFn"> & {
    queryFn?: import("@tanstack/react-query").QueryFunction<{
        data: User[];
    }, string[], never> | undefined;
} & {
    queryKey: string[] & {
        [dataTagSymbol]: {
            data: User[];
        };
        [dataTagErrorSymbol]: Error;
    };
};
type UseUsersOptions = {
    queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};
export declare const useUsers: ({ queryConfig }?: UseUsersOptions) => import("@tanstack/react-query").UseQueryResult<{
    data: User[];
}, Error>;
export {};
//# sourceMappingURL=get-users.d.ts.map