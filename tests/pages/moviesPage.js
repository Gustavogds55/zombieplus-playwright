const { expect } = require('@playwright/test')

export class MoviesPage {

    constructor(page) {
        this.page = page;
    }

    async loggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL('http://localhost:3000/admin/movies')

        //validar o login
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible() 

        //outra forma de validar o login
        //await expect(this.page).toHaveURL(/.*admin/)
    }
    async create(title, overview, company, release_year) {
        //await this.page.click("[href$='register']") // $ = significa que no final da url possui o 'register'
        //await this.page.click("[href*='movies']") // * = significa que no contém a palavra 'register'
        //await this.page.click("[href^='movies']") // ^ = significa que começa com /admin
        await this.page.click("[href='/admin/movies/register']")
        await this.page.getByRole('textbox', { name: 'Titulo do filme' }).fill(title)
        await this.page.getByRole('textbox', { name: 'Sinopse' }).fill(overview)
        await this.page.locator('#select_company_id div').filter({ hasText: 'Selecione...' }).nth(1).click()
        await this.page.getByText('Universal Pictures').click()
        await this.page.locator('div').filter({ hasText: /^Selecione\.\.\.$/ }).nth(2).click()
        await this.page.getByText('2017').click()
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
        
        


    }




}