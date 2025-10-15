const { test } = require('@playwright/test')
const { LoginPage } = require('../pages/loginPage')
const { MoviesPage } = require('../pages/moviesPage')
const { Toast } = require('../pages/components')
const  data  = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/data.base')

let loginPage;
let toast;
let moviesPage

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.loggedIn()  
})

test('Deve poder cadastrar um novo filme', async ({ page }) => {
    //É preciso estar logado
    const movie = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)
    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)
    //await moviesPage.create('Guerra Mundial Z', 'Um ex-investigador da ONU é chamado para investigar a propagação de um vírus mortal que transforma as vítimas em zumbis, ameaçando dizimar a população mundial.')
    await toast.haveText('Cadastro realizado com sucesso!')

    

})  