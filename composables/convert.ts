const list = ["binary", "decimal", "hexa-decimal", "octal-decimal"];

export interface ValidType {
    isSupported: boolean;
    type: string | null;
}
export function isValidType(from: string, to: string): ValidType {
    if (!list.includes(from as string)) {
        return {
            isSupported: false,
            type: from,
        };
    }
    if (!list.includes(to as string)) {
        return {
            isSupported: false,
            type: to,
        };
	}
    return {
        isSupported: true,
        type: null,
    };
};
