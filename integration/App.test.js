describe('App', () => {
    it('base example, visually looks correct', async () => {
        await page.goto("http://localhost:6006/iframe.html?id=todolist-app--app-example&viewMode=story");
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

