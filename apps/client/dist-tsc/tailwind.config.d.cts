export let content: string[];
export namespace theme {
    namespace container {
        let center: boolean;
        let padding: string;
        let screens: {
            '2xl': string;
        };
    }
    namespace extend {
        namespace fontFamily {
            let sans: any[];
        }
        namespace colors {
            let border: string;
            let input: string;
            let ring: string;
            let background: string;
            let foreground: string;
            namespace primary {
                export let DEFAULT: string;
                let foreground_1: string;
                export { foreground_1 as foreground };
            }
            namespace secondary {
                let DEFAULT_1: string;
                export { DEFAULT_1 as DEFAULT };
                let foreground_2: string;
                export { foreground_2 as foreground };
            }
            namespace destructive {
                let DEFAULT_2: string;
                export { DEFAULT_2 as DEFAULT };
                let foreground_3: string;
                export { foreground_3 as foreground };
            }
            namespace muted {
                let DEFAULT_3: string;
                export { DEFAULT_3 as DEFAULT };
                let foreground_4: string;
                export { foreground_4 as foreground };
            }
            namespace accent {
                let DEFAULT_4: string;
                export { DEFAULT_4 as DEFAULT };
                let foreground_5: string;
                export { foreground_5 as foreground };
            }
            namespace popover {
                let DEFAULT_5: string;
                export { DEFAULT_5 as DEFAULT };
                let foreground_6: string;
                export { foreground_6 as foreground };
            }
            namespace card {
                let DEFAULT_6: string;
                export { DEFAULT_6 as DEFAULT };
                let foreground_7: string;
                export { foreground_7 as foreground };
            }
        }
        namespace borderRadius {
            let lg: string;
            let md: string;
            let sm: string;
        }
        let keyframes: {
            'accordion-down': {
                from: {
                    height: string;
                };
                to: {
                    height: string;
                };
            };
            'accordion-up': {
                from: {
                    height: string;
                };
                to: {
                    height: string;
                };
            };
        };
        let animation: {
            'accordion-down': string;
            'accordion-up': string;
        };
    }
}
export let plugins: ({
    handler: () => void;
} | typeof import("@tailwindcss/typography"))[];
//# sourceMappingURL=tailwind.config.d.cts.map