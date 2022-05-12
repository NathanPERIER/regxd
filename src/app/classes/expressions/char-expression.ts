import { EmptyExpression } from "./empty-expression";
import { Expression } from "./expression";
import { NullExpression } from "./null-expression";

export class CharExpression extends Expression {

	private readonly name: string;

	public constructor(n: string) {
		super();
		this.name = n;
	}

	public toString(): string {
		return this.name;
	}

	protected sortFactor(): number {
		return 2;
	}

	public compareTo(e: Expression): number {
		const diff = super.compareTo(e);
		if(diff != 0) {
			return diff;
		}
		const ce = e as CharExpression;
		return this.name.localeCompare(ce.name);
	}

	public partialDerivate(c: string): Expression {
		if(this.name === c) {
			return EmptyExpression.get();
		}
		return NullExpression.get();
	}

}
