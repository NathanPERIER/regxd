import { Expression } from "./expression";
import { NullExpression } from "./null-expression";

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

	protected sortFactor(): number {
		return 1;
	}

	public nullable(): boolean {
		return true;
	}

	public partialDerivate(c: string): Expression {
		return NullExpression.get();
	}

}
