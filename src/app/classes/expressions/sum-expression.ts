import { Expression } from "./expression";
import { NullExpression } from "./null-expression";

export class SumExpression extends Expression {

	protected readonly terms: Expression[];

	public constructor(exprs: Expression[]) {
		super();
		this.terms = exprs;
	}

	public toString(): string {
		let res = this.terms[0].toString();
		for(let i = 1; i < this.terms.length; i++) {
			res += " + " + this.terms[i].toString();
		}
		return res;
	}

	public static uniqueTerms(tab: Expression[]): Expression[] {
		let uids = [tab[0].toString()];
		let res = [tab[0]]
		for(let i = 1; i < tab.length; i++) {
			let s = tab[i].toString();
			if(!uids.includes(s)) {
				uids.push(s);
				res.push(tab[i]);
			}
		}
		return res;
	}

	public simplify(): Expression {
		let tab: Expression[] = [];
		for(let e in this.terms) {
			let es = this.terms[e].simplify();
			if(!(es instanceof NullExpression)) {
				tab.push(es);
			}
		}
		if(tab.length == 0) {
			return NullExpression.get();
		}
		let unique = SumExpression.uniqueTerms(tab);
		if(unique.length == 1) {
			return unique[0];
		}
		return new SumExpression(unique);
	}

	protected sortFactor(): number {
		return 4;
	}

	public compareTo(e: Expression): number {
		let diff = super.compareTo(e);
		if(diff != 0) {
			return diff;
		}
		let se = e as SumExpression;
		const size = Math.min(this.terms.length, se.terms.length);
		for(let i = 0; i < size; i++) {
			diff = this.terms[i].compareTo(se.terms[i]);
			if(diff != 0) {
				return diff;
			}
		}
		return this.terms.length - se.terms.length;
	}

}
