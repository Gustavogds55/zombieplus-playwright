
const { test, expect } = require ('@playwright/test')
const { LandingPage } = require('../pages/landingPage')
const { Toast } = require('../pages/components')
const { faker } = require('@faker-js/faker')
const { request } = require('http')

let landingPage
let toast



test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
  
  
  //visitar a página
  //await page.goto('http://localhost:3000')
  //clicar no botão "Aperte o play"
  // await page.getByRole('button', { name: /Aperte o play/ }).click();
  // await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');
  //preencher o formulário
  // await page.getByPlaceholder('Informe seu nome').fill('Teste QAx');
  // await page.getByPlaceholder('Informe seu email').fill('testeqa@gmail.com');
  // await page.getByTestId('modal').getByText('Quero entrar na fila').click()
  //validar o toast de sucesso
  // const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  // await expect(page.locator('.toast')).toHaveText(message);
  // await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 });
});
test('Não deve cadastrar quando o email ja existe', async ({ page, request}) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  //Consumindo a API
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLead.ok()).toBeTruthy()

  // Ou duplicando o a mesma massa de teste
  // await landingPage.visit()
  // await landingPage.openLeadModal()
  // await landingPage.submitLeadForm(leadName, leadEmail)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.haveText(message)
  
  
});
test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('teste QAx', 'testeqa.com.br')
  await landingPage.alertHaveText('Email incorreto');
 


});
test('Não deve cadastrar com nome vazio', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'testeqa@gmail.com')
  await landingPage.alertHaveText('Campo obrigatório')

});
test('Não deve cadastrar com email vazio', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('teste QAx', '')
  await landingPage.alertHaveText('Campo obrigatório')

  });
test('Não deve cadastrar com os campos nome e email vazios', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')
  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

  });