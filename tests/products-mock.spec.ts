import { test, expect } from './fixtures';

const createMockProducts = () =>
    Array.from({ length: 20 }, (_, index) => ({
        id: `product-${index + 1}`,
        name: `Mock Product ${index + 1}`,
        description: `Description for product ${index + 1}`,
        price: (index + 1) * 2.5,
        is_location_offer: false,
        is_rental: false,
        co2_rating: 'B',
        in_stock: true,
        is_eco_friendly: false,
        product_image: `https://placehold.co/300x300?text=Product+${index + 1}`,
        category: 'Mock',
        brand: 'MockBrand',
    }));

test('Mock products API returns 20 items and all render on home page', async ({ app }) => {
    const mockProducts = createMockProducts();

    await app.page.route('**/products*', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                current_page: 1,
                data: mockProducts,
                from: 1,
                last_page: 1,
                per_page: 20,
                to: 20,
                total: 20,
            }),
        });
    });

    await app.homePage.openHomePage();

    await expect(app.homePage.productNames).toHaveCount(20, { timeout: 10000 });

    const productNames = (await app.homePage.getProductNames()).map((name) => name.trim());
    expect(productNames).toHaveLength(20);

    for (let index = 1; index <= 20; index += 1) {
        expect(productNames).toContain(`Mock Product ${index}`);
    }
});
