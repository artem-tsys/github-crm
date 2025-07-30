import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../../user/entities/user.entity";

export const GetUser = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext) => {
		const user = ctx.switchToHttp().getRequest().user;
		return data ? user?.[data] : user;
	},
);
