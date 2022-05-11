export abstract class Expression {

	public abstract toString(): string;

	public simplify(): Expression {
		return this;
	}

}
