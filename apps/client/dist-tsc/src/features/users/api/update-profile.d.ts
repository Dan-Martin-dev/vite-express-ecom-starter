import { z } from 'zod';
import { MutationConfig } from '@/lib/react-query';
export declare const updateProfileInputSchema: z.ZodObject<{
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    bio: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
}, {
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
}>;
export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
export declare const updateProfile: ({ data }: {
    data: UpdateProfileInput;
}) => Promise<import("axios").AxiosResponse<any, any>>;
type UseUpdateProfileOptions = {
    mutationConfig?: MutationConfig<typeof updateProfile>;
};
export declare const useUpdateProfile: ({ mutationConfig, }?: UseUpdateProfileOptions) => import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, {
    data: UpdateProfileInput;
}, unknown>;
export {};
//# sourceMappingURL=update-profile.d.ts.map