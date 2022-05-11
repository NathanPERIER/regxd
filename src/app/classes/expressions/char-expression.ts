import { Expression } from "./expression";

export class CharExpression extends Expression {

	private readonly name: string;

	public constructor(n: string) {
		super();
		this.name = n;
	}

	public toString(): string {
		return this.name;
	}

}
