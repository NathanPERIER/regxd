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
		let res = this.left.toString()
		if(this.left instanceof SumExpression || this.left instanceof ProdExpression) {
			res = "(" + res + ")";
		}
		if(this.right instanceof SumExpression) {
			res += "(" + this.right.toString() + ")";
		} else {
			res += this.right.toString();
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

	public normalise(): Expression {
		const l = this.left.normalise();
		const r = this.right.normalise();
		let res: Expression;
		if(l instanceof SumExpression) {
			if(l instanceof SumExpression) {
				// (a + b)(c + d) <=> ac + ad + bc + bd
				let se = r as SumExpression;
				let tab = l.getTerms().map(e => se.lconcat(e));
				res = new SumExpression(tab);
			} else {
				// a(b + c) <=> ab + ac
				res = (l as SumExpression).rconcat(r)
			}
		} else if (r instanceof SumExpression) {
			// (a + b)c <=> ac + bc
			res = (r as SumExpression).lconcat(l);
		} else {
			return new ProdExpression(l, r);
		}
		return res.simplify();
	}

	public nullable(): boolean {
		return this.left.nullable() && this.right.nullable();
	}

	public partialDerivate(c: string): Expression {
		let prod = new ProdExpression(this.left.partialDerivate(c), this.right);
		if(this.left.nullable()) {
			return new SumExpression([prod, this.right.partialDerivate(c)])
		}
		return prod;
	}

}
