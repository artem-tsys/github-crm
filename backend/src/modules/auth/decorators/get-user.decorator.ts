import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../../user/entities/user.entity";

/**
 * Custom decorator to extract user or user property from request.
 * @param data Optional property name of User
 * @param ctx Execution context
 * @returns User or user property value
 */
export const GetUser = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext) => {
		const user = ctx.switchToHttp().getRequest().user;
		return data ? user?.[data] : user;
	},
);
