describe('TaskIsNotDone', () => {
    it('base example, visually looks correct', async () => {
        await page.goto("http://localhost:6006/iframe.html?id=todolist-task--task-is-not-done-example&viewMode=story");
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});