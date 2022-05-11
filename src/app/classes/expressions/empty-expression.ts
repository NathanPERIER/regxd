import { Expression } from "./expression";

export class EmptyExpression extends Expression {

	public static readonly INSTANCE = new EmptyExpression();

	public constructor() {
		super();
	}

	public static get(): EmptyExpression {
		return EmptyExpression.INSTANCE;
	}

	public toString(): string {
		return "1";
	}

}
