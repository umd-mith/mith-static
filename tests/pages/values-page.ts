import type { Page, Locator } from "@playwright/test"

export class ValuesPage {
  readonly page: Page
  readonly visibleTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.visibleTitle = page.locator("h1")
  }

  async goto() {
    await this.page.goto("/values")
  }
}
