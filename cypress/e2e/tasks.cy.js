/// <reference types="cypress" />

describe ('tasks',()=> {

    let testData;

    before (() => {
       cy.fixture('tasks').then(t => {
         testData = t
       })
    })

    context('cadastros', () => {   
        it('Register a new task',() => {

            const taskName = "Estuda"
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
    
            // cy.get('main div p')
            //   .should('be.visible')
            //   .should('have.text', 'Estuda')
    
            cy.contains('main div p', 'Estuda')
              .should('be.visible')
            
        })
    
        it('não deve permitir tarefa duplicada', () => {
    
            const task = testData.dup
    
            cy.removeTaskByName(task.name)
            
    
         // Dado que eu tenho uma tarefa duplicada
            cy.postTask(task)
          
         // Quando faço o cadastro dessa tarefa
            cy.createTask(task.name)
    
         // Então vejo a mensagem de duplicidade   
    
            cy.get('.swal2-html-container')
              .should('be.visible')
              .should('have.text', 'Task already exists!')
    
        })
    
        it('Campo obrigatório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
    
        })
    })
    context('atualização', () => {
       it('Deve concluir uma tarefa',() => {
         const task ={
            name: 'Comprar ketchup',
            is_done:false
        }

         cy.removeTaskByName(task.name)
         cy.postTask(task)
        
         cy.visit('/')

         cy.contains('p', task.name)
           .parent()
           .find('button[class*=ItemToggle]')
           .click()


           cy.contains('p', task.name)
             .should('have.css', 'text-decoration-line', 'line-through')

       })
       
    })

    context('Exclusão', () => {
        it('Deve remover uma tarefa',() => {
          const task ={
             name: 'Jean Pierre',
             is_done:false
         }
 
          cy.removeTaskByName(task.name)
          cy.postTask(task)
         
          cy.visit('/')
 
          cy.contains('p', task.name)
            .parent()
            .find('button[class*=ItemDelete]')
            .click()
 
 
            cy.contains('p', task.name)
              .should('not.exist')
 
        })
    })
})
