describe('Конструктор бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients**', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
  });

  it('Загрузка ингредиентов', () => {
    cy.wait('@getIngredients');
    cy.get('[data-testid=ingredient]').should('have.length', 5);
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Филе Люминесцентного тетраодонтимформа').should('exist');
    cy.contains('Соус традиционный галактический').should('exist');
  });

  describe('Тестирование добавления ингредиента из списка в конструктор', () => {
    describe('Тестирование добавления булочки', () => {
      it('При добавлении булочки, в конструктор добавляется две: вверх и вниз', () => {
        cy.wait('@getIngredients');
        cy.contains('[data-testid=ingredient]', 'Краторная булка N-200i')
          .find('button')
          .click();

        cy.get('[data-testid*="constructor-ingredient--bun"]').should(
          'have.length',
          2
        );
        cy.get('[data-testid*="bun_top"]');
        cy.get('[data-testid*="bun_bottom"]');
      });
      it('При добавлении другой булочки, старая заменяется на новую', () => {
        cy.wait('@getIngredients');
        cy.contains('[data-testid=ingredient]', 'Краторная булка N-200i')
          .find('button')
          .click();
        cy.get('[data-testid*="bun_top"]').should(
          'contain.text',
          'Краторная булка N-200i'
        );

        cy.contains('[data-testid=ingredient]', 'Флюоресцентная булка R2-D3')
          .find('button')
          .click();
        cy.get('[data-testid*="bun_top"]').should(
          'contain.text',
          'Флюоресцентная булка R2-D3'
        );
      });
    });
    describe('Тестирование добавления начинки', () => {
      it('При добавлении ингредиента, ингридиент отображается в списке', () => {
        cy.wait('@getIngredients');
        cy.contains(
          '[data-testid=ingredient]',
          'Биокотлета из марсианской Магнолии'
        )
          .find('button')
          .click();

        cy.get('[data-testid=constructor-ingredient]').should(
          'contain.text',
          'Биокотлета из марсианской Магнолии'
        );
      });

      it('При добавлении ингредиента количество начинок увеличивается на 1', () => {
        cy.wait('@getIngredients');
        cy.contains(
          '[data-testid=ingredient]',
          'Биокотлета из марсианской Магнолии'
        )
          .find('button')
          .click();
        cy.get('[data-testid=constructor-ingredient]').should('have.length', 1);

        cy.contains(
          '[data-testid=ingredient]',
          'Биокотлета из марсианской Магнолии'
        )
          .find('button')
          .click();
        cy.get('[data-testid=constructor-ingredient]').should('have.length', 2);
      });
    });
  });

  describe('Тестирование модального окна', () => {
    it('При нажатии на ингредиент открывается модальное окно с правильным url адресом', () => {
      cy.wait('@getIngredients');
      cy.contains(
        '[data-testid=ingredient]',
        'Биокотлета из марсианской Магнолии'
      ).click();

      cy.get('[data-testid="ingredient_modal"]').should('be.visible');
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0941');
    });
    it('При клике по крестику окно закрывается и происходит возврат на предыдущий url', () => {
      cy.wait('@getIngredients');
      cy.contains(
        '[data-testid=ingredient]',
        'Биокотлета из марсианской Магнолии'
      ).click();
      cy.get('[data-testid="ingredient_modal"]').should('be.visible');
      cy.get('[data-testid="ingredient_modal-close"]').click();

      cy.get('[data-testid="ingredient_modal"]').should('not.exist');
      cy.url().should('not.include', '/ingredients/643d69a5c3f7b9001cfa0941');
    });
    it('При клике по оверлею окно закрывается и происходит возврат на предыдущий url', () => {
      cy.wait('@getIngredients');
      cy.contains(
        '[data-testid=ingredient]',
        'Биокотлета из марсианской Магнолии'
      ).click();
      cy.get('[data-testid="ingredient_modal"]').should('be.visible');
      cy.get('[data-testid="ingredient_modal-overlay"]').click({ force: true });

      cy.get('[data-testid="ingredient_modal"]').should('not.exist');
      cy.url().should('not.include', '/ingredients/643d69a5c3f7b9001cfa0941');
    });
  });

  it('Тестирование оформления заказа', () => {
    
  })
});
