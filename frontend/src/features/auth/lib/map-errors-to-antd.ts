import type { FormInstance } from "antd";
import type { FieldError } from "@/shared/api/handleApiError";

export function mapErrorsToAntd<T extends object>(errors: FieldError[]): Parameters<FormInstance<T>['setFields']>[0] {
	return errors.map(({ name, errors }) => ({
		name: [name as keyof T],
		errors,
	})) as Parameters<FormInstance<T>['setFields']>[0];
}
