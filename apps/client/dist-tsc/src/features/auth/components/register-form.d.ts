import { Team } from '@/types/api';
type RegisterFormProps = {
    onSuccess: () => void;
    chooseTeam: boolean;
    setChooseTeam: () => void;
    teams?: Team[];
};
export declare const RegisterForm: ({ onSuccess, chooseTeam, setChooseTeam, teams, }: RegisterFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=register-form.d.ts.map