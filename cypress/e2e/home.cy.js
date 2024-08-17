/// <reference types="cypress" />

describe('home', () => {
  it('web-app dev esta online', () => {
    cy.visit('/')

    cy.title().should('eq','Gerencie suas tarefas com Mark L')
  })
})