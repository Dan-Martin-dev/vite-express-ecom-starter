import { UseMutationOptions } from '@tanstack/react-query';
export declare const queryConfig: {
    queries: {
        refetchOnWindowFocus: false;
        retry: false;
        staleTime: number;
    };
};
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<ReturnType<FnType>>;
export type QueryConfig<T extends (...args: any[]) => any> = Omit<ReturnType<T>, 'queryKey' | 'queryFn'>;
export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> = UseMutationOptions<ApiFnReturnType<MutationFnType>, Error, Parameters<MutationFnType>[0]>;
//# sourceMappingURL=react-query.d.ts.map