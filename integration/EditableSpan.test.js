describe('EditableSpan', () => {
    it('base example, visually looks correct', async () => {
        await page.goto("http://localhost:6006/iframe.html?id=todolist-editablespan--editable-span-example&viewMode=story");
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

