const {test, expect} = require ('@playwright/test')
const { LoginPage } = require('../pages/loginPage')
const { Toast } = require('../pages/components');
const { MoviesPage } = require('../pages/moviesPage')

let loginPage;
let toast;
let moviesPage

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})


test('Deve logar como administrador', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.loggedIn()
    

})
test('Não deve logar com email incorreto', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admim@zombieplus.com', 'pwd123')
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)
    
})
test('Não deve logar com email com formato invalido', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('www.zombieplus.com.br', 'pwd123')
    await loginPage.alertHaveText('Email incorreto')
    // const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    // await toast.haveText(message)

    
})
test('Não deve logar com senha incorreta', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd345')
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)
    
})
test('Não deve logar com email e senha vazios', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('', '')
    await loginPage.alertHaveText(['Campo obrigatório','Campo obrigatório'])
    
    
})
test('Não deve logar com email vazios', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('', 'pwd123')
    await loginPage.alertHaveText('Campo obrigatório')
    
    
})
test('Não deve logar senha vazia', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', '')
    await loginPage.alertHaveText('Campo obrigatório')
    
    
})
