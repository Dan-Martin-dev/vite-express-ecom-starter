import { MutationConfig } from '@/lib/react-query';
export declare const deleteComment: ({ commentId }: {
    commentId: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
type UseDeleteCommentOptions = {
    discussionId: string;
    mutationConfig?: MutationConfig<typeof deleteComment>;
};
export declare const useDeleteComment: ({ mutationConfig, discussionId, }: UseDeleteCommentOptions) => import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    commentId: string;
}, unknown>;
export {};
//# sourceMappingURL=delete-comment.d.ts.map