import {
  ResearchPage,
  NewsPage,
  PeoplePage,
  DialoguesPage,
  ValuesPage,
} from "./pages"
import { expect, test } from "@playwright/test"

test("Research page has correct title and h1", async ({ page }) => {
  const researchPage = new ResearchPage(page)
  await researchPage.goto()
  await expect(researchPage.page).toHaveTitle("MITH Research | MITH")
  await expect(researchPage.visibleTitle).toHaveText("Research")
})

test("People page has correct title and h1", async ({ page }) => {
  const peoplePage = new PeoplePage(page)
  await peoplePage.goto()
  await expect(peoplePage.page).toHaveTitle("People | MITH")
  // Playwright's `toBeVisible` method checks if the element is in the DOM, not if it is hidden by CSS, as here
  // so we expect this assertion to pass
  await expect(peoplePage.visibleTitle).toBeVisible()

  const classNames = await peoplePage.visibleTitle.evaluate(
    node => node.className,
  )
  expect(classNames).toContain("text-hidden")
})

test("News page has correct title and h1", async ({ page }) => {
  const newsPage = new NewsPage(page)
  await newsPage.goto()
  await expect(newsPage.page).toHaveTitle("MITH News | MITH")
  await expect(newsPage.visibleTitle).toHaveText("News")
})

test("Dialogues page has correct title and h1", async ({ page }) => {
  const dialoguesPage = new DialoguesPage(page)
  await dialoguesPage.goto()
  await expect(dialoguesPage.page).toHaveTitle("MITH Digital Dialogues | MITH")
  await expect(dialoguesPage.visibleTitle).toHaveText("Digital Dialogues")
})

test("Values page has correct title and h1", async ({ page }) => {
  const valuesPage = new ValuesPage(page)
  await valuesPage.goto()
  await expect(valuesPage.page).toHaveTitle("Our Values | MITH")
  await expect(valuesPage.visibleTitle).toHaveText("Our Values")
})
