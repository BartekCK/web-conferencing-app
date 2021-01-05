const faker = require('faker');

describe('Meet GUI tests', () => {
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber();

    const login = () => {
        cy.get('#normal_login_email').should('be.visible').type(email);
        cy.get('#normal_login_password').should('be.visible').type(email);
        cy.get('.ant-form-item-control-input-content > .ant-btn').click();
    };

    it('User should create new account', () => {
        cy.visit('https://localhost:8080/');
        cy.get('[data-test=registerBtnTest]').click();
        cy.get('[data-test=emailInputTest]').should('be.visible').type(email);
        cy.get('[data-test=passwordInputTest]').should('be.visible').type(email);
        cy.get('[data-test=passwordRepeatInputTest]')
            .should('be.visible')
            .type(email);
        cy.get('[data-test=phoneInputTest]').should('be.visible').type(phone);
        cy.get('.ant-form-item-control-input-content > .ant-btn').click();
    });

    it('User should login', () => {
        login();
    });

    it('User should crete new room', () => {
        cy.get('[data-test=newMeetTest]').click();
        cy.get('video').should('be.visible').wait(2000);
    });

    it('User should turn off camera', () => {
        cy.get('.tools--wrapper > :nth-child(1)').click();
    });

    it('User should turn off voice', () => {
        cy.get('.tools--wrapper > :nth-child(2)').click();
        cy.get('.btn-setting');
    });

    it('User should open setting modal', () => {
        cy.get('.btn-setting').click();
        cy.get('.ant-tabs-nav-list > :nth-child(2)').should('be.visible').click();
        cy.get('.ant-modal-close-x').click();
    });

    it('User should join to meet', () => {
        cy.get('.ant-btn').click();
    });

    it('User should change room name', () => {
        cy.visit('https://localhost:8080/');
        login();
        cy.get('.rooms--wrapper').find('.title').last().should('be.visible')
            .click();
        cy.get('#rc-tabs-0-tab-3').should('be.visible').click();
        const word = faker.lorem.word();
        cy.get('#rc-tabs-0-panel-3 > .mb-2 > .ant-input').type(word);
        cy.get('#rc-tabs-0-panel-3 > .mb-2 > button').click();
        cy.get('.title--wrapper > .title').contains(word);
    });

    it('User should change language', () => {
        cy.get('[data-test=avatarTest]').should('be.visible').click();
        cy.get('.ant-tabs-nav-list > :nth-child(3)').should('be.visible').click();
        cy.get('.d-flex > :nth-child(2)').click();
        cy.get('.ant-modal-close-x').click();
    });

    it('User should logout and login again', () => {
        cy.get('[data-test=avatarTest]').should('be.visible').click();
        cy.get('.ant-tabs-nav-list > :nth-child(3)').should('be.visible').click();
        cy.get('.d-flex > :nth-child(1)').click();
        login();
    });
});
