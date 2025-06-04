import { MutationConfig } from '@/lib/react-query';
export type DeleteUserDTO = {
    userId: string;
};
export declare const deleteUser: ({ userId }: DeleteUserDTO) => Promise<import("axios").AxiosResponse<any, any>>;
type UseDeleteUserOptions = {
    mutationConfig?: MutationConfig<typeof deleteUser>;
};
export declare const useDeleteUser: ({ mutationConfig, }?: UseDeleteUserOptions) => import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, DeleteUserDTO, unknown>;
export {};
//# sourceMappingURL=delete-user.d.ts.map