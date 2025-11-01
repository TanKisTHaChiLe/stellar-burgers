describe('Конструктор бургеров', () => {
  describe('Тестирование добавления ингредиента из списка в конструктор', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients**', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('/');
    });

    describe('Тестирование добавления булочки', () => {
      it('При добавлении булочки, в конструктор добавляется две: вверх и вниз', () => {
        cy.wait('@getIngredients');
        cy.contains('[data-cy=ingredient]', 'Краторная булка N-200i')
          .find('button')
          .click();

        cy.get('[data-cy*="constructor-ingredient--bun"]').should(
          'have.length',
          2
        );
        cy.get('[data-cy*="bun_top"]');
        cy.get('[data-cy*="bun_bottom"]');
      });
      it('При добавлении другой булочки, старая заменяется на новую', () => {
        cy.wait('@getIngredients');
        cy.contains('[data-cy=ingredient]', 'Краторная булка N-200i')
          .find('button')
          .click();
        cy.get('[data-cy*="bun_top"]').should(
          'contain.text',
          'Краторная булка N-200i'
        );

        cy.contains('[data-cy=ingredient]', 'Флюоресцентная булка R2-D3')
          .find('button')
          .click();
        cy.get('[data-cy*="bun_top"]').should(
          'contain.text',
          'Флюоресцентная булка R2-D3'
        );
      });
    });
    describe('Тестирование добавления начинки', () => {
      it('При добавлении ингредиента, ингридиент отображается в списке', () => {
        cy.wait('@getIngredients');
        cy.contains(
          '[data-cy=ingredient]',
          'Биокотлета из марсианской Магнолии'
        )
          .find('button')
          .click();

        cy.get('[data-cy=constructor-ingredient]').should(
          'contain.text',
          'Биокотлета из марсианской Магнолии'
        );
      });

      it('При добавлении ингредиента количество начинок увеличивается на 1', () => {
        cy.wait('@getIngredients');
        cy.contains(
          '[data-cy=ingredient]',
          'Биокотлета из марсианской Магнолии'
        )
          .find('button')
          .click();
        cy.get('[data-cy=constructor-ingredient]').should('have.length', 1);

        cy.contains(
          '[data-cy=ingredient]',
          'Биокотлета из марсианской Магнолии'
        )
          .find('button')
          .click();
        cy.get('[data-cy=constructor-ingredient]').should('have.length', 2);
      });
    });
  });

  describe('Тестирование модального окна', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients**', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('/');
    });
    it('При нажатии на ингредиент открывается модальное окно с правильным url адресом', () => {
      cy.wait('@getIngredients');
      cy.contains(
        '[data-cy=ingredient]',
        'Биокотлета из марсианской Магнолии'
      ).click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0941');
    });
    it('При клике по крестику окно закрывается и происходит возврат на предыдущий url', () => {
      cy.wait('@getIngredients');
      cy.contains(
        '[data-cy=ingredient]',
        'Биокотлета из марсианской Магнолии'
      ).click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-close"]').click();

      cy.get('[data-cy="modal"]').should('not.exist');
      cy.url().should('not.include', '/ingredients/643d69a5c3f7b9001cfa0941');
    });
    it('При клике по оверлею окно закрывается и происходит возврат на предыдущий url', () => {
      cy.wait('@getIngredients');
      cy.contains(
        '[data-cy=ingredient]',
        'Биокотлета из марсианской Магнолии'
      ).click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      cy.get('[data-cy="modal"]').should('not.exist');
      cy.url().should('not.include', '/ingredients/643d69a5c3f7b9001cfa0941');
    });
  });
  describe('Тестирование создания заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients**', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.intercept('POST', '**/api/orders**', {
        fixture: 'createOrder.json'
      }).as('createOrder');

      cy.intercept('GET', '**/api/auth/user**', {
        fixture: 'getUser.json'
      }).as('getUser');

      cy.fixture('tokens.json').then((tokens) => {
        cy.setCookie('accessToken', tokens.accessToken);
        cy.setCookie('refreshToken', tokens.refreshToken);
      });

      cy.visit('/');
    });

    it('После нажатия на кнопку "Оформить", открывается модальное окно с правильным номером заказа', () => {
      cy.wait('@getIngredients');
      cy.contains('[data-cy=ingredient]', 'Флюоресцентная булка R2-D3')
        .find('button')
        .click();
      cy.contains(
        '[data-cy=ingredient]',
        'Филе Люминесцентного тетраодонтимформа'
      )
        .find('button')
        .click();

      cy.get('[data-cy=submit-order--button]').click();

      cy.wait('@getUser');
      cy.wait('@createOrder').then((interception) => {
        const orderNumber = interception.response?.body.order.number;
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="order-indetificator"]').should(
          'contain',
          orderNumber
        );
      });
    });

    it('Модальное окно закрывется по крестику и, после закрытия, в коснтрукторе не остается ингредиентов', () => {
      cy.wait('@getIngredients');
      cy.contains('[data-cy=ingredient]', 'Флюоресцентная булка R2-D3')
        .find('button')
        .click();
      cy.contains(
        '[data-cy=ingredient]',
        'Филе Люминесцентного тетраодонтимформа'
      )
        .find('button')
        .click();

      cy.get('[data-cy=submit-order--button]').click();

      cy.wait('@getUser');
      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy=modal-close]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy*="bun_top"]').should('not.exist');
      cy.get('[data-cy*="bun_bottom"]').should('not.exist');
      cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
    });

    it('Модальное окно закрывется по клику по оврелею и, после закрытия, в коснтрукторе не остается ингредиентов', () => {
      cy.wait('@getIngredients');
      cy.contains('[data-cy=ingredient]', 'Флюоресцентная булка R2-D3')
        .find('button')
        .click();
      cy.contains(
        '[data-cy=ingredient]',
        'Филе Люминесцентного тетраодонтимформа'
      )
        .find('button')
        .click();

      cy.get('[data-cy=submit-order--button]').click();

      cy.wait('@getUser');
      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy*="bun_top"]').should('not.exist');
      cy.get('[data-cy*="bun_bottom"]').should('not.exist');
      cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
    });
  });
});
