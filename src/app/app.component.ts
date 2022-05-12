import { Component } from '@angular/core';
import { CharExpression } from './classes/expressions/char-expression';
import { EmptyExpression } from './classes/expressions/empty-expression';
import { Expression } from './classes/expressions/expression';
import { NullExpression } from './classes/expressions/null-expression';
import { ProdExpression } from './classes/expressions/prod-expression';
import { StarExpression } from './classes/expressions/star-expression';
import { SumExpression } from './classes/expressions/sum-expression';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'regxd';

  expr: Expression;
  simple: Expression;

  public constructor() {
    this.expr = new ProdExpression(
      new SumExpression([
        NullExpression.get(),
        new CharExpression("a"),
        new CharExpression("b"),
        new CharExpression("a"),
        EmptyExpression.get()
      ]),
      new StarExpression(new CharExpression("a"))
    );
    this.simple = this.expr.simplify();
  }
}
