import { EmptyExpression } from "./empty-expression";
import { Expression } from "./expression";
import { NullExpression } from "./null-expression";
import { SumExpression } from "./sum-expression";

export class ProdExpression extends Expression {

	protected readonly left: Expression;
	protected readonly right: Expression;

	public constructor(l: Expression, r: Expression) {
		super();
		this.left = l;
		this.right = r
	}

	public getLeft(): Expression {
		return this.left;
	}

	public getRight(): Expression {
		return this.right;
	}

	public toString(): string {
		let res = this.right.toString()
		if(this.right instanceof SumExpression || this.right instanceof ProdExpression) {
			res = "(" + res + ")";
		}
		if(this.left instanceof SumExpression) {
			res += "(" + this.left.toString() + ")";
		} else {
			res += this.left.toString();
		}
		return res;
	}

	public simplify(): Expression {
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof NullExpression || r instanceof NullExpression) {
			return NullExpression.get();
		}
		if(r instanceof EmptyExpression) {
			return l;
		}
		if(l instanceof EmptyExpression) {
			return r;
		}
		return new ProdExpression(l, r);
	}

	protected sortFactor(): number {
		return 3;
	}

	public compareTo(e: Expression): number {
		let diff = super.compareTo(e);
		if(diff != 0) {
			return diff;
		}
		let pe = e as ProdExpression;
		diff = this.left.compareTo(pe.left);
		if(diff != 0) {
			return diff;
		}
		return this.right.compareTo(pe.right);
	}

}
