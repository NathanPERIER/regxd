export abstract class Expression {

	public abstract toString(): string;

	public simplify(): Expression {
		return this;
	}

	protected abstract sortFactor(): number;

	public compareTo(e: Expression): number {
		return this.sortFactor() - e.sortFactor();
	}

	public normalise(): Expression {
		return this;
	}

}
