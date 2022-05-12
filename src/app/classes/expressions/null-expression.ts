import { Expression } from "./expression";


export class NullExpression extends Expression {

	public static readonly INSTANCE = new NullExpression();

	private constructor() {
		super();
	}

	public static get(): NullExpression {
		return NullExpression.INSTANCE;
	}

	public toString(): string {
		return "0";
	}

	protected sortFactor(): number {
		return 0;
	}

	public partialDerivate(c: string): Expression {
		return this;
	}

}
