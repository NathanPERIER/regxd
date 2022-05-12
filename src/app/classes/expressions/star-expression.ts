import { EmptyExpression } from "./empty-expression";
import { Expression } from "./expression";
import { NullExpression } from "./null-expression";

export class StarExpression extends Expression {

	protected readonly expr: Expression;

	public constructor(e: Expression) {
		super();
		this.expr = e;
	}

	public toString(): string {
		let s = this.expr.toString();
		if(s.length == 1) {
			return s + "*";
		}
		return "(" + s + ")*";
	}

	public simplify(): Expression {
		let e = this.expr.simplify();
		if(e instanceof NullExpression) {
			return NullExpression.get();
		}
		if(e instanceof EmptyExpression) {
			return EmptyExpression.get();
		}
		if(e instanceof StarExpression) {
			return e;
		}
		return new StarExpression(e);
	}

	protected sortFactor(): number {
		return 5;
	}

	public compareTo(e: Expression): number {
		const diff = super.compareTo(e);
		if(diff != 0) {
			return diff;
		}
		let se = e as StarExpression;
		return this.expr.compareTo(se.expr);
	}

}
