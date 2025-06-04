import { MutationConfig } from '@/lib/react-query';
export declare const deleteDiscussion: ({ discussionId, }: {
    discussionId: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
type UseDeleteDiscussionOptions = {
    mutationConfig?: MutationConfig<typeof deleteDiscussion>;
};
export declare const useDeleteDiscussion: ({ mutationConfig, }?: UseDeleteDiscussionOptions) => import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    discussionId: string;
}, unknown>;
export {};
//# sourceMappingURL=delete-discussion.d.ts.map