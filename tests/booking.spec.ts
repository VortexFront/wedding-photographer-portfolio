import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

test('package selection produces an honest local demo summary without collecting contacts or sending requests', async ({ page }, testInfo) => {
  const mutations: string[] = [], messages: string[] = [];
  page.on('request', (request) => { if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method())) mutations.push(request.method() + ' ' + request.url()); });
  page.on('console', (message) => messages.push(message.text()));
  await page.goto('./');
  await page.locator('#pricing').getByRole('button', { name: 'Выбрать пакет', exact: true }).nth(1).click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal).toHaveAccessibleName('Пример бронирования');
  await expect(modal.getByText('UI-демо · без отправки')).toBeVisible();
  await expect(modal.getByLabel('Демонстрационный пакет')).toHaveValue('Premium');
  await expect(modal.getByLabel('Тестовый персонаж')).toHaveAttribute('readonly', '');
  await expect(modal.getByLabel('Пример даты · не проверка доступности')).toHaveAttribute('readonly', '');
  await expect(modal.locator('input[type=tel],input[type=email],textarea')).toHaveCount(0);
  await modal.getByLabel('Демонстрационный пакет').selectOption('Deluxe');
  await modal.getByRole('button', { name: 'Посмотреть демо-итог' }).click();
  await expect(modal).toHaveAccessibleName('Демонстрационный итог');
  await expect(modal.getByRole('status')).toHaveText('Заявка не отправлялась. Дата не бронировалась. Обратная связь не предусмотрена.');
  await expect(modal.locator('dd').first()).toHaveText('Deluxe');
  await expect(page.getByText('Заявка отправлена!', { exact: true })).toHaveCount(0);
  await modal.getByRole('button', { name: 'Вернуться к примеру' }).click();
  await expect(modal.getByLabel('Демонстрационный пакет')).toHaveValue('Deluxe');
  if (testInfo.project.name === '390') {
    fs.mkdirSync('docs/screenshots', { recursive: true });
    await page.screenshot({ path: 'docs/screenshots/demo-booking-mobile.png' });
  }
  await page.keyboard.press('Escape');
  await page.locator('#pricing').getByRole('button', { name: 'Выбрать пакет', exact: true }).first().click();
  await expect(page.getByRole('dialog').getByLabel('Демонстрационный пакет')).toHaveValue('Essential');
  await expect(page.getByRole('dialog').getByRole('button', { name: 'Посмотреть демо-итог' })).toBeVisible();
  expect(mutations).toEqual([]);
  expect(messages.some((message) => message.includes('Демо-пара'))).toBe(false);
});

test('dialog traps focus, closes by Escape and backdrop, and returns focus to the opener', async ({ page }) => {
  await page.goto('./');
  const opener = page.getByRole('button', { name: 'Открыть демо-бронирование', exact: true });
  await opener.click();
  const modal = page.getByRole('dialog');
  await expect(modal.getByRole('heading', { name: 'Пример бронирования' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(modal.getByRole('button', { name: 'Посмотреть демо-итог' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(modal.getByRole('button', { name: 'Закрыть демо-бронирование' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(modal.getByRole('button', { name: 'Посмотреть демо-итог' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(modal).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await opener.click();
  await page.mouse.click(4, 4);
  await expect(modal).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('Russian metadata, fictional content, navigation and small screens remain usable', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page).toHaveTitle(/демонстрационный/);
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /вымышленного/);
  const favicon = await page.locator('link[rel=icon]').getAttribute('href');
  expect(favicon).not.toContain('vite.svg');
  expect((await page.request.get(favicon!)).status()).toBe(200);
  await expect(page.getByText('200+', { exact: true })).toHaveCount(0);
  await expect(page.getByText('8 лет', { exact: true })).toHaveCount(0);
  await expect(page.locator('a[href^="tel:"],a[href^="mailto:"]')).toHaveCount(0);
  if (testInfo.project.name !== '1440') {
    await page.getByRole('button', { name: 'Открыть меню', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Закрыть меню', exact: true })).toHaveAttribute('aria-expanded', 'true');
  }
  await page.locator('header').getByRole('link', { name: 'Обо мне', exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.getByRole('heading', { name: /Елена — персонаж/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (testInfo.project.name === '1440') {
    await page.goto('./'); await page.waitForTimeout(1500);
    fs.mkdirSync('docs/screenshots', { recursive: true });
    await page.screenshot({ path: 'docs/screenshots/home-desktop.png' });
  }
  expect(errors).toEqual([]);
});

test('booking source has no simulated API, timers, network calls or contact logging', () => {
  const source = fs.readFileSync(path.resolve('src/components/BookingModal.tsx'), 'utf8');
  expect(source).not.toMatch(/setTimeout|console\.(?:log|info|debug)|\bfetch\s*\(|Заявка отправлена!/);
});
