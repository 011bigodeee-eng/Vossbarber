import { test, expect } from '@playwright/test';
for (const viewport of [{width:1440,height:1000},{width:390,height:844},{width:360,height:800}]) {
  test(`navigation and media at ${viewport.width}px`, async ({page})=>{
    await page.setViewportSize(viewport);
    const errors:string[]=[];
    page.on('pageerror', e=>errors.push(e.message));
    await page.goto('/');
    await expect(page.getByRole('heading',{level:1})).toContainText('VOSS');
    await page.waitForTimeout(1700);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
    if(viewport.width<900){
      await page.getByRole('button',{name:'Abrir menu'}).click();
      await expect(page.getByRole('button',{name:'Fechar menu'})).toHaveAttribute('aria-expanded','true');
      await page.locator('#mobile-menu').getByRole('link',{name:'Serviços'}).click();
      await expect(page.locator('#mobile-menu')).toHaveCount(0);
      await expect(page).toHaveURL(/#servicos$/);
    }else{
      await page.locator('.desktop-nav').getByRole('link',{name:'Serviços'}).click();
      await expect(page).toHaveURL(/#servicos$/);
    }
    const services=page.locator('.service-card a');
    await expect(services).toHaveCount(4);
    for (const a of await services.all()) {
      const href=await a.getAttribute('href');
      expect(href).toMatch(/^https:\/\/wa.me\/5516996143108\?text=/);
      expect(decodeURIComponent(href!)).toContain('consultar disponibilidade');
    }
    const gallery=page.getByRole('button',{name:'Ampliar imagem conceitual: O ambiente'});
    await gallery.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(gallery).toBeFocused();
    const destinations=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')!.slice(1)));
    for(const id of destinations) expect(await page.locator(`[id="${id}"]`).count()).toBe(1);
    for(const src of ['/images/lounge.jpg','/images/cut.jpg','/images/beard.jpg','/images/groom.jpg']){
      const response=await page.request.get(src);expect(response.ok()).toBe(true);expect(response.headers()['content-type']).toContain('image');
    }
    await expect(page.locator('a[href*="google.com/maps"]')).toHaveAttribute('href',/Marechal\+Deodoro\+1774/);
    expect(errors).toEqual([]);
  });
}
test('reduced motion skips intro and mobile menu closes with Escape',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await expect(page.locator('.intro')).toHaveCount(0);
  await page.getByRole('button',{name:'Abrir menu'}).click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Abrir menu'})).toBeFocused();
});
