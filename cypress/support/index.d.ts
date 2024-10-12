declare namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>,
      loginDefault(): Chainable<void>,
      validateToast(text: string): Chainable<void>
    }
}