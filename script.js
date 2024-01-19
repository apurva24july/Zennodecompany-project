// Product details
const products = [
    { name: 'Product A', price: 20 },
    { name: 'Product B', price: 40 },
    { name: 'Product C', price: 50 }
];

// Discount rules
const discountRules = {
    flat_10_discount: { threshold: 200, discount: 10 },
    bulk_5_discount: { threshold: 10, discount: 0.05 },
    bulk_10_discount: { threshold: 20, discount: 0.1 },
    tiered_50_discount: { quantityThreshold: 30, singleProductThreshold: 15, discount: 0.5 }
};

// Function to calculate total
function calculateTotal() {
    // Reset output div
    document.getElementById('output').innerHTML = '';

    let subtotal = 0;
    let totalQuantity = 0;
    let shippingFee = 0;
    let giftWrapFee = 0;

    // Loop through each product
    products.forEach(product => {
        const quantity = parseInt(prompt(`Enter quantity for ${product.name}:`), 10);
        const isGiftWrapped = confirm(`Is ${product.name} wrapped as a gift?`);

        const totalAmount = quantity * product.price;
        const discountAmount = calculateDiscount(product, quantity);

        subtotal += totalAmount - discountAmount;
        totalQuantity += quantity;

        // Display product details
        const productDetails = `${product.name} - Quantity: ${quantity}, Total: $${totalAmount.toFixed(2)}`;
        const discountDetails = discountAmount > 0 ? `Discount Applied: ${discountAmount.toFixed(2)}` : '';

        // Output product details
        document.getElementById('output').innerHTML += `<p>${productDetails}<br>${discountDetails}</p>`;

        // Calculate gift wrap fee
        if (isGiftWrapped) {
            giftWrapFee += quantity;
        }
    });

    // Calculate shipping fee
    shippingFee = Math.ceil(totalQuantity / 10) * 5;

    // Display additional details
    document.getElementById('output').innerHTML += `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;
    document.getElementById('output').innerHTML += `<p>Shipping Fee: $${shippingFee.toFixed(2)}</p>`;
    document.getElementById('output').innerHTML += `<p>Gift Wrap Fee: $${giftWrapFee.toFixed(2)}</p>`;
    document.getElementById('output').innerHTML += `<p>Total: $${(subtotal + shippingFee + giftWrapFee).toFixed(2)}</p>`;
}

// Function to calculate discount based on rules
function calculateDiscount(product, quantity) {
    let maxDiscount = 0;

    for (const rule in discountRules) {
        const { threshold, discount, quantityThreshold, singleProductThreshold } = discountRules[rule];

        if (quantity > quantityThreshold && quantity > singleProductThreshold && discount > maxDiscount) {
            maxDiscount = discount;
        }

        if (product.price * quantity > threshold && discount > maxDiscount) {
            maxDiscount = discount;
        }
    }

    return maxDiscount * product.price * quantity;
}
