const { expect } = require('@playwright/test')

export class Toast {
    constructor(page) {
        this.page = page
    }

    async haveText(message) { 
        await expect(this.page.locator('.toast')).toContainText(message)
        //await expect(this.page.locator('.toast')).toBeHidden({ timeout: 5000 })
        await expect(this.page.locator('.toast')).not.toBeVisible({ timeout: 10000 })

    }

}