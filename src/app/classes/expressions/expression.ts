export abstract class Expression {

	public static readonly COMPARE = (e1: Expression, e2: Expression) => e1.compareTo(e2);

	public abstract toString(): string;

	public simplify(): Expression {
		return this;
	}

	protected abstract sortFactor(): number;

	public compareTo(e: Expression): number {
		return this.sortFactor() - e.sortFactor();
	}

	public equals(e: Expression): boolean {
		return this.compareTo(e) === 0;
	}

	public normalise(): Expression {
		return this;
	}

	// Indicates wether an expression can accept the empty string or not;
	public nullable(): boolean {
		return false;
	}

	public abstract partialDerivate(c: string): Expression;

}
