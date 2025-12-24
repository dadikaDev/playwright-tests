# Playwright UI Tests (Page Object Model)

End-to-end UI test framework built with Playwright using the Page Object Model (POM) pattern.

The project demonstrates scalable test architecture, clean locator strategy, and modern Playwright best practices.

---

## 🚀 Overview

- **Test framework:** Playwright
- **Test type:** UI / E2E
- **Architecture:** Page Object Model (POM)
- **Test runner:** Playwright Test
- **Reporter:** Playwright built-in (optional Allure)
- **CI:** GitHub Actions

---

## 📁 Project Structure

```text
tests/
└── ui/
    ├── pages/        # Page Objects (POM)
    ├── specs/        # Test scenarios
    ├── fixtures/     # Custom Playwright fixtures
    ├── data/         # Test data 
playwright.config.js  # Playwright configuration
package.json
README.md
