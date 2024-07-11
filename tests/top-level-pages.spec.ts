import { ResearchPage } from "./pages/research-page"
import { expect, test } from "@playwright/test"

test("Research page has correct h1 title", async ({ page }) => {
  const researchPage = new ResearchPage(page)
  await researchPage.goto()
  await expect(researchPage.page).toHaveTitle("MITH Research | MITH")
  await expect(researchPage.visibleTitle).toHaveText("Research")
})
